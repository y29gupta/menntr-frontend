import DifficultyBadge from '../DifficultyBadge';
import MarkForReview from '../MarkForReview';
import McqQuestion from './McqQuestion';
import CodingQuestion from './CodingQuestion';

export function QuestionRenderer() {
  const questionType: 'mcq' | 'coding' = 'mcq';

  return (
    <div className="flex flex-col">
      <div className="relative mt-3 flex items-center justify-center">
        <span className="text-base font-semibold text-gray-900">
          {questionType === 'mcq' ? 'MCQ - Single correct answer' : 'Coding - Single problem'}
        </span>

        {/* Marks must be absolutely positioned */}
        <span className="absolute right-0 text-sm font-semibold text-gray-700">
          Marks : {questionType === 'mcq' ? 25 : 100}
        </span>
      </div>
      {/* ───────── Section 1: Top meta row ───────── */}
      <div className="flex items-center justify-end text-sm text-gray-500">
        <div className="flex items-center gap-3">
          <DifficultyBadge />
          <MarkForReview />
        </div>
      </div>

      {/* ───────── Section 2: Centered title + marks ───────── */}

      {/* Divider */}
      <div className="mt-4 border-t border-gray-200" />

      {/* ───────── Section 3: Question body ───────── */}
      <div className="mt-4">
        <span>Question 3</span>
        {questionType === 'mcq' && <McqQuestion />}
        {/* {questionType === 'coding' && <CodingQuestion />} */}
      </div>
    </div>
  );
}
