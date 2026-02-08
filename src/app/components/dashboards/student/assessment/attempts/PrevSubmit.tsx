'use client';

import React from 'react';
import Timer from './Timer';
import SubmitBg from '@/app/components/icons/SubmitBg';

type Props = {
  durationMinutes?: number;
  onTimeUp: () => void;
  onGoBack: () => void;
  onSubmitNow: () => void;
  stats: {
    totalQuestions: number;
    // attended: number;
    answered: number;
    unanswered: number;
    timeTaken: string;
  };
};

export default function PrevSubmit({
  durationMinutes,
  onTimeUp,
  onGoBack,
  onSubmitNow,
  stats,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      {/* Background SVG */}
      <div className="absolute inset-0 pointer-events-none">
        <SubmitBg />
      </div>

      {/* Modal */}
      <div className="relative z-10 w-full max-w-[720px] bg-white rounded-2xl border border-[#E6EAF5] shadow-xl px-8 py-7">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[20px] font-semibold text-[#1A2C50]">Submit Assessment?</h2>
            <p className="text-[16px] text-gray-500 mt-1">
              You cannot edit answers after submission.
            </p>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2">
            <Timer durationMinutes={durationMinutes} onTimeUp={onTimeUp} />
          </div>
        </div>

        {/* Stats */}
        <div className="rounded-xl border border-[#CBD5FF] bg-[#FBFCFF] grid grid-cols-4 overflow-hidden py-4 mb-5">
          <Stat label="Total Questions" value={stats.totalQuestions} />
          <Stat label="Answered" value={stats.answered} />
          <Stat label="Unanswered" value={stats.unanswered} />
          <Stat label="Time Taken" value={stats.timeTaken} />
        </div>

        {/* Info */}
        <ul className=" space-y-2 text-sm text-gray-600">
          <li className="flex gap-2">✦ Your responses have been securely submitted.</li>
          <li className="flex gap-2">
            ✦ Results and evaluation will be shared automatically after a day or by your institution
            once officially published.
          </li>
        </ul>

        {/* Actions */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onGoBack}
            className="px-6 py-2 rounded-full border border-[#904BFF] !text-[#904BFF] text-sm font-medium"
          >
            Go to Questions
          </button>

          <button
            onClick={onSubmitNow}
            className="px-6 py-2 rounded-[64px] bg-linear-to-r from-[#904BFF] to-[#C053C2] !text-white text-sm font-medium cursor-pointer"
          >
            Submit Now
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex flex-col justify-start px-6 border-r border-[#CBD5FF] last:border-r-0">
      <span className="text-xs text-[#6B7280] whitespace-nowrap">{label}</span>
      <span className="text-lg font-semibold text-[#0F172A]">{value}</span>
    </div>
  );
}
