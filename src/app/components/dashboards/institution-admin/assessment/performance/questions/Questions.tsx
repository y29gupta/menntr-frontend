import { GripVertical, Trash2 } from 'lucide-react';

type Question = {
  id: string;
  question: string;
  mandatory: boolean;
  marks: number;
  subject: string;
  type: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
};

const QUESTIONS: Question[] = [
  {
    id: '1',
    question:
      'If the ratio of boys to girls in a class is 3 : 2 and there are 15 boys, how many girls are there in the class?',
    mandatory: true,
    marks: 1,
    subject: 'Quantitative Aptitude',
    type: 'MCQ - Single correct answer',
    difficulty: 'Easy',
  },
  {
    id: '2',
    question:
      'If a train travels 180 km at a constant speed and returns over the same distance at a speed that is 20 km/h less, what is the average speed?',
    mandatory: true,
    marks: 1,
    subject: 'Quantitative Aptitude',
    type: 'MCQ - Single correct answer',
    difficulty: 'Medium',
  },
  {
    id: '3',
    question:
      'A train travels 180 km at a constant speed and returns over the same distance at a speed that is 20 km/h less. Find the original speed.',
    mandatory: true,
    marks: 1,
    subject: 'Quantitative Aptitude',
    type: 'MCQ - Single correct answer',
    difficulty: 'Hard',
  },
];

const DIFFICULTY_STYLES: Record<Question['difficulty'], string> = {
  Easy: 'bg-[#ECFDF3] text-[#027A48]',
  Medium: 'bg-[#FFFAEB] text-[#8E6100]',
  Hard: 'bg-[#FFE6E6] text-[#8E0000]',
};

function Questions() {
  return (
    <div className="space-y-4">
      {QUESTIONS.map((q, index) => (
        <div key={q.id} className="flex">
          {/* Drag handle */}
          <div className="flex items-center rounded-l-xl bg-[#F0F2F7] px-2">
            <GripVertical size={18} className="shrink-0 text-[#98A2B3]" />
          </div>

          {/* Question card */}
          <div className="flex w-full flex-col rounded-r-xl border border-[#EAECF0] p-2 sm:flex-row">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                <p className="text-sm font-medium text-[#101828] break-words">
                  Q{index + 1}: {q.question}
                </p>
                {q.mandatory && (
                  <span className="text-sm text-[#667085] whitespace-nowrap">Mandatory</span>
                )}
              </div>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-[#667085]">
                  {q.marks} Mark | {q.subject} | {q.type}
                </p>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium ${DIFFICULTY_STYLES[q.difficulty]}`}
                  >
                    {q.difficulty}
                  </span>
                  <Trash2 size={16} className="text-[#636771]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Questions;
