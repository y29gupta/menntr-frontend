'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CircleCheckBig } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { notifyManager, useMutation } from '@tanstack/react-query';
import { attemptsApi } from '@/app/components/dashboards/student/assessment/attempts/assessment.service';
import { message } from 'antd';

type Props = {
  open: boolean;
  onClose: () => void;
  assessmentId?: string;
};

type MicStatus = 'idle' | 'error' | 'analyzing' | 'success';

export default function AssessmentStepModal({ open, onClose, assessmentId = '35' }: Props) {
  const [step, setStep] = useState(1);
  const [consentChecked, setConsentChecked] = useState(false);
  const [micStatus, setMicStatus] = useState<MicStatus>('idle');

  const router = useRouter();

  const startAssessmentMutation = useMutation({
    mutationFn: (assessmentId: string) => attemptsApi.startAssessment(assessmentId),

    onSuccess: (data) => {
      // success notify (use your existing notify util if present)
      message.success(data.message || 'Assessment started successfully');
      onClose();

      if (assessmentId) {
        router.push(`/student/assessment/${assessmentId}`);
      }
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Unable to start assessment. Please try again.';
      message.error(
        error?.response?.data?.message || 'Unable to start assessment. Please try again.'
      );
    },
  });

  if (!open) return null;

  const nextStep = () => {
    if (step === 1 && !consentChecked) return;
    // if (step === 4) return onClose();
    // if (step === 4) {
    //   onClose();

    //   if (assessmentId) {
    //     // router.push(`/student/assessment/40`);
    //     router.push(`/student/assessment/${assessmentId}`);
    //   }

    //   return;
    // }
    if (step === 4) {
      if (!assessmentId || startAssessmentMutation.isPending) return;

      startAssessmentMutation.mutate(assessmentId);
      return;
    }

    setStep((s) => s + 1);
  };

  const startMicTest = () => {
    setMicStatus('analyzing');

    setTimeout(() => {
      const random = Math.random();

      if (random > 0.5) {
        setMicStatus('success');
      } else {
        setMicStatus('error');
      }
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[6px]">
      {/* ================= MODAL ================= */}
      <div
        className="
          bg-white
          rounded-[20px]
          shadow-[0px_20px_60px_rgba(16,24,40,0.25)]             
          w-200 h-100             
          md:w-180 md:h-auto
          p-6
          flex flex-col
          justify-between
        "
      >
        {/* ================= HEADER ================= */}
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-[20px] font-bold text-[#0F172A]">Before you begin</h2>

              <p className="text-[14px] text-[#6E788C]">
                We need to verify your microphone and camera to ensure a smooth test experience
              </p>
            </div>

            <p className="text-[14px] text-[#1A2C50] flex items-center gap-1">
              Step
              <span className="font-semibold text-[#101828] text-[16px] leading-none">{step}</span>
              of 4
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#E4E7EC]" />
        </div>

        {/* ================= BODY ================= */}
        <div className="flex-1 mt-3">
          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <div className="flex flex-col  gap-2">
              <h3 className="text-[16px] text-[#1A2C50]">Privacy & Permissions</h3>

              <p className="text-[14px] text-[#1A2C50] font-medium">
                We use your microphone and camera only during this assessment to:
              </p>

              <ul className="flex flex-col gap-3 text-[14px] text-[#344054]">
                <li className="flex items-center gap-2">
                  <span className="">◆</span>
                  Prevent malpractice
                </li>

                <li className="flex gap-2 ">
                  <span>◆</span>
                  Ensure fair evaluation
                </li>

                <li className="flex gap-2">
                  <span>◆</span>
                  Maintain test integrity
                </li>

                <li className="text-[#344054] mt-1 font-medium">
                  Your data is not stored beyond the assessment.
                </li>
              </ul>

              <div className="h-px bg-[#E4E7EC]" />

              {/* Checkbox */}

              <label className="flex items-start gap-2 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="
                    mt-0.75
                    peer
                    relative
                    h-4
                    w-4
                    appearance-none
                    rounded
                    border
                    border-gray-300
                    checked:border-transparent
                    checked:bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
                    checked:after:content-['✔']
                    checked:after:absolute
                    checked:after:inset-0
                    checked:after:flex  
                    checked:after:items-center
                    checked:after:justify-center
                    checked:after:text-[11px]
                    checked:after:text-white
                    "
                />

                <span className="text-[14px] font-medium text-[#1A2C50] leading-tight">
                  I consent to audio and video access for this assessment
                </span>
              </label>
            </div>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <div className="flex flex-col items-center justify-center h-full">
              {/* Title */}
              <div className="w-full text-left mb-2">
                <h3 className="text-[16px] font-semibold text-[#1A2C50]">Microphone Check</h3>

                <p className="text-[14px] text-[#667085] mt-1">
                  Please say “Hello” to test your microphone
                </p>
              </div>

              {/* Wave */}
              <div className="w-full flex justify-center my-3">
                <img src="/assets/Mic-test-waves.svg" alt="wave" className="w-full max-w-[670px]" />
              </div>

              {/* STATUS AREA */}
              <div className="flex flex-col items-center mt-3 min-h-[70px]">
                {/* ========== IDLE ========== */}
                {micStatus === 'idle' && (
                  <button
                    onClick={startMicTest}
                    className="
                        border border-[#904BFF]
                        text-[#904BFF]
                        px-6 py-2
                        rounded-full
                        text-sm
                        hover:bg-purple-50
                        transition
                    "
                  >
                    speak
                  </button>
                )}

                {/* ========== ANALYZING ========== */}
                {micStatus === 'analyzing' && (
                  <p className="text-[#1A2C50] font-normal text-sm">Analyzing your voice...</p>
                )}

                {/* ========== SUCCESS ========== */}
                {micStatus === 'success' && (
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                      <CircleCheckBig />
                      Microphone detected — you sound good!
                    </div>

                    <p className="text-[#6E788C] text-xs not-last-of-type:">
                      Click next to proceed
                    </p>
                  </div>
                )}

                {/* ========== ERROR ========== */}
                {micStatus === 'error' && (
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 text-[#F44336] text-sm font-medium">
                      <span>✕</span>
                      We couldn’t hear you — check mic settings
                    </div>

                    <button
                      onClick={startMicTest}
                      className="
                        border border-[#904BFF]
                        text-[#904BFF]!
                        px-5 py-2
                        rounded-full
                        text-sm
                        hover:bg-purple-50
                        "
                    >
                      Retry
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= STEP 3 ================= */}
          {step === 3 && (
            <div className="flex items-center justify-center h-full">
              <p className="text-[#475467] text-sm">Preparing your environment...</p>
            </div>
          )}

          {/* ================= STEP 4 ================= */}
          {step === 4 && (
            <div className="flex items-center justify-center h-full">
              <button
                className="
                  border border-[#904BFF]
                  text-[#904BFF]
                  px-6 py-2
                  rounded-full
                  text-sm
                "
              >
                Start Test
              </button>
            </div>
          )}
        </div>

        {/* ================= FOOTER ================= */}
        <div className="flex gap-4 mt-6">
          {/* Cancel */}
          <button
            onClick={onClose}
            className="
              flex-1
              h-[40px]
              rounded-full
              border border-[#344054]
              text-[#344054]
              font-medium
            "
          >
            Cancel
          </button>

          {/* Next */}
          <button
            onClick={nextStep}
            disabled={step === 1 && !consentChecked}
            className="
              flex-1
              h-10
              rounded-full
              text-white!
              font-medium
              bg-linear-to-r from-[#904BFF] to-[#C053C2]
              disabled:opacity-40
            "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
