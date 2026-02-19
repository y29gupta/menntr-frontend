'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
// import { AssessmentSummary, PublishAssessmentModalProps } from './types';
import {
  MODAL_WIDTH,
  MODAL_RADIUS,
  MODAL_BORDER,
  OVERLAY,
} from '../PublishAssessmentModal/constants';
import { ConfirmPublishModal } from './ConfirmPublishModal';
// import { assessmentApi } from '@/app/components/dashboards/institution-admin/assessment/assessment.service';
// import ConfirmPublishModal from './ConfirmPublishModal';
// import PublishSuccessModal from './PublishSuccessModal';

import { message } from 'antd';
import { PublishEntityModalProps } from './type';
import PublishEntityHeader from './PublishEntityHeader';
import { SuccessModal } from './SuccessModal';
import { PublishEntitySteps } from './PublishEntitySteps';

export function PublishEntityModal({
  isOpen,
  onClose,
  entityId,
  entityLabel,
  entityName,
  redirectPath,
  fetchSummary,
  fetchAssignedTo,
  fetchAccess,
  updateAccess,
  updateSchedule,
  publishEntity,
}: PublishEntityModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  console.log(entityId, 'publishassessmentmodal me id aagyi');

  const [view, setView] = useState<'steps' | 'confirm' | 'success'>('steps');
  const [step, setStep] = useState(1);
  const [summary, setSummary] = useState<any>(null);

  // useEffect(() => {
  //   if (isOpen) setView('steps');
  // }, [isOpen]);

  // if (!isOpen) return null;

  useEffect(() => {
    if (isOpen) {
      setView('steps');

      if (entityId) {
        fetchSummary(entityId).then(setSummary).catch(console.error);
      }
    }
  }, [isOpen, entityId]);
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
          <PublishEntityHeader step={step} entityLabel={entityLabel} />

          {view === 'steps' && (
            <PublishEntitySteps
              step={step}
              setStep={setStep}
              summaryData={summary}
              onClose={onClose}
              entityId={entityId}
              entityLabel={entityLabel}
              fetchAssignedTo={fetchAssignedTo}
              fetchAccess={fetchAccess}
              updateAccess={updateAccess}
              updateSchedule={updateSchedule}
              onRequestPublish={() => setView('confirm')}
            />
          )}

          {view === 'confirm' && (
            <ConfirmPublishModal
              onCancel={() => setView('steps')}
              entityLabel={entityLabel}
              onPublish={async () => {
                try {
                  if (!entityId) return;

                  await publishEntity(entityId);

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
        <SuccessModal
          entityLabel={entityLabel}
          entityName={entityName}
          redirectPath={redirectPath}
          onClose={onClose}
        />
      )}
    </div>,
    document.body
  );
}
