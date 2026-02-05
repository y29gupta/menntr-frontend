let detector: any = null;
let loading = false;

export async function getFaceDetector() {
  if (detector) return detector;
  if (loading) return null;

  loading = true;

  const mp = await import('@mediapipe/face_detection');

  detector = new mp.FaceDetection({
    locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
  });

  detector.setOptions({
    model: 'short',
    minDetectionConfidence: 0.6,
  });

  loading = false;
  return detector;
}
