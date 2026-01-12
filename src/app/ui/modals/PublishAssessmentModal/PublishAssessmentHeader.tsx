'use client';

import { TOTAL_STEPS } from './constants';

export default function PublishAssessmentHeader({ step = TOTAL_STEPS }: { step?: number }) {
  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[20px] font-semibold text-[#101828]">Publish Assessment</h2>
          <p className="mt-1 text-[14px] text-[#667085]">
            Review settings and publish this assessment for students
          </p>
        </div>

        <span className="text-[14px] text-[#667085]">
          Step {step} of {TOTAL_STEPS}
        </span>
      </div>

      <div className="my-3 border-b border-[#C3CAD9]" />
    </>
  );
}
