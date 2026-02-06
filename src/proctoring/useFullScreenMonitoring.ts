import { useEffect } from 'react';

export function useFullscreenMonitoring({
  enabled,
  onCheat,
}: {
  enabled: boolean;
  onCheat: (reason: string) => void;
}) {
  useEffect(() => {
    if (!enabled) return;

    const onFullscreenChange = () => {
      if (!document.fullscreenElement) {
        onCheat('EXIT_FULLSCREEN');
      }
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, [enabled, onCheat]);
}
