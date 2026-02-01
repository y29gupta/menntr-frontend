import { Clock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Props = {
  durationMinutes?: number;
  onTimeUp: () => void;
};

export default function Timer({ durationMinutes, onTimeUp }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // initialize timer when runtime loads
  useEffect(() => {
    if (!durationMinutes) return;

    const totalSeconds = durationMinutes * 60;
    // const totalSeconds = 10;

    setSecondsLeft(totalSeconds);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [durationMinutes]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="flex flex-col items-center gap-1 text-sm text-gray-700">
      <div className="flex gap-1 items-center">
        <Clock size={16} />
        <span className="font-medium">{formattedTime}</span>
      </div>
      <span className="text-xs text-gray-400">Autosaved</span>
    </div>
  );
}
