import DifficultyBadge from '../DifficultyBadge';
import MarkForReview from '../MarkForReview';
import McqQuestion from './McqQuestion';
import CodingQuestion from './CodingQuestion';

export function QuestionRenderer() {
  const questionType: 'mcq' | 'coding' = 'mcq';

  return (
    <div className="flex flex-col">
      {/* ───────────── Top Meta Row ───────────── */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Question 3</span>

        <div className="flex items-center gap-3">
          <DifficultyBadge />
          <MarkForReview />
        </div>
      </div>

      {/* ───────────── Title + Marks Row (CENTERED) ───────────── */}
      <div className="relative flex items-center justify-center mt-3">
        <h2 className="text-base font-semibold text-gray-900">
          {questionType === 'mcq' ? 'MCQ - Single correct answer' : 'Coding - Single problem'}
        </h2>

        <span className="absolute right-0 text-sm font-semibold text-gray-700">
          Marks : {questionType === 'mcq' ? 25 : 100}
        </span>
      </div>

      {/* Divider */}
      <div className="mt-4 border-t" />

      {/* ───────────── Question Body ───────────── */}
      <div className="mt-4">
        {questionType === 'mcq' && <CodingQuestion />}
        {/* {questionType === 'coding' && <CodingQuestion />} */}
      </div>
    </div>
  );
}
