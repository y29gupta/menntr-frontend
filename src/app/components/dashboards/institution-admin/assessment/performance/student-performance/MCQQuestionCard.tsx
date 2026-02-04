'use client';

import { CheckCircle, XCircle } from 'lucide-react';

/* ================= LOCAL TYPE (MUST MATCH) ================= */

type Difficulty = 'Easy' | 'Medium' | 'Hard';
type QuestionType = 'MCQ' | 'CODING';

interface QuestionReport {
  id: string;
  questionNo: string;
  title: string;
  type: QuestionType;
  difficulty: Difficulty;
  totalMarks: number;
  marksObtained: number;
  options?: string[];
  selectedOption?: number;
  correctOption?: number;
}

/* ================= STYLES ================= */

const difficultyStyles: Record<Difficulty, { bg: string; text: string }> = {
  Easy: { bg: 'bg-green-100', text: 'text-green-700' },
  Medium: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  Hard: { bg: 'bg-red-100', text: 'text-red-700' },
};

export function MCQQuestionCard({ q }: { q: QuestionReport }) {
  if (q.type !== 'MCQ') return null;

  const isCorrect = q.selectedOption === q.correctOption;

  return (
    <div className="rounded-2xl border border-[#E4E7EC] bg-white p-6 space-y-6">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-2">
          <h3 className="text-[16px] font-semibold text-[#2F3B52]">
            {q.questionNo}: {q.title}
          </h3>

          <div className="text-sm text-[#5F636F] flex gap-2">
            <span>{q.totalMarks} Mark</span>
            <span>|</span>
            <span>Quantitative Aptitude</span>
            <span>|</span>
            <span>MCQ - Single correct answer</span>
          </div>
        </div>

        <span
          className={`rounded-md px-2 py-0.5 text-sm font-medium 
          ${difficultyStyles[q.difficulty].bg} 
          ${difficultyStyles[q.difficulty].text}`}
        >
          {q.difficulty}
        </span>
      </div>

      <hr className="border-[#DBE3E9]" />

      <div className="space-y-3">
        <p className="text-[16px] font-semibold text-[#2F3B52]">Candidate Response</p>

        {q.options?.map((opt, i) => {
          const selected = i === q.selectedOption;
          const correct = i === q.correctOption;

          return (
            <div
              key={i}
              className={`flex justify-between items-center rounded-lg border px-4 py-3
                ${
                  selected
                    ? 'border-[#7C3AED] bg-purple-50'
                    : correct
                      ? 'border-green-500 bg-green-50'
                      : 'border-[#EAECF0]'
                }`}
            >
              <span className="text-[#2F3B52]">{opt}</span>
              {selected && !correct && <XCircle className="h-4 w-4 text-red-500" />}
              {correct && <CheckCircle className="h-4 w-4 text-green-600" />}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-lg border border-[#DBE3E9] px-4 py-3 flex gap-2 items-center">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span className="text-[#5F636F]">{q.options?.[q.correctOption!]}</span>
        </div>

        <div className="rounded-lg border border-[#DBE3E9] px-4 py-3 space-y-1">
          <p className={`font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? 'Correct' : 'Failed'}
          </p>
          <p className="text-[#5F636F]">
            Score:{' '}
            <span className="font-semibold">
              {q.marksObtained}/{q.totalMarks}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
