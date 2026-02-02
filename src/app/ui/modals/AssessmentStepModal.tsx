'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CircleCheckBig } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { notifyManager, useMutation } from '@tanstack/react-query';
import { attemptsApi } from '@/app/components/dashboards/student/assessment/attempts/assessment.service';
import { message } from 'antd';
import StepPrivacyConsent from './StepPrivacyConsent';
import StepMicCheck from './StepMicCheck';
import StepCameraCheck from './StepCameraCheck';
import StepStartTest from './StepStartTest';

type Props = {
  open: boolean;
  onClose: () => void;
  assessmentId?: string;
};

type MicStatus = 'idle' | 'error' | 'analyzing' | 'success';
export type CameraStatus = 'off' | 'starting' | 'working' | 'aligning' | 'success' | 'error';

export default function AssessmentStepModal({ open, onClose, assessmentId = '35' }: Props) {
  const [step, setStep] = useState(1);
  const [consentChecked, setConsentChecked] = useState(false);
  const [micStatus, setMicStatus] = useState<MicStatus>('idle');
  const [cameraStatus, setCameraStatus] = useState<CameraStatus>('off');
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[6px]">
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
        {/* HEADER */}
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

          <div className="h-px bg-[#E4E7EC]" />
        </div>

        {/* BODY */}
        <div className="flex-1 mt-3">
          {step === 1 && (
            <StepPrivacyConsent
              consentChecked={consentChecked}
              setConsentChecked={setConsentChecked}
            />
          )}

          {step === 2 && <StepMicCheck micStatus={micStatus} setMicStatus={setMicStatus} />}

          {step === 3 && (
            <StepCameraCheck
              cameraStatus={cameraStatus}
              setCameraStatus={setCameraStatus}
              videoStream={videoStream}
              setVideoStream={setVideoStream}
            />
          )}

          {step === 4 && <StepStartTest />}
        </div>

        {/* FOOTER */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={onClose}
            className="
              flex-1
              h-10
              rounded-full
              border border-[#344054]
              text-[#344054]
              font-medium
            "
          >
            Cancel
          </button>

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
