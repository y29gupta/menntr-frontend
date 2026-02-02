'use client';

import React from 'react';
import AssessmentHeader from './AssessmentHeader';
import { useRouter } from 'next/navigation';
import Congratulation from '@/app/components/icons/Congratulation';

export default function SubmissionScreen() {
  const router = useRouter();
  const handleDone = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    }
    router.push('/student/assessment');
  };

  return (
    <div className="h-screen flex flex-col bg-[#F7F6FB] overflow-hidden">
      <div className="relative flex-1 overflow-hidden">
        {/* Background SVG (decorative only) */}
        <div className="absolute flex justify-end inset-0 pointer-events-none">
          <Congratulation />
        </div>

        <AssessmentHeader onTimeUp={() => {}} />

        {/* Layout */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 pb-24">
          <div className="w-full max-w-[720px] bg-white rounded-2xl border border-[#E6EAF5] shadow-md px-8 py-7">
            {/* Title */}
            <div className="flex items-center justify-center gap-2 text-[#008E2D] font-semibold text-[20px] pb-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M5 8L7 10L11 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>{' '}
              Assessment Submitted Successfully
            </div>

            {/* Points */}
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li className="flex gap-2">✦ MCQ answers will be evaluated automatically</li>
              <li className="flex gap-2">
                ✦ Coding answers will be evaluated after all test cases are executed.
              </li>
              <li className="flex gap-2">✦ Results may take several hours.</li>
            </ul>

            {/* Stats */}
            <div className="rounded-xl border border-[#CBD5FF] bg-[#FBFCFF] grid grid-cols-3 overflow-hidden py-4">
              <Stat label="Attended Questions" value="25" />
              <Stat label="Unanswered" value="8" />
              <Stat label="Time Taken" value="25 mins" />
            </div>

            {/* Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleDone}
                className="px-6 py-2 rounded-[64px] bg-linear-to-r from-[#904BFF] to-[#C053C2] !text-white text-sm font-medium cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col justify-center px-8 border-r border-[#CBD5FF] last:border-r-0">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-lg font-semibold text-gray-900">{value}</span>
    </div>
  );
}
