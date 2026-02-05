import { useRef } from 'react';

export function useProctoringRecorder(videoStream: MediaStream | null) {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  function start() {
    if (!videoStream || recorderRef.current) return;

    const recorder = new MediaRecorder(videoStream, {
      mimeType: 'video/webm', // 🔥 DO NOT force codecs
    });

    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    recorder.start(); // 🔥 NO TIMESLICE
    recorderRef.current = recorder;
  }

  async function getFinalBlob(): Promise<Blob> {
    if (!recorderRef.current) {
      throw new Error('Recorder not running');
    }

    return new Promise((resolve) => {
      recorderRef.current!.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: 'video/webm',
        });
        resolve(blob);
      };

      recorderRef.current!.stop(); // 🔥 FINALIZES WEBM
    });
  }

  function stop() {
    recorderRef.current?.stop();
    recorderRef.current = null;
    chunksRef.current = [];
  }

  return { start, stop, getFinalBlob };
}
