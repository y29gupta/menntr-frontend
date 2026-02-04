'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';

import StepPrivacyConsent from './StepPrivacyConsent';
import StepMicCheck from './StepMicCheck';
import StepCameraCheck from './StepCameraCheck';
import StepStartTest from './StepStartTest';

import { attemptsApi } from '@/app/components/dashboards/student/assessment/attempts/assessment.service';
import { api } from '@/app/lib/api';

/* ================= TYPES ================= */

type Props = {
  open: boolean;
  onClose: () => void;
  assessmentId?: string;
};

type MicStatus = 'idle' | 'error' | 'analyzing' | 'success';
export type CameraStatus = 'off' | 'starting' | 'working' | 'aligning' | 'success' | 'error';

/* ================= CONSENT API ================= */

const assessmentConsentApi = {
  giveConsent: async (assessmentId: string) => {
    const res = await api.post(`/student/assessments/${assessmentId}/consent`);
    return res.data as {
      can_proceed: boolean;
      message?: string;
    };
  },
};

/* ================= COMPONENT ================= */

export default function AssessmentStepModal({ open, onClose, assessmentId }: Props) {
  const [step, setStep] = useState(1);
  const [consentChecked, setConsentChecked] = useState(false);
  const [micStatus, setMicStatus] = useState<MicStatus>('idle');
  const [cameraStatus, setCameraStatus] = useState<CameraStatus>('off');
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  const router = useRouter();
  const params = useParams();

  // ID ALWAYS COMES FROM URL
  const assessmentIdFromUrl = (params?.id as string) || assessmentId;

  /* ================= CONSENT MUTATION ================= */

  const consentMutation = useMutation({
    mutationFn: (id: string) => assessmentConsentApi.giveConsent(id),

    onSuccess: (data) => {
      if (data?.can_proceed) {
        setStep(2);
      } else {
        message.error(data?.message || 'Consent not approved');
      }
    },

    onError: () => {
      message.error('Unable to record consent. Please try again.');
    },
  });

  /* ================= START ASSESSMENT ================= */

  const startAssessmentMutation = useMutation({
    mutationFn: (id: string) => attemptsApi.startAssessment(id),

    onSuccess: (data) => {
      message.success(data.message || 'Assessment started');
      onClose();

      if (assessmentIdFromUrl) {
        router.push(`/student/assessment/${assessmentIdFromUrl}`);
      }
    },

    onError: (error: any) => {
      message.error(error?.response?.data?.message || 'Unable to start assessment');
    },
  });

  if (!open) return null;

  /* ================= STEP HANDLER ================= */

  const nextStep = () => {
    // STEP 1 → CONSENT
    if (step === 1) {
      if (!consentChecked) return;
      if (!assessmentIdFromUrl || consentMutation.isPending) return;

      consentMutation.mutate(assessmentIdFromUrl);
      return;
    }

    // STEP 4 → START TEST
    if (step === 4) {
      if (!assessmentIdFromUrl || startAssessmentMutation.isPending) return;

      startAssessmentMutation.mutate(assessmentIdFromUrl);
      return;
    }

    setStep((s) => s + 1);
  };

  /* ================= UI ================= */

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[6px]">
      <div className="bg-white rounded-[20px] shadow-[0px_20px_60px_rgba(16,24,40,0.25)] w-200 p-6 flex flex-col">
        {/* HEADER */}
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-[20px] font-bold text-[#0F172A]">Before you begin</h2>
              <p className="text-[14px] text-[#6E788C]">
                We need to verify your microphone and camera to ensure a smooth test experience
              </p>
            </div>

            <p className="text-[14px] text-[#1A2C50]">
              Step <span className="font-semibold text-[16px]">{step}</span> of 4
            </p>
          </div>

          <div className="h-px bg-[#E4E7EC] mt-2" />
        </div>

        {/* BODY */}
        <div className="flex-1 mt-4">
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
            className="flex-1 h-10 rounded-full border border-[#344054] text-[#344054]"
          >
            Cancel
          </button>

          <button
            onClick={nextStep}
            disabled={
              (step === 1 && !consentChecked) ||
              consentMutation.isPending ||
              startAssessmentMutation.isPending
            }
            className="flex-1 h-10 rounded-full font-medium text-white! bg-linear-to-r from-[#904BFF] to-[#C053C2] disabled:opacity-40"
          >
            {step === 4
              ? startAssessmentMutation.isPending
                ? 'Starting...'
                : 'Start Assessment'
              : step === 1 && consentMutation.isPending
                ? 'Verifying...'
                : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
