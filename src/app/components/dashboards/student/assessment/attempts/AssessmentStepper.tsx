import { useEffect, useState } from 'react';

type StepStatus = {
  attempted: boolean;
  visited: boolean;
  review: boolean;
};

type Props = {
  total: number;
  currentIndex: number;
  statusMap: Record<number, StepStatus>;
};

const VISIBLE_COUNT = 20;
const SHIFT_COUNT = 5;

export default function AssessmentStepper({ total, currentIndex, statusMap }: Props) {
  const [windowStart, setWindowStart] = useState(0);

  const maxWindowStart = Math.max(0, total - VISIBLE_COUNT);
  const windowEnd = Math.min(windowStart + VISIBLE_COUNT, total);
  const showPagination = total > VISIBLE_COUNT;

  /* 🔹 AUTO-SCROLL ONLY WHEN CURRENT QUESTION IS OUTSIDE VIEW */
  useEffect(() => {
    if (currentIndex < windowStart) {
      setWindowStart(currentIndex);
    } else if (currentIndex >= windowEnd) {
      setWindowStart(Math.min(currentIndex - VISIBLE_COUNT + 1, maxWindowStart));
    }
  }, [currentIndex, windowStart, windowEnd, maxWindowStart]);

  /* 🔹 MANUAL PAGINATION (ARROWS) */
  const goPrevWindow = () => {
    setWindowStart((prev) => Math.max(0, prev - SHIFT_COUNT));
  };

  const goNextWindow = () => {
    setWindowStart((prev) => Math.min(prev + SHIFT_COUNT, maxWindowStart));
  };

  return (
    <div className="flex justify-center w-full">
      <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-sm gap-2">
        {/* ◀ PREV */}
        {showPagination && windowStart > 0 && (
          <button
            onClick={goPrevWindow}
            className="h-8 w-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
          >
            ‹
          </button>
        )}

        {/* STEPS */}
        <div className="flex items-center">
          {Array.from({ length: windowEnd - windowStart }, (_, idx) => windowStart + idx).map(
            (i) => {
              const status = statusMap[i];
              const isCurrent = i === currentIndex;

              /* ---------- CIRCLE STYLE ---------- */
              let circleStyle = 'bg-[#F1F5F9] text-[#94A3B8]';

              if (status.attempted) {
                circleStyle = 'bg-[#22C55E] text-white';
              }

              if (status.visited && !status.attempted) {
                circleStyle = 'bg-white border border-[#F97316] text-[#F97316]';
              }

              if (status.review) {
                circleStyle = 'bg-white border border-[#7C3AED] text-[#7C3AED]';
              }

              if (isCurrent) {
                circleStyle = 'bg-white border border-[#2563EB] text-[#2563EB]';
              }

              /* ---------- LINE STYLE ---------- */
              let lineStyle = 'bg-[#E5E7EB]';

              if (status.attempted) {
                lineStyle = 'bg-[#22C55E]';
              } else if (status.visited) {
                lineStyle = 'bg-[#F97316]';
              }

              if (isCurrent) {
                lineStyle = 'bg-[#2563EB]';
              }

              return (
                <div key={i} className="flex items-center">
                  <div className="relative">
                    {isCurrent && (
                      <div className="absolute inset-[-4px] rounded-full border-2 border-dashed border-[#2563EB]" />
                    )}

                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${circleStyle}`}
                    >
                      {i + 1}
                    </div>
                  </div>

                  {i < windowEnd - 1 && (
                    <div className={`h-[2px] w-6 mx-1 rounded-full ${lineStyle}`} />
                  )}
                </div>
              );
            }
          )}
        </div>

        {/* ▶ NEXT */}
        {showPagination && windowEnd < total && (
          <button
            onClick={goNextWindow}
            className="h-8 w-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
}
