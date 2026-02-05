import { useEffect, useRef, useCallback } from 'react';
import { handleCheat } from './handleCheat';
import { useTabMonitoring } from './useTabMonitoring';
import { useProctoringRecorder } from './useProctoringRecorder';

const COOLDOWN_MS = 20_000;

export function useProctoringEngine({
  attemptId,
  videoElement,
  videoStream,
  enabled,
}: {
  attemptId: number;
  videoElement: HTMLVideoElement | null;
  videoStream: MediaStream | null;
  enabled: boolean;
}) {
  const recorder = useProctoringRecorder(videoStream);
  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    enabled ? recorder.start() : recorder.stop();
  }, [enabled]);

  const reportCheat = useCallback(
    async (reason: string) => {
      if (!enabled || !videoElement) return;

      const now = Date.now();
      if (lastRef.current && now - lastRef.current < COOLDOWN_MS) {
        console.log('⏳ Cheat ignored (cooldown)');
        return;
      }

      lastRef.current = now;
      await handleCheat({ attemptId, reason, recorder, videoElement });
    },
    [enabled, attemptId, videoElement]
  );

  useTabMonitoring({ enabled, onCheat: reportCheat });
}
