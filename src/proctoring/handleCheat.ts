import { uploadToAzure } from './upload';
import { takeScreenshot } from './screenshot';
import { api } from '@/app/lib/api';

type HandleCheatArgs = {
  attemptId: number;
  reason: string;
  recorder: {
    getBufferedBlob: (seconds: number) => Blob;
  };
  videoElement: HTMLVideoElement;
};

export async function handleCheat({ attemptId, reason, recorder, videoElement }: HandleCheatArgs) {
  try {
    console.log('🚨 Cheat:', reason);

    const videoBlob = recorder.getBufferedBlob(20);
    const imageBlob = await takeScreenshot(videoElement);

    if (videoBlob.size < 50_000) {
      console.warn('⚠️ Video too small, skipping upload');
      return;
    }

    const [videoSas, imageSas] = await Promise.all([
      api.post('/proctoring/sas', { attemptId, fileType: 'video' }).then((r) => r.data),
      api.post('/proctoring/sas', { attemptId, fileType: 'image' }).then((r) => r.data),
    ]);

    await Promise.all([
      uploadToAzure(videoSas.sasUrl, videoBlob),
      uploadToAzure(imageSas.sasUrl, imageBlob),
    ]);

    await api.post('/proctoring/event', {
      attemptId,
      reason,
      videoPath: videoSas.blobPath,
      imagePath: imageSas.blobPath,
    });

    console.log('✅ Proctoring event saved');
  } catch (err: any) {
    console.error('❌ Proctoring error:', err.message);
  }
}

