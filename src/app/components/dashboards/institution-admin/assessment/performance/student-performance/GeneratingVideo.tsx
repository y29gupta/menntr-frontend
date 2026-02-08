import { Loader2 } from 'lucide-react';

export function GeneratingVideo() {
  return (
    <div className="rounded-2xl bg-white border border-[#EAECF0] shadow-[0_8px_24px_rgba(16,24,40,0.08)] p-6">
      <div className="bg-gray-100 rounded-lg p-12 flex items-center justify-center mb-4">
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin text-[#904BFF]" />
          <span className="text-sm font-medium text-[#101828]">Generating Video</span>
        </div>
      </div>

      <p className="text-sm text-[#475467]">
        The video is on its way! Generating screen recordings takes time, especially when many
        candidates are taking assessments simultaneously. Please allow up to 12 hours for
        processing.
      </p>
    </div>
  );
}
