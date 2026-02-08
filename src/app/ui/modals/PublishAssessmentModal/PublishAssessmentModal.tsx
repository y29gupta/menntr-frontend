'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { PublishAssessmentSteps } from './PublishAssessmentSteps';
import { AssessmentSummary, PublishAssessmentModalProps } from './types';
import { MODAL_WIDTH, MODAL_RADIUS, MODAL_BORDER, OVERLAY } from './constants';
import { ConfirmPublishModal } from './ConfirmPublishModal';
import { SuccessModal } from './SuccessModal';
import PublishAssessmentHeader from './PublishAssessmentHeader';
import { assessmentApi } from '@/app/components/dashboards/institution-admin/assessment/assessment.service';
// import ConfirmPublishModal from './ConfirmPublishModal';
// import PublishSuccessModal from './PublishSuccessModal';

import { message } from 'antd';

export function PublishAssessmentModal({
  isOpen,
  onClose,
  assessmentId,
}: PublishAssessmentModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  console.log(assessmentId, 'publishassessmentmodal me id aagyi');

  const [view, setView] = useState<'steps' | 'confirm' | 'success'>('steps');
  const [step, setStep] = useState(1);

  const [summary, setSummary] = useState<AssessmentSummary | null>(null);

  // useEffect(() => {
  //   if (isOpen) setView('steps');
  // }, [isOpen]);

  // if (!isOpen) return null;

  useEffect(() => {
    if (isOpen) {
      setView('steps');

      if (assessmentId) {
        assessmentApi.getAssessmentSummary(assessmentId).then(setSummary).catch(console.error);
      }
    }
  }, [isOpen, assessmentId]);
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className={`absolute inset-0 ${OVERLAY}`} />

      {/* STEPS + CONFIRM SHARE SAME LAYOUT */}
      {view !== 'success' && (
        <div
          ref={ref}
          tabIndex={-1}
          className={`relative ${MODAL_WIDTH} ${MODAL_RADIUS} ${MODAL_BORDER} bg-white p-6 shadow-[0px_-6px_12px_0px_#2E382E1F]`}
        >
          <PublishAssessmentHeader step={step} />

          {view === 'steps' && (
            <PublishAssessmentSteps
              step={step}
              setStep={setStep}
              assessmentData={summary}
              onClose={onClose}
              assessmentId={assessmentId}
              onRequestPublish={() => setView('confirm')}
            />
          )}

          {view === 'confirm' && (
            <ConfirmPublishModal
              onCancel={() => setView('steps')}
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
          )}
        </div>
      )}

      {/* SUCCESS IS A FINAL MODAL */}
      {view === 'success' && (
        <SuccessModal assessmentName="Aptitude Mock - Jan 2025" onClose={onClose} />
      )}
    </div>,
    document.body
  );
}
