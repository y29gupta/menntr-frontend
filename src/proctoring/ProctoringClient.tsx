'use client';

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
  useProctoringEngine({
    attemptId,
    videoElement,
    videoStream,
    enabled,
  });

  return null;
}
