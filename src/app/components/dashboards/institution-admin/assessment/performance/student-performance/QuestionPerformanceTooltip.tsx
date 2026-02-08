'use client';

import { CheckCircle, Timer, Gauge } from 'lucide-react';

export type TooltipMode = 'marks' | 'percentage';

type TooltipProps = {
  active?: boolean;
  payload?: any[];
  mode?: TooltipMode;
};

export const QuestionPerformanceTooltip = ({ active, payload, mode = 'marks' }: TooltipProps) => {
  if (!active || !payload?.length) return null;

  const d = payload[0].payload;

  return (
    <div className="w-[190px] sm:w-[220px] rounded-2xl bg-white border border-[#E4E7EC] shadow-xl p-3 space-y-2">
      {/* TITLE */}
      <p className="text-sm font-semibold text-[#101828]">
        Question – {d.question.replace('Q', '')}
      </p>

      <hr className="border-[#EAECF0]" />

      {/* MAIN METRIC */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs text-[#475467]">
          <span>
            {mode === 'marks' && 'Marks given'}
            {mode === 'percentage' && 'Correct Responses'}
          </span>
        </div>

        <p className="text-lg font-semibold text-[#101828]">
          {mode === 'marks' && `${d.marksObtained}/${d.totalMarks}`}
          {mode === 'percentage' && `${Math.round((d.marksObtained / d.totalMarks) * 100)}%`}
        </p>
      </div>

      <hr className="border-[#EAECF0]" />

      {/* AVG TIME (always shown if exists) */}
      {d.avgTime !== undefined && (
        <>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-[#475467]">
              <Timer className="h-4 w-4" />
              <span>Average Time</span>
            </div>
            <p className="text-base font-semibold text-[#101828]">{d.avgTime} mins</p>
          </div>
          <hr className="border-[#EAECF0]" />
        </>
      )}

      {/* DIFFICULTY */}
      {d.difficulty && (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-[#475467]">
            <Gauge className="h-4 w-4" />
            <span>Difficulty</span>
          </div>
          <p className="text-base font-semibold text-[#101828]">{d.difficulty}</p>
        </div>
      )}
    </div>
  );
};
