'use client';

import { useState } from 'react';
import { TOTAL_STEPS, PRIMARY_BUTTON, SECONDARY_BUTTON, BUTTON } from './constants';

import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import StepFour from './steps/StepFour';
import { AssessmentData } from './types';
import { ConfirmPublishModal } from './ConfirmPublishModal';
import { SuccessModal } from './SuccessModal';

export function PublishAssessmentSteps({
  assessmentData,
  onClose,
  onRequestPublish,
}: {
  assessmentData: AssessmentData;
  onClose: () => void;
  onRequestPublish: () => void;
}) {
  const [step, setStep] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <>
      {/* MAIN FLOW MODAL */}
      <div>
        {/* HEADER */}
        {/* <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[16px] font-semibold text-[#101828]">Publish Assessment</h2>
            <p className="mt-1 text-[14px] text-[#667085]">
              Review settings and publish this assessment for students
            </p>
          </div>

          <span className="text-[14px] text-[#667085]">
            Step {step} of {TOTAL_STEPS}
          </span>
        </div> */}

        {/* <div className="my-3 border-b border-[#C3CAD9]" /> */}

        {/* BODY */}
        {step === 1 && <StepOne data={assessmentData} />}
        {step === 2 && <StepTwo />}
        {step === 3 && <StepThree />}
        {step === 4 && <StepFour />}

        {/* FOOTER */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            onClick={() => {
              if (step < TOTAL_STEPS) {
                setStep(step + 1);
              } else {
                onRequestPublish(); // 🔑 unmount steps modal
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
      {showConfirm && (
        <ConfirmPublishModal
          onCancel={() => setShowConfirm(false)}
          onPublish={() => {
            setShowConfirm(false);
            setShowSuccess(true);
          }}
        />
      )}

      {/* SUCCESS MODAL */}
      {showSuccess && <SuccessModal assessmentName="Aptitude Mock - Jan 2025" onClose={onClose} />}
    </>
  );
}
