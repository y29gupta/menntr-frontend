'use client';

import { QuestionReport } from './responses.types';

/* ================= DIFFICULTY STYLES ================= */

const difficultyStyles: Record<'Easy' | 'Medium' | 'Hard', { bg: string; text: string }> = {
  Easy: {
    bg: 'bg-green-100',
    text: 'text-green-700',
  },
  Medium: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
  },
  Hard: {
    bg: 'bg-red-100',
    text: 'text-red-700',
  },
};

export function CodingQuestionCard({ q }: { q: QuestionReport }) {
  const status =
    q.testPassed === q.testTotal ? 'Correct' : q.testPassed === 0 ? 'Failed' : 'Partially Correct';

  const statusColor =
    status === 'Correct'
      ? 'text-[#008E2D]'
      : status === 'Failed'
        ? 'text-[#F44336]'
        : 'text-[#C46800]';

  return (
    <div className="rounded-2xl border border-[#E4E7EC] bg-white p-5 sm:p-6 space-y-5">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-[#101828]">
            {q.questionNo}: {q.title}
          </h3>

          <div className="text-sm text-[#667085] flex items-center gap-2">
            <span>{q.totalMarks} Mark</span>
            <span>|</span>
            <span>Domain</span>
            <span>|</span>
            <span>Coding</span>
          </div>
        </div>

        {/* ===== DIFFICULTY BADGE (FIXED) ===== */}
        <div className="flex flex-col items-end gap-1">
          <span className="text-sm text-[#667085]">Mandatory</span>

          <span
            className={`rounded-md px-2 py-0.5 text-sm font-medium 
              ${difficultyStyles[q.difficulty].bg} 
              ${difficultyStyles[q.difficulty].text}`}
          >
            {q.difficulty}
          </span>
        </div>
      </div>

      <hr className="border-[#EAECF0]" />

      {/* ================= SUBMITTED CODE ================= */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-[#344054]">Submitted code</p>

        <p className="text-sm text-[#667085]">{q.language}</p>

        <pre className="rounded-lg bg-[#F9FAFB] p-4 text-sm leading-relaxed overflow-x-auto text-[#101828]">
          {q.code}
        </pre>
      </div>

      {/* ================= RESULT SECTION ================= */}
      <div className="space-y-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p className="text-sm font-medium text-[#344054]">Test case results</p>
          <p className="text-sm font-medium text-[#344054]">Result status</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Test cases */}
          <div className="rounded-lg border border-[#EAECF0] px-4 py-2 space-y-1">
            <p className="text-sm text-[#101828]">
              Test Cases Passed:{' '}
              <span className="font-semibold">
                {q.testPassed}/{q.testTotal}
              </span>
            </p>

            <p className="text-sm text-[#667085]">Execution Time: 1.2s</p>
          </div>

          {/* Status */}
          <div className="rounded-lg border border-[#EAECF0] px-4 py-2 space-y-1">
            <p className={`text-sm font-semibold ${statusColor}`}>{status}</p>

            <p className="text-sm text-[#101828]">
              Score:{' '}
              <span className="font-semibold">
                {q.marksObtained}/{q.totalMarks}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
