import { uploadToAzure } from './upload';
import { takeScreenshot } from './screenshot';
import { api } from '@/app/lib/api';

type HandleCheatArgs = {
  attemptId: number;
  reason: string;
  recorder: { stopAndGetBlob: () => Promise<Blob> };
  videoElement: HTMLVideoElement;
};

export async function handleCheat({ attemptId, reason, recorder, videoElement }: HandleCheatArgs) {
  console.log('🚨 === START CHEAT HANDLING ===');
  console.log('   Reason:', reason);
  console.log('   AttemptId:', attemptId);

  let videoBlob: Blob | null = null;
  let imageBlob: Blob | null = null;

  try {
    // STEP 1: Wait for video to be ready
    if (videoElement.readyState < 2) {
      console.log('⏳ [STEP 1] Waiting for video to be ready...');
      await new Promise((r) => setTimeout(r, 300));
    }
    console.log('✅ [STEP 1] Video ready');

    // STEP 2: Stop recorder and get blob
    console.log('🎬 [STEP 2] Stopping recorder...');
    videoBlob = await recorder.stopAndGetBlob();
    console.log('✅ [STEP 2] Video blob size:', videoBlob.size);

    // STEP 3: Validate video size
    if (videoBlob.size < 50_000) {
      console.warn('⚠️ [STEP 3] Video too small, aborting');
      throw new Error('Video too small');
    }
    console.log('✅ [STEP 3] Video size valid');

    // STEP 4: Take screenshot
    console.log('📸 [STEP 4] Taking screenshot...');
    imageBlob = await takeScreenshot(videoElement);
    console.log('✅ [STEP 4] Screenshot taken, size:', imageBlob.size);

    // STEP 5: Get SAS URLs
    console.log('🔑 [STEP 5] Getting SAS URLs...');
    console.log('   Requesting video SAS for attemptId:', attemptId);

    const videoSasResponse = await api.post('/proctoring/sas', {
      attemptId,
      fileType: 'video',
    });
    console.log('✅ [STEP 5a] Video SAS received');

    const imageSasResponse = await api.post('/proctoring/sas', {
      attemptId,
      fileType: 'image',
    });
    console.log('✅ [STEP 5b] Image SAS received');

    const videoSas = videoSasResponse.data;
    const imageSas = imageSasResponse.data;

    console.log('   Video SAS URL length:', videoSas.sasUrl?.length || 0);
    console.log('   Image SAS URL length:', imageSas.sasUrl?.length || 0);

    // STEP 6: Upload to Azure
    console.log('⬆️ [STEP 6] Uploading to Azure...');

    console.log('   Uploading video...');
    await uploadToAzure(videoSas.sasUrl, videoBlob);
    console.log('✅ [STEP 6a] Video uploaded');

    console.log('   Uploading image...');
    await uploadToAzure(imageSas.sasUrl, imageBlob);
    console.log('✅ [STEP 6b] Image uploaded');

    // STEP 7: Save proctoring event
    console.log('💾 [STEP 7] Saving proctoring event...');
    const eventResponse = await api.post('/proctoring/event', {
      attemptId,
      reason,
      videoPath: videoSas.blobPath,
      imagePath: imageSas.blobPath,
    });
    console.log('✅ [STEP 7] Event saved:', eventResponse.data);

    console.log('🎉 === CHEAT HANDLING COMPLETE ===');
  } catch (error: any) {
    console.error('❌ === CHEAT HANDLING FAILED ===');
    console.error('   Error message:', error.message);
    console.error('   Error stack:', error.stack);

    if (error.response) {
      console.error('   API Response status:', error.response.status);
      console.error('   API Response data:', error.response.data);
    }

    throw error;
  }
}
