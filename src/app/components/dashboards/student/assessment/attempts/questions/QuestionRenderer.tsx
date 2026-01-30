'use client';

import DifficultyBadge from '../DifficultyBadge';
import MarkForReview from '../MarkForReview';
import McqQuestion from './McqQuestion';
import CodingQuestion from './CodingQuestion';
import { useState } from 'react';

export function QuestionRenderer() {
  const [questionType] = useState<'mcq' | 'coding'>('coding');

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="relative mt-3 flex items-center justify-center">
        <span className="text-base font-semibold text-gray-900">
          {questionType === 'mcq' ? 'MCQ - Single correct answer' : 'Coding - Single problem'}
        </span>

        <span className="absolute right-0 text-sm font-semibold text-gray-700">
          Marks : {questionType === 'mcq' ? 25 : 100}
        </span>
      </div>

      <div className="flex items-center justify-end text-sm text-gray-500">
        <div className="flex items-center gap-3">
          <DifficultyBadge />
          <MarkForReview />
        </div>
      </div>

      <div className="mt-4 border-t border-gray-200" />

      <div className="mt-4">
        {/* {questionType === 'mcq' && <McqQuestion />} */}
        {questionType === 'coding' && <CodingQuestion />}
      </div>
    </div>
  );
}
