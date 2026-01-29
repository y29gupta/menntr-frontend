'use client';

// import AssessmentFooter from './AssessmentFooter';
// import AssessmentHeader from './AssessmentHeader';
import AssessmentStepper from './AssessmentStepper';
// import QuestionRenderer from './questions/QuestionRenderer';
// type Props = {
//   assessmentId: string;
// };

// export default function AssessmentAttempt({ assessmentId }: Props) {
//   // later:
//   // const { data, currentQuestion } = useAssessmentAttempt();

//   return (
//     <div className="flex flex-col gap-6 px-6 py-4">
//       {/* Header */}
//       <AssessmentHeader />

//       {/* Question Stepper */}
//       <AssessmentStepper />

//       {/* Question Card */}
//       <div className="bg-white rounded-2xl shadow-sm p-6">
//         <QuestionRenderer />
//       </div>

//       {/* Footer Navigation */}
//       <AssessmentFooter />
//     </div>
//   );
// }

import AssessmentHeader from './AssessmentHeader';
// import QuestionStepper from './QuestionStepper';
import AssessmentFooter from './AssessmentFooter';
import { QuestionRenderer } from './questions/QuestionRenderer';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  assessmentId: string;
};

const router = useRouter();

export default function AssessmentAttempt({ assessmentId }: Props) {
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
  return (
    <div className="min-h-screen border bg-[#F7F6FB] flex flex-col">
      <AssessmentHeader />

      <div className="px-6 mt-6">
        <AssessmentStepper />
      </div>

      <div className="flex-1 px-6 mt-6">
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6">
          <QuestionRenderer />
        </div>
      </div>

      <AssessmentFooter />
    </div>
  );
}
