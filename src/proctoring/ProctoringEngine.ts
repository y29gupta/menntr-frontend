import { useEffect, useRef } from 'react';
import { handleCheat } from './handleCheat';
import { useTabMonitoring } from './useTabMonitoring';
import { useProctoringRecorder } from './useProctoringRecorder';

const CHEAT_COOLDOWN_MS = 20_000; // ✅ 20 seconds

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

  // 🔒 timestamp-based cooldown (PRODUCTION SAFE)
  const lastTriggeredAtRef = useRef<number>(0);

  useEffect(() => {
    if (enabled) recorder.start();
    else recorder.stop();
  }, [enabled]);

  const reportCheat = async (reason: string) => {
    if (!videoElement || !enabled) return;

    const now = Date.now();

    // 🚫 Cooldown guard
    if (now - lastTriggeredAtRef.current < CHEAT_COOLDOWN_MS) {
      console.log('⏳ Cheat ignored (cooldown active)');
      return;
    }

    lastTriggeredAtRef.current = now;

    await handleCheat({
      attemptId,
      reason,
      recorder,
      videoElement,
    });
  };

  useTabMonitoring({ enabled, onCheat: reportCheat });
}
