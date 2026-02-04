'use client';

import AssessmentStepper from './AssessmentStepper';

import AssessmentHeader from './AssessmentHeader';
// import QuestionStepper from './QuestionStepper';
import AssessmentFooter from './AssessmentFooter';
import { QuestionRenderer } from './questions/QuestionRenderer';
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mcqDummyQuestions } from './data/mcq.dummy';
import { useMutation, useQuery } from '@tanstack/react-query';
import { assessmentApi } from './assessment.service';
import { message } from 'antd';
import AssessmentTimeUpModal from '@/app/ui/modals/AssessmentTimeUpModal';

// type Props = {
//   assessmentId: string;
// };

export default function AssessmentAttempt() {
  const params = useParams();
  const router = useRouter();

  const [selectedOptionsMap, setSelectedOptionsMap] = useState<Record<number, number[]>>({});
  const [timeUp, setTimeUp] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [codingAttemptedMap, setCodingAttemptedMap] = useState<Record<number, boolean>>({});

  const fullscreenLockRef = useRef(false);

  const handleSelectOption = (optionIds: number[]) => {
    setSelectedOptionsMap((prev) => ({
      ...prev,
      [currentIndex]: optionIds,
    }));
  };

  const assessmentId = typeof params.assessmentId === 'string' ? params.assessmentId : undefined;

  const { data: runtime, isLoading: runtimeLoading } = useQuery({
    queryKey: ['assessment-runtime', assessmentId],
    queryFn: () => {
      if (!assessmentId) {
        throw new Error('Assessment ID missing');
      }
      return assessmentApi.getRuntime(assessmentId);
    },
    enabled: !!assessmentId,
  });

  useEffect(() => {
    const fromPreview = sessionStorage.getItem('return-from-preview');
    if (!fromPreview || !runtime?.total_questions) return;

    setCurrentIndex(runtime.total_questions - 1);

    sessionStorage.removeItem('return-from-preview');
  }, [runtime?.total_questions]);

  useEffect(() => {
    const saved = sessionStorage.getItem('assessment-attempt-state');
    if (!saved) return;

    const parsed = JSON.parse(saved);

    setCurrentIndex(parsed.currentIndex);
    setQuestionStatus(parsed.questionStatus);
    setSelectedOptionsMap(parsed.selectedOptionsMap);
  }, []);

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
  >({});

  // useEffect(() => {
  //   if (!runtime?.total_questions) return;

  //   setQuestionStatus(
  //     Object.fromEntries(
  //       Array.from({ length: runtime.total_questions }).map((_, i) => [
  //         i,
  //         { attempted: false, visited: i === 0, review: false },
  //       ])
  //     )
  //   );
  // }, [runtime?.total_questions]);

  useEffect(() => {
    if (!runtime?.total_questions) return;

    setQuestionStatus((prev) => {
      if (Object.keys(prev).length > 0) return prev;

      return Object.fromEntries(
        Array.from({ length: runtime.total_questions }).map((_, i) => [
          i,
          { attempted: false, visited: i === 0, review: false },
        ])
      );
    });
  }, [runtime?.total_questions]);

  /* ================= Fetch Question ================= */
  const { data: currentQuestion, isLoading: questionLoading } = useQuery({
    queryKey: ['assessment-question', assessmentId, currentIndex],
    queryFn: () => {
      if (!assessmentId) throw new Error('Assessment ID missing');
      return assessmentApi.getQuestion(assessmentId, currentIndex);
    },
    enabled: !!assessmentId,
  });

  // const [selectedOptionIds, setSelectedOptionIds] = useState<number[]>([]);
  const questionStartTimeRef = useRef<number>(Date.now());

  /* ================= Save Answer ================= */
  const saveAnswerMutation = useMutation({
    mutationFn: (payload: {
      assessment_question_id: string;
      question_id: string;
      selected_option_ids: number[];
      time_taken_seconds: number;
    }) => {
      if (!assessmentId) throw new Error('Assessment ID missing');
      return assessmentApi.saveMcqAnswer(assessmentId, payload);
    },
  });

  // // 🔹 Enter fullscreen on mount
  useEffect(() => {
    document.documentElement.requestFullscreen?.().catch(() => {});
  }, []);

  // useEffect(() => {
  //   const handleFullscreenChange = () => {
  //     if (!document.fullscreenElement && !fullscreenLockRef.current) {
  //       fullscreenLockRef.current = true;

  //       setShowCancelModal(true);

  //       setTimeout(() => {
  //         document.documentElement.requestFullscreen().catch(() => {});
  //       }, 0);
  //     }
  //   };

  //   document.addEventListener('fullscreenchange', handleFullscreenChange);
  //   return () => {
  //     document.removeEventListener('fullscreenchange', handleFullscreenChange);
  //   };
  // }, []);

  const saveCurrentAnswer = async () => {
    if (!currentQuestion) return;

    const selectedOptions = selectedOptionsMap[currentIndex] ?? [];
    const timeTakenSeconds = Math.floor((Date.now() - questionStartTimeRef.current) / 1000);

    await saveAnswerMutation.mutateAsync({
      assessment_question_id: currentQuestion.assessment_question_id,
      question_id: currentQuestion.question_id,
      selected_option_ids: selectedOptions, // empty allowed
      time_taken_seconds: timeTakenSeconds,
    });

    setQuestionStatus((prev) => ({
      ...prev,
      [currentIndex]: {
        ...prev[currentIndex],
        attempted: selectedOptions.length > 0,
        visited: true,
      },
    }));
  };

  /* ================= Navigation ================= */

  // const goNext = async () => {
  //   if (!currentQuestion) return;

  //   const selectedOptions = selectedOptionsMap[currentIndex] ?? [];
  //   const isAttempted = selectedOptions.length > 0;

  //   try {
  //     const timeTakenSeconds = Math.floor((Date.now() - questionStartTimeRef.current) / 1000);

  //     // 🔹 Save answer (empty array allowed)
  //     await saveAnswerMutation.mutateAsync({
  //       assessment_question_id: currentQuestion.assessment_question_id,
  //       question_id: currentQuestion.question_id,
  //       selected_option_ids: selectedOptions,
  //       time_taken_seconds: timeTakenSeconds,
  //     });

  //     setQuestionStatus((prev) => {
  //       const next = { ...prev };

  //       const selectedOptions = selectedOptionsMap[currentIndex] ?? [];
  //       const isAttempted = selectedOptions.length > 0;

  //       // ✅ Update CURRENT question
  //       next[currentIndex] = {
  //         ...next[currentIndex],
  //         attempted: isAttempted,
  //         visited: true,
  //       };

  //       // ✅ Update NEXT question ONLY if it exists
  //       if (next[currentIndex + 1]) {
  //         next[currentIndex + 1] = {
  //           ...next[currentIndex + 1],
  //           visited: true,
  //         };
  //       }

  //       return next;
  //     });

  //     setCurrentIndex((i) => i + 1);
  //     questionStartTimeRef.current = Date.now();
  //   } catch {
  //     message.error('Failed to save answer');
  //   }
  // };

  const goNext = async () => {
    if (!currentQuestion) return;

    const selectedOptions = selectedOptionsMap[currentIndex] ?? [];

    const isMcq = currentQuestion.type === 'single_correct';
    const isCoding = currentQuestion.type === 'coding';

    const isAttempted = isMcq
      ? selectedOptions.length > 0
      : questionStatus[currentIndex]?.attempted === true;

    try {
      const timeTakenSeconds = Math.floor((Date.now() - questionStartTimeRef.current) / 1000);

      if (isMcq) {
        await saveAnswerMutation.mutateAsync({
          assessment_question_id: currentQuestion.assessment_question_id,
          question_id: currentQuestion.question_id,
          selected_option_ids: selectedOptions,
          time_taken_seconds: timeTakenSeconds,
        });
      }

      setQuestionStatus((prev) => {
        const next = { ...prev };

        next[currentIndex] = {
          ...next[currentIndex],
          attempted: isAttempted,
          visited: true,
        };

        if (next[currentIndex + 1]) {
          next[currentIndex + 1] = {
            ...next[currentIndex + 1],
            visited: true,
          };
        }

        return next;
      });

      setCurrentIndex((i) => i + 1);
      questionStartTimeRef.current = Date.now();
    } catch {
      message.error('Failed to save answer');
    }
  };

  const goPrev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((i) => i - 1);
  };

  // const submitAssessment = async () => {
  //   try {
  //     await saveCurrentAnswer();
  //     router.replace(`/student/assessment/${assessmentId}/preview`);
  //   } catch {
  //     message.error('Failed to save answer');
  //   }
  // };

  const submitAssessment = async () => {
    try {
      await saveCurrentAnswer();

      sessionStorage.setItem(
        'assessment-attempt-state',
        JSON.stringify({
          currentIndex,
          questionStatus,
          selectedOptionsMap,
        })
      );

      router.replace(`/student/assessment/${assessmentId}/preview`);
    } catch {
      message.error('Failed to save answer');
    }
  };

  if (runtimeLoading || questionLoading) return null;

  return (
    <>
      <div className="h-screen pb-6 px-12 bg-[#F7F6FB] flex flex-col">
        <AssessmentHeader durationMinutes={runtime?.duration_minutes} onTimeUp={submitAssessment} />

        <div className="px-6 mt-6 flex-shrink-0">
          <AssessmentStepper
            total={runtime?.total_questions ?? 0}
            currentIndex={currentIndex}
            statusMap={questionStatus}
            onStepClick={(index) => {
              if (index > currentIndex) return;
              setCurrentIndex(index);
              questionStartTimeRef.current = Date.now();
            }}
          />
        </div>

        <div className="flex-1 mt-6 min-h-0 mb-6">
          <div
            className="bg-white border border-[#FFFFFF80] rounded-2xl shadow-[0px_0px_8px_0px_rgba(15,23,42,0.15)]
                p-6 flex flex-col w-full h-full"
          >
            <QuestionRenderer
              currentIndex={currentIndex}
              question={currentQuestion}
              onSelectOption={handleSelectOption}
              selectedOptions={selectedOptionsMap[currentIndex] ?? []}
              isReviewed={questionStatus[currentIndex]?.review ?? false}
              onToggleReview={(index) => {
                setQuestionStatus((prev) => ({
                  ...prev,
                  [index]: {
                    ...prev[index],
                    review: !prev[index].review,
                    visited: true,
                  },
                }));
              }}
              onCodingAttempted={(index) => {
                setQuestionStatus((prev) => ({
                  ...prev,
                  [index]: {
                    ...prev[index],
                    attempted: true,
                    visited: true,
                  },
                }));
              }}
            />
          </div>
        </div>

        <div className="flex-shrink-0">
          <AssessmentFooter
            currentIndex={currentIndex}
            total={runtime?.total_questions ?? 0}
            onPrev={goPrev}
            onNext={goNext}
            onSubmit={submitAssessment}
          />
        </div>
      </div>
      <AssessmentTimeUpModal open={timeUp} redirectSeconds={5} />

      <AssessmentTimeUpModal
        open={showCancelModal}
        mode="cancel"
        onCancelClose={() => {
          fullscreenLockRef.current = false;
          document.documentElement.requestFullscreen?.();
          setShowCancelModal(false);
        }}
        onCancelConfirm={() => {
          router.replace('/student/assessment');
        }}
      />
    </>
  );
}
