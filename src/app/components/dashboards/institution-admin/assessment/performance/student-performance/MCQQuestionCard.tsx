// MCQQuestionCard.tsx
'use client';

import { CheckCircle, XCircle } from 'lucide-react';
import { QuestionReport } from './responses.types';

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

export function MCQQuestionCard({ q }: { q: QuestionReport }) {
  const isCorrect = q.selectedOption === q.correctOption;

  const statusText = isCorrect ? 'Correct' : 'Failed';
  const statusColor = isCorrect ? 'text-green-600' : 'text-red-600';

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
            <span>Quantitative Aptitude</span>
            <span>|</span>
            <span>MCQ - Single correct answer</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-sm text-[#667085]">Mandatory</span>

          <span
            className={`rounded-md px-2 py-0.5 text-sm font-medium ${difficultyStyles[q.difficulty].bg} ${difficultyStyles[q.difficulty].text}`}
          >
            {q.difficulty}
          </span>
        </div>
      </div>

      <hr className="border-[#EAECF0]" />

      {/* ================= CANDIDATE RESPONSE ================= */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-[#344054]">Candidate Response</p>

        <div className="space-y-2">
          {q.options?.map((opt, i) => {
            const selected = i === q.selectedOption;
            const correct = i === q.correctOption;

            return (
              <div
                key={i}
                className={`
                  flex items-center justify-between rounded-lg border px-4 py-3 text-sm
                  ${
                    selected && !correct
                      ? 'border-purple-500 bg-purple-50'
                      : correct
                        ? 'border-green-500 bg-green-50'
                        : 'border-[#EAECF0]'
                  }
                `}
              >
                <span className="text-[#101828]">{opt}</span>

                {selected && !correct && <XCircle className="h-4 w-4 text-red-500" />}

                {correct && <CheckCircle className="h-4 w-4 text-green-600" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= RESULT SECTION ================= */}
      <div className="space-y-3">
        {/* Section headers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p className="text-sm font-medium text-[#344054]">Correct Answer</p>
          <p className="text-sm font-medium text-[#344054]">Result status</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Correct answer card */}
          <div className="rounded-lg border border-[#EAECF0] px-4  flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm text-[#101828]">{q.options?.[q.correctOption!]}</span>
          </div>

          {/* Status card */}
          <div className="rounded-lg border border-[#EAECF0] px-4 py-1 space-y-1">
            <p className={`text-sm font-semibold ${statusColor}`}>{statusText}</p>

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
