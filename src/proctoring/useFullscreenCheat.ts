'use client';

import { useEffect } from 'react';

export function useFullscreenCheat({
  enabled,
  onCheat,
}: {
  enabled: boolean;
  onCheat: (reason: string) => void;
}) {
  useEffect(() => {
    if (!enabled) return;

    const handler = () => {
      if (!document.fullscreenElement) {
        console.log('🚨 FULLSCREEN EXIT DETECTED');
        onCheat('EXIT_FULLSCREEN');
      }
    };

    document.addEventListener('fullscreenchange', handler);

    return () => {
      document.removeEventListener('fullscreenchange', handler);
    };
  }, [enabled, onCheat]);
}
