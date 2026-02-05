'use client';

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
  language?: string;
  code?: string;
  testPassed?: number;
  testTotal?: number;
}

/* ================= STYLES ================= */

const difficultyStyles: Record<Difficulty, { bg: string; text: string }> = {
  Easy: { bg: 'bg-green-100', text: 'text-green-700' },
  Medium: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  Hard: { bg: 'bg-red-100', text: 'text-red-700' },
};

export function CodingQuestionCard({ q }: { q: QuestionReport }) {
  if (q.type !== 'CODING') return null;

  const status =
    q.testPassed === q.testTotal ? 'Correct' : q.testPassed === 0 ? 'Failed' : 'Partially Correct';

  const statusColor =
    status === 'Correct'
      ? 'text-green-600'
      : status === 'Failed'
        ? 'text-red-600'
        : 'text-yellow-600';

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
            <span>Domain</span>
            <span>|</span>
            <span>Coding</span>
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

      <div className="space-y-2">
        <p className="text-[16px] font-semibold text-[#2F3B52]">Submitted code</p>
        <p className="text-sm text-[#5F636F]">{q.language}</p>

        <pre className="rounded-lg bg-[#EFEFEF] p-4 text-sm overflow-x-auto text-[#101828]">
          {q.code}
        </pre>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-lg border border-[#DBE3E9] px-4 py-3 space-y-1">
          <p className="text-[#5F636F]">
            Test Cases Passed:{' '}
            <span className="font-semibold">
              {q.testPassed}/{q.testTotal}
            </span>
          </p>
          <p className="text-[#5F636F]">Execution Time: 1.2s</p>
        </div>

        <div className="rounded-lg border border-[#DBE3E9] px-4 py-3 space-y-1">
          <p className={`font-semibold ${statusColor}`}>{status}</p>
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
