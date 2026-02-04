import { useRef } from 'react';

const CHUNK_MS = 1000;
const MAX_BUFFER_SECONDS = 30;

export function useProctoringRecorder(videoStream: MediaStream | null) {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  function start() {
    if (!videoStream || recorderRef.current) return;

    const recorder = new MediaRecorder(videoStream, {
      mimeType: 'video/webm;codecs=vp8,opus',
    });

    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        chunksRef.current.push(e.data);
        if (chunksRef.current.length > MAX_BUFFER_SECONDS) {
          chunksRef.current.shift();
        }
      }
    };

    recorder.start(CHUNK_MS);
    recorderRef.current = recorder;
  }

  function stop() {
    recorderRef.current?.stop();
    recorderRef.current = null;
    chunksRef.current = [];
  }

async function getBufferedBlob(seconds: number): Promise<Blob> {
  if (!recorderRef.current) throw new Error('Recorder not running');

  recorderRef.current.requestData(); // 🔑 forces buffer flush
  await new Promise((r) => setTimeout(r, 100));

  const count = Math.min(seconds, chunksRef.current.length);
  const blob = new Blob(chunksRef.current.slice(-count), {
    type: 'video/webm',
  });
  if (blob.size < 30_000) {
    throw new Error(`Video too small: ${blob.size}`);
  }
  return blob;
}


  return { start, stop, getBufferedBlob };
}
