'use client';

import { useEffect } from 'react';
import { useProctoringEngine } from './ProctoringEngine';

export default function ProctoringClient({
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
  const engine = useProctoringEngine({
    attemptId,
    videoElement,
    videoStream,
    enabled,
  });

  // ✅ Cleanup when component unmounts
  useEffect(() => {
    return () => {
      console.log('🧹 ProctoringClient unmounting');
    };
  }, []);

  return null;
}
