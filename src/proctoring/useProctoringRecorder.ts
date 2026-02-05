import { useRef } from 'react';

const TIMESLICE_MS = 1000; // 1s chunks
const MAX_BUFFER_SECONDS = 30; // keep last 30s

export function useProctoringRecorder(stream: MediaStream | null) {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  function start() {
    if (!stream || recorderRef.current) return;

    const recorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp8,opus',
    });

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);

        // 🔒 keep rolling buffer
        if (chunksRef.current.length > MAX_BUFFER_SECONDS) {
          chunksRef.current.shift();
        }
      }
    };

    recorder.start(TIMESLICE_MS);
    recorderRef.current = recorder;
  }

  function stop() {
    recorderRef.current?.stop();
    recorderRef.current = null;
    chunksRef.current = [];
  }

  function getBufferedBlob(seconds = 20): Blob {
    const count = Math.min(seconds, chunksRef.current.length);
    return new Blob(chunksRef.current.slice(-count), {
      type: 'video/webm',
    });
  }

  return { start, stop, getBufferedBlob };
}
