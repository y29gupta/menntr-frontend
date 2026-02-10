import { useCallback, useEffect, useRef } from 'react';
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
  const processingRef = useRef(false);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ Start recorder ONCE when enabled
  useEffect(() => {
    if (!enabled || !videoStream) return;

    const t = setTimeout(() => {
      console.log('🎬 Starting initial recorder');
      recorder.start();
    }, 500);

    return () => {
      clearTimeout(t);
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
    };
  }, [enabled, videoStream, recorder]);

  const reportCheat = useCallback(
    async (reason: string) => {
      console.log('🔔 reportCheat called:', reason);
      console.log('   Enabled:', enabled);
      console.log('   Has video element:', !!videoElement);
      console.log('   Processing:', processingRef.current);
      console.log('   Recorder running:', recorder.isRunning());

      if (!enabled || !videoElement) {
        console.log('❌ Cheat ignored: not enabled or no video element');
        return;
      }

      // ✅ Prevent concurrent processing
      if (processingRef.current) {
        console.log('⏳ Cheat ignored (already processing)');
        return;
      }

      const now = Date.now();
      if (lastRef.current && now - lastRef.current < COOLDOWN_MS) {
        const elapsed = Math.round((now - lastRef.current) / 1000);
        console.log(`⏳ Cheat ignored (cooldown: ${elapsed}s / ${COOLDOWN_MS / 1000}s)`);
        return;
      }

      // ✅ Check if recorder is actually running
      if (!recorder.isRunning()) {
        console.log('⚠️ Recorder not running, starting it...');
        recorder.start();
        return;
      }

      console.log('✅ Processing cheat event:', reason);
      processingRef.current = true;
      lastRef.current = now;

      try {
        await handleCheat({
          attemptId,
          reason,
          recorder,
          videoElement,
        });

        console.log('✅ Cheat handled successfully');
      } catch (error: any) {
        console.error('❌ Error handling cheat:', error.message);

        // ✅ If video was too small, don't treat as critical error
        if (error.message === 'Video too small') {
          console.log('ℹ️ Video too small, will retry on next event');
        }
      } finally {
        // ✅ GUARANTEED recorder restart with safety delay
        console.log('🔄 Setting up recorder restart...');

        // Clear any existing restart timeout
        if (restartTimeoutRef.current) {
          clearTimeout(restartTimeoutRef.current);
        }

        // Restart after a short delay
        restartTimeoutRef.current = setTimeout(() => {
          console.log('🎬 Restarting recorder after processing');
          recorder.start();
          processingRef.current = false;
          restartTimeoutRef.current = null;
        }, 200);
      }
    },
    [enabled, attemptId, videoElement, recorder]
  );

  useTabMonitoring({ enabled, onCheat: reportCheat });
}
