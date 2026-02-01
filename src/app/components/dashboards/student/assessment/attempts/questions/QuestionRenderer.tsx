'use client';

import DifficultyBadge from '../DifficultyBadge';
import MarkForReview from '../MarkForReview';
import McqQuestion from './McqQuestion';
import CodingQuestion from './CodingQuestion';
import { mcqDummyQuestions } from '../data/mcq.dummy';
import Image from 'next/image';

type Props = {
  currentIndex: number;
  question: any;
  onSelectOption: (ids: number[]) => void;
  selectedOptions: number[];

  onToggleReview: (index: number) => void; // ✅ ADD
  isReviewed: boolean;
};

export function QuestionRenderer({
  currentIndex,
  question,
  onSelectOption,
  selectedOptions,

  onToggleReview,
  isReviewed,
}: Props) {
  const questionType: 'mcq' | 'coding' = 'coding';
  // const currentQuestion = mcqDummyQuestions[currentIndex];

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* ───────── Top Center Title ───────── */}
      <div className="relative flex items-center justify-center">
        <span className="text-base font-semibold text-gray-900">
          {questionType === 'coding' ? 'MCQ - Single correct answer' : 'Coding - Single problem'}
        </span>

        <span className="absolute right-0 text-sm font-semibold text-gray-700">
          {/* Marks : {questionType === 'mcq' ? 25 : 100} */}
          Marks : {question?.marks ?? 0}
        </span>
      </div>

      {/* ───────── Question Header (FIGMA MATCH) ───────── */}
      <div className="mt-4 flex items-start justify-between">
        {/* Left */}
        <div>
          <h3 className="font-medium text-[#6C768A] text-[16px] mb-1">
            Question {currentIndex + 1}
          </h3>
          <p className="text-[16px] font-medium text-[#1A2C50]"> {question?.question_text}</p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <DifficultyBadge difficulty="easy" />
          {/* <MarkForReview /> */}
          {/* <Image src="/assets/flagIcon.svg" width={40} height={30} alt="flag" /> */}
          <Image
            src="/assets/flagIcon.svg"
            width={40}
            height={30}
            alt="flag"
            onClick={() => onToggleReview(currentIndex)}
            className={`cursor-pointer ${
              isReviewed ? 'filter hue-rotate-[310deg] saturate-150' : ''
            }`}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="mt-4 border-t border-gray-200" />

      {/* ───────── Question Body ───────── */}
      <div className="mt-4 flex-1 min-h-0 overflow-hidden">
        {/* {questionType === 'coding' && (
          <McqQuestion
            question={question}
            selectedOptions={selectedOptions}
            onSelectOption={onSelectOption}
          />
        )} */}
        {questionType === 'coding' && <CodingQuestion />}
      </div>
    </div>
  );
}
