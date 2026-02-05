import { useEffect } from 'react';

export function useTabMonitoring({
  enabled,
  onCheat,
}: {
  enabled: boolean;
  onCheat: (reason: string) => void;
}) {
  useEffect(() => {
    if (!enabled) return;

    const onHidden = () => {
      if (document.hidden) onCheat('TAB_SWITCH');
    };

    const onBlur = () => {
      onCheat('WINDOW_BLUR');
    };

    document.addEventListener('visibilitychange', onHidden);
    window.addEventListener('blur', onBlur);

    return () => {
      document.removeEventListener('visibilitychange', onHidden);
      window.removeEventListener('blur', onBlur);
    };
  }, [enabled, onCheat]); // ✅ IMPORTANT
}
