import { uploadToAzure } from './upload';
import { takeScreenshot } from './screenshot';
import { api } from '@/app/lib/api';

type HandleCheatArgs = {
  attemptId: number;
  reason: string;
  recorder: {
    getBufferedBlob: (seconds: number) => Promise<Blob>;
  };
  videoElement: HTMLVideoElement;
};

export async function handleCheat({ attemptId, reason, recorder, videoElement }: HandleCheatArgs) {
  console.log('🚨 Cheat:', reason);

  await videoElement.play().catch(() => {});

  const videoBlob = await recorder.getBufferedBlob(15);
  const imageBlob = await takeScreenshot(videoElement);
console.log('🎥 Video size:', videoBlob.size);
console.log('📸 Image size:', imageBlob.size);
  if (videoBlob.size < 50_000) return;

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
}


