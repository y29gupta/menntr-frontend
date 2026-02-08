import { useRef } from 'react';

export function useProctoringRecorder(stream: MediaStream | null) {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const runningRef = useRef(false);

  function start() {
    // ✅ Don't start if already running
    if (!stream || runningRef.current) {
      console.log('⚠️ Recorder start skipped:', {
        hasStream: !!stream,
        running: runningRef.current,
      });
      return;
    }

    chunksRef.current = [];

    const recorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp8,opus',
      videoBitsPerSecond: 1_000_000,
    });

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorderRef.current = recorder;
    recorder.start();
    runningRef.current = true;

    console.log('🎥 Recorder started');
  }

  async function stopAndGetBlob(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!recorderRef.current || !runningRef.current) {
        console.error('❌ Cannot stop: Recorder not running');
        reject(new Error('Recorder not running'));
        return;
      }

      const currentRecorder = recorderRef.current;

      currentRecorder.onstop = () => {
        console.log('🛑 Recorder stopped, creating blob from', chunksRef.current.length, 'chunks');
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });

        // ✅ Reset state
        recorderRef.current = null;
        chunksRef.current = [];
        runningRef.current = false;

        console.log('📦 Blob created:', blob.size, 'bytes');
        resolve(blob);
      };

      currentRecorder.onerror = (error) => {
        console.error('❌ Recorder error:', error);
        reject(error);
      };

      console.log('⏹️ Stopping recorder...');
      currentRecorder.stop();
    });
  }

  function isRunning() {
    return runningRef.current;
  }

  function cleanup() {
    if (recorderRef.current && runningRef.current) {
      console.log('🧹 Cleaning up recorder');
      recorderRef.current.stop();
      recorderRef.current = null;
      chunksRef.current = [];
      runningRef.current = false;
    }
  }

  return { start, stopAndGetBlob, isRunning, cleanup };
}
