import { useEffect, useRef } from 'react';

export function useTabMonitoring({
  enabled,
  onCheat,
}: {
  enabled: boolean;
  onCheat: (reason: string) => void;
}) {
    const initializedRef = useRef(false);
  useEffect(() => {
    if (!enabled) return;

    const onHidden = () => {
        if (!initializedRef.current) return;
      if (document.hidden) onCheat('TAB_SWITCH');
    };

    const onBlur = () => {
        if (!initializedRef.current) return;
      onCheat('WINDOW_BLUR');
    };
const initTimer = setTimeout(() => {
  initializedRef.current = true;
}, 1500);
    document.addEventListener('visibilitychange', onHidden);
    window.addEventListener('blur', onBlur);

    return () => {
        clearTimeout(initTimer);
      document.removeEventListener('visibilitychange', onHidden);
      window.removeEventListener('blur', onBlur);
    };
  }, [enabled, onCheat]); // ✅ IMPORTANT
}
