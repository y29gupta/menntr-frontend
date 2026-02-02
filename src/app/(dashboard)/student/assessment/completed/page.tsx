'use client';

import AssessmentHeaders from '@/app/components/dashboards/student/assessment/assessmentHeaders';

export default function AssessmentCompletedPage() {
  return (
    <div className="min-h-screen">
      <AssessmentHeaders />

      {/* ================= MAIN CARD ================= */}
      <div
        className="
          bg-white
          border border-gray-200
          rounded-2xl
          shadow-[0_6px_24px_rgba(16,24,40,0.08)]
          p-4 sm:p-5 md:p-6
        "
      >
        {/* ================= TOP ROW ================= */}
        <div className="flex justify-between items-start flex-wrap gap-3">
          {/* Go Back */}
          <div className="mt-2 sm:mt-4">
            <button className="text-sm flex items-center gap-2 font-medium text-gray-600 hover:text-gray-900">
              <img src="/Go-back.svg" alt="goback" />
              Go back
            </button>
          </div>

          {/* Status */}
          <div className="flex flex-col items-end gap-2 sm:gap-3">
            <div className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-lg font-medium">
              Completed
            </div>

            <p className="text-xs text-slate-500">
              Assigned on :
              <span className="font-medium text-slate-500 ml-1">
                21st June 2025
              </span>
            </p>
          </div>
        </div>

        {/* ================= TITLE ================= */}
        <div className="flex flex-col mt-3">
          <p className="text-base sm:text-lg text-slate-800 font-medium">
            Mid-Term Coding Test
          </p>

          <p className="flex flex-wrap items-center text-[12px] text-slate-500 mt-1">
            <span>Data Structures</span>
            <span className="mx-2 text-slate-400">•</span>
            <span>3rd Year</span>
            <span className="mx-2 text-slate-400">•</span>
            <span>Section A</span>
          </p>
        </div>

        {/* ================= OVERVIEW ================= */}
        <div className="bg-[#FAFBFC] border border-gray-200 rounded-xl p-5 mt-5">
          <h3 className="text-sm font-semibold text-gray-800">
            Assessment Overview
          </h3>

          <div className="h-px bg-gray-200 mt-3 mb-4" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <OverviewItem label="Duration" value="120 minutes" />
            <OverviewItem label="Assessment Type" value="MCQ + Coding" />
            <OverviewItem label="Total Questions" value="30" />
            <OverviewItem label="MCQ Questions" value="25 (25 marks)" />
            <OverviewItem label="Coding Questions" value="5 (75 marks)" />
            <OverviewItem label="Total Marks" value="100" />
          </div>
        </div>

        {/* ================= RULES ================= */}
        <div className="bg-[#FAFBFC] border border-gray-200 rounded-xl p-5 mt-5">
          <h3 className="text-sm font-semibold text-gray-800">
            Assessment Rules
          </h3>

          <div className="h-px bg-gray-200 mt-3 mb-4" />

          <ul className="space-y-3 text-sm text-gray-700">
            <Rule text="You can attempt this assessment only once." />
            <Rule text="The timer will start immediately after you begin." />
            <Rule text="Do not refresh or close the browser during the assessment." />
            <Rule text="Your responses are saved automatically." />
            <Rule text="The assessment will be submitted automatically when time ends." />
          </ul>
        </div>

        {/* ================= COMPLETED FOOTER ================= */}
        <div className="bg-[#FAFBFC] border border-gray-200 rounded-xl p-5 mt-5">
          <h3 className="text-sm font-semibold text-gray-800">
            Evaluation & Results
          </h3>

          <div className="h-px bg-gray-200 mt-3 mb-4" />

          <p className="text-sm text-gray-600 mb-6">
            MCQ answers will be evaluated automatically after submission. Coding
            answers will be evaluated after all test cases are executed. Results
            may take some time depending on question complexity.
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              className="
                px-6 py-2.5
                rounded-full
                text-sm font-medium
                text-purple-600!
                border border-purple-300
                hover:bg-purple-50
                transition
              "
            >
              View Submission
            </button>

            <button
              className="
                px-6 py-2.5
                rounded-full
                text-sm font-medium
                text-white!
                bg-gradient-to-r from-[#904BFF] to-[#C053C2]
                hover:opacity-90
                transition
              "
            >
              View Result
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SMALL REUSABLE COMPONENTS
========================================================= */

function OverviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r last:border-r-0 border-gray-200 pr-3">
      <p className="text-[13px] text-slate-500 mb-1">{label}</p>
      <p className="font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function Rule({ text }: { text: string }) {
  return (
    <li className="flex gap-2 items-center">
      <span className="mt-1 text-gray-800">◆</span>
      <span>{text}</span>
    </li>
  );
}
