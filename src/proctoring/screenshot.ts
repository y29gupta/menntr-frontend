export async function takeScreenshot(video: HTMLVideoElement): Promise<Blob> {
  console.log('📸 takeScreenshot called');
  console.log('   Video dimensions:', video.videoWidth, 'x', video.videoHeight);
  console.log('   Ready state:', video.readyState);

  // Wait for video to be ready with timeout
  if (video.videoWidth === 0) {
    console.log('⏳ Waiting for video dimensions...');

    await Promise.race([
      new Promise<void>((resolve) => {
        const onReady = () => {
          video.removeEventListener('loadeddata', onReady);
          console.log('✅ Video ready:', video.videoWidth, 'x', video.videoHeight);
          resolve();
        };
        video.addEventListener('loadeddata', onReady);
      }),
      new Promise<void>((_, reject) =>
        setTimeout(() => reject(new Error('Video ready timeout')), 2000)
      ),
    ]).catch(() => {
      console.warn('⚠️ Video not ready, using fallback dimensions');
    });
  }

  // Use fallback dimensions if video still not ready
  const width = video.videoWidth || 640;
  const height = video.videoHeight || 480;

  console.log('🎨 Creating canvas:', width, 'x', height);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  console.log('🖼️ Drawing video frame to canvas');
  ctx.drawImage(video, 0, 0, width, height);

  return new Promise((resolve, reject) => {
    console.log('🔄 Converting canvas to blob...');

    canvas.toBlob(
      (blob) => {
        if (blob) {
          console.log('✅ Screenshot blob created:', blob.size, 'bytes');
          resolve(blob);
        } else {
          console.error('❌ Canvas toBlob returned null');
          reject(new Error('Failed to create blob from canvas'));
        }
      },
      'image/jpeg',
      0.9
    );
  });
}
