import { Clock } from 'lucide-react';

export default function Timer() {
  return (
    <div className="flex  flex-col items-center gap-1 text-sm text-gray-700">
      <div className="flex gap-1 items-center">
        <Clock size={16} />
        <span className="font-medium">29:59</span>
      </div>
      <span className="text-xs text-gray-400">Autosaved</span>
    </div>
  );
}
