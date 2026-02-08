'use client';

import { useRouter } from 'next/navigation';
import { BarChart3, Upload } from 'lucide-react';

type AssessmentHeaderProps = {
  title: string;
  subtitle: string;
  showExport?: boolean;
};

const AssessmentHeader = ({ title, subtitle, showExport = true }: AssessmentHeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col sm:flex-row sm:items-start sm:justify-between">
      {/* LEFT */}
      <div className="flex flex-col">
        {/* Go back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <img src="/Go-back.svg" alt="goback" />
          Go back
        </button>

        {/* Title + icon */}
        <div className="mt-3 flex items-baseline gap-1">
          <BarChart3 className="w-4 h-4 text-gray-900/80 relative top-[1px]" />
          <h2 className="text-base sm:text-lg font-bold text-[#1A2C50] leading-none">{title}</h2>
        </div>

        {/* Subtitle */}
        <p className="mt-0 text-sm text-gray-500 leading-snug">{subtitle}</p>
      </div>

      {/* RIGHT */}
      {showExport && (
        <div className="mt-3 sm:mt-0">
          <button className="flex items-center gap-2 rounded-2xl border border-purple-300! px-4 py-1.5 text-sm font-medium text-purple-600! hover:bg-purple-50!">
            <Upload className="w-4 h-4" />
            Export
          </button>
        </div>
      )}
    </div>
  );
};

export default AssessmentHeader;
