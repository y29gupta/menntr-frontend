'use client';

import ProctoringClient from '@/proctoring/ProctoringClient';
import AssessmentStepper from './AssessmentStepper';
import AssessmentHeader from './AssessmentHeader';
import AssessmentFooter from './AssessmentFooter';
import { QuestionRenderer } from './questions/QuestionRenderer';
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { assessmentApi } from './assessment.service';
import { message } from 'antd';
import AssessmentTimeUpModal from '@/app/ui/modals/AssessmentTimeUpModal';

export default function AssessmentAttempt() {
  const params = useParams();
  const router = useRouter();

  const [selectedOptionsMap, setSelectedOptionsMap] = useState<Record<number, number[]>>({});
  const [timeUp, setTimeUp] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const fullscreenLockRef = useRef(false);
  const proctoringVideoRef = useRef<HTMLVideoElement | null>(null);
  const searchParams = useSearchParams();
  const attemptIdParam = searchParams.get('attemptId');
  const attemptId = attemptIdParam ? Number(attemptIdParam) : null;

  // ✅ ENTER FULLSCREEN ONCE
  useEffect(() => {
    document.documentElement.requestFullscreen?.().catch(() => {});
  }, []);

  // ✅ START CAMERA ONCE
  useEffect(() => {
    let mounted = true;

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(async (stream) => {
        if (!mounted) return;

        setVideoStream(stream);

        // attach stream to hidden video
        if (proctoringVideoRef.current) {
          proctoringVideoRef.current.srcObject = stream;
          await proctoringVideoRef.current.play().catch(() => {});
        }
      })
      .catch((err) => {
        console.error('❌ Camera access failed:', err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      console.log('🧹 Cleaning up camera stream');
      if (videoStream) {
        videoStream.getTracks().forEach((track) => {
          track.stop();
          console.log('🛑 Stopped track:', track.kind);
        });
      }
    };
  }, [videoStream]);

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

  const saveCurrentAnswer = async () => {
    if (!currentQuestion) return;

    const selectedOptions = selectedOptionsMap[currentIndex] ?? [];
    const timeTakenSeconds = Math.floor((Date.now() - questionStartTimeRef.current) / 1000);

    await saveAnswerMutation.mutateAsync({
      assessment_question_id: currentQuestion.assessment_question_id,
      question_id: currentQuestion.question_id,
      selected_option_ids: selectedOptions,
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

      // ✅ Stop camera before navigation
      console.log('🛑 Stopping camera before submit...');
      if (videoStream) {
        videoStream.getTracks().forEach((track) => {
          track.stop();
          console.log('🛑 Stopped track on submit:', track.kind);
        });
        setVideoStream(null);
      }

      router.replace(`/student/assessment/${assessmentId}/preview?attemptId=${attemptId}`);
    } catch {
      message.error('Failed to save answer');
    }
  };

  if (runtimeLoading || questionLoading) return null;

  return (
    <>
      <div className="h-screen px-12 bg-[#F7F6FB] flex flex-col">
        <AssessmentHeader durationMinutes={runtime?.duration_minutes} onTimeUp={submitAssessment} />

        <div className="px-6 flex-shrink-0">
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
              assessmentId={params.assessmentId}
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
          // ✅ Stop camera on cancel
          if (videoStream) {
            videoStream.getTracks().forEach((track) => track.stop());
            setVideoStream(null);
          }
          router.replace('/student/assessment');
        }}
      />

      {/* 🔒 Hidden video for proctoring */}
      <video
        ref={proctoringVideoRef}
        autoPlay
        muted
        playsInline
        style={{
          position: 'fixed',
          opacity: 0,
        }}
      />

      {/* 🧠 Proctoring engine – runs for full exam */}
      {videoStream && attemptId && (
        <ProctoringClient
          attemptId={attemptId}
          videoElement={proctoringVideoRef.current}
          videoStream={videoStream}
          enabled
        />
      )}
    </>
  );
}
