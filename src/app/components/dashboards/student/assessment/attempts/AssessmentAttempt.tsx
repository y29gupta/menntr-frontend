'use client';

import AssessmentStepper from './AssessmentStepper';

import AssessmentHeader from './AssessmentHeader';
// import QuestionStepper from './QuestionStepper';
import AssessmentFooter from './AssessmentFooter';
import { QuestionRenderer } from './questions/QuestionRenderer';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { mcqDummyQuestions } from './data/mcq.dummy';

type Props = {
  assessmentId: string;
};

export default function AssessmentAttempt({ assessmentId }: Props) {
  const router = useRouter();
  const isExitingRef = useRef(false);

  const TOTAL_QUESTIONS = mcqDummyQuestions.length;

  const [currentIndex, setCurrentIndex] = useState(0);

  // question status map
  const [questionStatus, setQuestionStatus] = useState<
    Record<
      number,
      {
        attempted: boolean;
        visited: boolean;
        review: boolean;
      }
    >
  >(() =>
    Object.fromEntries(
      mcqDummyQuestions.map((_, i) => [i, { attempted: false, visited: i === 0, review: false }])
    )
  );

  // // 🔹 Enter fullscreen on mount
  useEffect(() => {
    document.documentElement.requestFullscreen?.().catch(() => {});
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        // ESC pressed → exit assessment
        router.replace('/student/assessment');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [router]);

  const goNext = () => {
    setQuestionStatus((prev) => ({
      ...prev,
      [currentIndex + 1]: {
        ...prev[currentIndex + 1],
        visited: true,
      },
    }));
    setCurrentIndex((i) => i + 1);
  };

  const goPrev = () => {
    setCurrentIndex((i) => i - 1);
  };

  const submitAssessment = () => {
    console.log('Submitted answers', questionStatus);
  };

  return (
    <div className="h-screen overflow-hidden px-12 bg-[#F7F6FB] flex flex-col">
      <AssessmentHeader />

      <div className="px-6  mt-6">
        <AssessmentStepper
          total={TOTAL_QUESTIONS}
          currentIndex={currentIndex}
          statusMap={questionStatus}
        />
      </div>

      <div className="flex-1 mt-6 min-h-0">
        <div
          className="bg-white border border-[#FFFFFF80] rounded-2xl shadow-[0px_0px_8px_0px_rgba(15,23,42,0.15)]
                p-6 flex flex-col w-full h-full min-h-0"
        >
          <QuestionRenderer currentIndex={currentIndex} setQuestionStatus={setQuestionStatus} />
        </div>
      </div>

      <div className="mt-6">
        <AssessmentFooter
          currentIndex={currentIndex}
          total={TOTAL_QUESTIONS}
          onPrev={goPrev}
          onNext={goNext}
          onSubmit={submitAssessment}
        />
      </div>
    </div>
  );
}
