import DifficultyBadge from '../DifficultyBadge';
import MarkForReview from '../MarkForReview';
import McqQuestion from './McqQuestion';
import CodingQuestion from './CodingQuestion';
import { mcqDummyQuestions } from '../data/mcq.dummy';
import Image from 'next/image';

type Props = {
  currentIndex: number;
  setQuestionStatus: React.Dispatch<any>;
};

export function QuestionRenderer({ currentIndex, setQuestionStatus }: Props) {
  const questionType: 'mcq' | 'coding' = 'mcq';
  const currentQuestion = mcqDummyQuestions[currentIndex];

  return (
    <div className="flex flex-col flex-1 ">
      {/* ───────── Top Center Title ───────── */}
      <div className="relative flex items-center justify-center">
        <span className="text-base font-semibold text-gray-900">
          {questionType === 'mcq' ? 'MCQ - Single correct answer' : 'Coding - Single problem'}
        </span>

        <span className="absolute right-0 text-sm font-semibold text-gray-700">
          Marks : {questionType === 'mcq' ? 25 : 100}
        </span>
      </div>

      {/* ───────── Question Header (FIGMA MATCH) ───────── */}
      <div className="mt-4 flex items-start justify-between">
        {/* Left */}
        <div>
          <h3 className="font-medium text-[#6C768A] text-[16px] mb-1">
            Question {currentIndex + 1}
          </h3>
          <p className="text-[16px] font-medium text-[#1A2C50]">{currentQuestion.question}</p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <DifficultyBadge difficulty="easy" />
          {/* <MarkForReview /> */}
          <Image src="/assets/flagIcon.svg" width={40} height={30} alt="flag" />
        </div>
      </div>

      {/* Divider */}
      <div className="mt-4 border-t border-gray-200" />

      {/* ───────── Question Body ───────── */}
      <div className="mt-4 h-[250px] overflow-auto">
        {questionType === 'mcq' && (
          <McqQuestion
            question={currentQuestion}
            questionIndex={currentIndex}
            setQuestionStatus={setQuestionStatus}
          />
        )}
        {/* {questionType === 'coding' && <CodingQuestion />} */}
      </div>
    </div>
  );
}
