'use client';

import { useRef, useState } from 'react';
// import { TOTAL_STEPS, PRIMARY_BUTTON, SECONDARY_BUTTON, BUTTON } from './constants';

import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree, { StepThreeHandle } from './steps/StepThree';
import StepFour from './steps/StepFour';
import { ConfirmPublishModal } from './ConfirmPublishModal';
import { SuccessModal } from './SuccessModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { message } from 'antd';
import { BUTTON, PRIMARY_BUTTON, SECONDARY_BUTTON, TOTAL_STEPS } from './constants';

export function PublishEntitySteps({
  step,
  setStep,
  summaryData,
  onClose,
  onRequestPublish,
  entityId,
  entityLabel,
  fetchAssignedTo,
  fetchAccess,
  updateAccess,
  updateSchedule,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  summaryData: any;
  onClose: () => void;
  onRequestPublish: () => void;
  entityId: string;
  entityLabel: string;
  fetchAssignedTo: (id: string) => Promise<any>;
  fetchAccess: (id: string) => Promise<any>;
  updateAccess: (id: string, payload: any) => Promise<any>;
  updateSchedule: (id: string, payload: any) => Promise<any>;
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
    queryKey: ['entity-assignedTo'],
    queryFn: () => fetchAssignedTo(entityId),
    enabled: false,
  });

  // const assessmentId = '6'; // dynamic later

  const { data: accessData } = useQuery({
    queryKey: ['entity-access', entityId],
    queryFn: () => fetchAccess(entityId),
    enabled: step === 4 && !!entityId,
  });
  console.log(accessData, 'accessdata');

  const updateAccessMutation = useMutation({
    mutationFn: (payload: any) => updateAccess(entityId, payload),

    onError: () => {
      message.error('Failed to update student access');
    },
  });

  const scheduleMutation = useMutation({
    mutationFn: (payload: any) => updateSchedule(entityId, payload),

    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: ['entity-summary', entityId],
      });

      const previous = queryClient.getQueryData(['assessment-summary', entityId]);

      queryClient.setQueryData(['entity-summary', entityId], (old: any) => ({
        ...old,
        ...payload,
      }));

      return { previous };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(['entity-summary', entityId], context?.previous);
      message.error(`Failed to schedule ${entityLabel.toLowerCase()}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['entity-summary', entityId],
      });
    },
  });

  return (
    <>
      {/* MAIN FLOW MODAL */}
      <div>
        {/* HEADER */}

        {/* BODY */}
        {step === 1 && <StepOne data={summaryData} entityLabel={entityLabel} />}
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

      {/* SUCCESS MODAL */}
      {/* {showSuccess && (
        <SuccessModal
          entityLabel={entityLabel}
          entityName={entityName}
          redirectPath={redirectPath}
          onClose={onClose}
        />
      )} */}
    </>
  );
}
