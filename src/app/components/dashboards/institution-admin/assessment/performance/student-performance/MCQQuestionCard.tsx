// MCQQuestionCard.tsx
'use client';

import { CheckCircle, XCircle } from 'lucide-react';
import { QuestionReport } from './responses.types';

const difficultyStyles: Record<'Easy' | 'Medium' | 'Hard', { bg: string; text: string }> = {
  Easy: { bg: 'bg-green-100', text: 'text-[#008E2D]' },
  Medium: { bg: 'bg-yellow-100', text: 'text-[#8E6100]' },
  Hard: { bg: 'bg-red-100', text: 'text-[#8E0000]' },
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
          <h3 className="text-[16px] font-semibold text-[#2F3B52]">
            {q.questionNo}: {q.title}
          </h3>

          <div className="text-[14px] text-[#5F636F] flex items-center gap-2">
            <span>{q.totalMarks} Mark</span>
            <span>|</span>
            <span>Quantitative Aptitude</span>
            <span>|</span>
            <span>MCQ - Single correct answer</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-sm text-[#5F636F]">Mandatory</span>

          <span
            className={`rounded-md px-2 py-0.5 text-sm font-medium ${difficultyStyles[q.difficulty].bg} ${difficultyStyles[q.difficulty].text}`}
          >
            {q.difficulty}
          </span>
        </div>
      </div>

      <hr className="border-[#DBE3E9]" />

      {/* ================= CANDIDATE RESPONSE ================= */}
      <div className="space-y-3">
        <p className="text-[16px] font-semibold text-[#2F3B52]">Candidate Response</p>

        <div className="space-y-2">
          {q.options?.map((opt, i) => {
            const selected = i === q.selectedOption;
            const correct = i === q.correctOption;

            return (
              <div
                key={i}
                className={`
                  flex items-center gap-2 rounded-lg border px-4 py-3 text-[16px] border-[#7C3AED]
                  ${
                    selected && !correct
                      ? ' bg-purple-50'
                      : correct
                        ? ' bg-green-50'
                        : 'border-[#EAECF0]'
                  }
                `}
              >
                <span className="text-[#2F3B52]">{opt}</span>

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
          <p className="text-sm font-medium text-[#2F3B52]">Correct Answer</p>
          <p className="text-sm font-medium text-[#2F3B52]">Result status</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Correct answer card */}
          <div className="rounded-lg border border-[#DBE3E9] px-4 py-2 flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-[16px] text-[#5F636F]">{q.options?.[q.correctOption!]}</span>
          </div>

          {/* Status card */}
          <div className="rounded-lg border border-[#DBE3E9] px-4 py-2">
            <p className={`text-[16px] font-semibold ${statusColor}`}>{statusText}</p>

            <p className="text-[16px] text-[#5F636F]">
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
