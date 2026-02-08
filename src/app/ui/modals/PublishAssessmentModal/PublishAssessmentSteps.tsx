'use client';

import { useRef, useState } from 'react';
import { TOTAL_STEPS, PRIMARY_BUTTON, SECONDARY_BUTTON, BUTTON } from './constants';

import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree, { StepThreeHandle } from './steps/StepThree';
import StepFour from './steps/StepFour';
import { AssessmentData, AssessmentSummary } from './types';
import { ConfirmPublishModal } from './ConfirmPublishModal';
import { SuccessModal } from './SuccessModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { assessmentApi } from '@/app/components/dashboards/institution-admin/assessment/assessment.service';

import { message } from 'antd';

export function PublishAssessmentSteps({
  step,
  setStep,
  assessmentData,
  onClose,
  onRequestPublish,
  assessmentId,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  assessmentData: AssessmentSummary | null;
  onClose: () => void;
  onRequestPublish: () => void;
  assessmentId: string;
}) {
  // const [step, setStep] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const stepThreeRef = useRef<StepThreeHandle>(null);

  const stepFourRef = useRef<any>(null);

  const queryClient = useQueryClient();

  const {
    data: assignedTo,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['assessmet-assignedTo'],
    queryFn: () => assessmentApi.getAssessmentAssignedToDetail(assessmentId),
    enabled: false,
  });

  // const assessmentId = '6'; // dynamic later

  const { data: accessData } = useQuery({
    queryKey: ['assessment-access', assessmentId],
    queryFn: () => assessmentApi.getAssessmentAccess(assessmentId!),
    enabled: step === 4 && !!assessmentId,
  });
  console.log(accessData, 'accessdata');

  const updateAccessMutation = useMutation({
    mutationFn: (payload: any) => assessmentApi.updateAssessmentAccess(assessmentId!, payload),

    onError: () => {
      message.error('Failed to update student access');
    },
  });

  const scheduleMutation = useMutation({
    mutationFn: (payload: any) => assessmentApi.updateAssessmentSchedule(assessmentId, payload),

    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: ['assessment-summary', assessmentId],
      });

      const previous = queryClient.getQueryData(['assessment-summary', assessmentId]);

      queryClient.setQueryData(['assessment-summary', assessmentId], (old: any) => ({
        ...old,
        ...payload,
      }));

      return { previous };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(['assessment-summary', assessmentId], context?.previous);
      message.error('Failed to schedule assessment');
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['assessment-summary', assessmentId],
      });
    },
  });

  return (
    <>
      {/* MAIN FLOW MODAL */}
      <div>
        {/* HEADER */}

        {/* BODY */}
        {step === 1 && <StepOne data={assessmentData} />}
        {step === 2 && <StepTwo assignedTo={assignedTo} />}
        {step === 3 && <StepThree ref={stepThreeRef} />}
        {step === 4 && <StepFour ref={stepFourRef} data={accessData} />}

        {/* FOOTER */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            onClick={async () => {
              try {
                if (step === 1) {
                  await refetch();
                }

                if (step === 3) {
                  const payload = stepThreeRef.current?.submit();
                  if (payload) {
                    console.log(payload, 'payload');

                    await scheduleMutation.mutateAsync(payload);
                  }
                }
                if (step === 4) {
                  const payload = stepFourRef.current?.submit();
                  console.log(payload, 'pyalod');

                  if (payload) {
                    const accesspayload = {
                      shuffle_questions: payload.shuffleQuestions,
                      shuffle_options: payload.shuffleOptions,
                      allow_reattempts: payload.allowReattempts,
                      show_correct_answers: payload.showCorrectAnswers,
                      show_score_immediate: payload.showScoreImmediately,
                    };
                    await updateAccessMutation.mutateAsync(accesspayload);
                  }

                  onRequestPublish(); // switches view to confirm
                  return;
                }

                if (step < TOTAL_STEPS) {
                  setStep(step + 1);
                } else {
                  onRequestPublish();
                }
              } catch (e: any) {
                message.error(e.message);
              }
            }}
            className={`${BUTTON} ${PRIMARY_BUTTON}`}
          >
            Next
          </button>

          <button onClick={onClose} className={`${BUTTON} ${SECONDARY_BUTTON}`}>
            Cancel
          </button>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {/* {showConfirm && (
        <ConfirmPublishModal
          onCancel={() => setShowConfirm(false)}
          // onPublish={() => {
          //   setShowConfirm(false);
          //   setShowSuccess(true);
          // }}
          onPublish={async () => {
            try {
              if (!assessmentId) return;

              await assessmentApi.publishAssessment(assessmentId);
              setView('success');
            } catch {
              message.error('Failed to publish assessment');
            }
          }}
        />
      )} */}

      {/* SUCCESS MODAL */}
      {showSuccess && <SuccessModal assessmentName="Aptitude Mock - Jan 2025" onClose={onClose} />}
    </>
  );
}
