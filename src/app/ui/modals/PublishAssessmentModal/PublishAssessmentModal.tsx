'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { PublishAssessmentSteps } from './PublishAssessmentSteps';
import { PublishAssessmentModalProps } from './types';
import { MODAL_WIDTH, MODAL_RADIUS, MODAL_BORDER, OVERLAY } from './constants';
import { ConfirmPublishModal } from './ConfirmPublishModal';
import { SuccessModal } from './SuccessModal';
import PublishAssessmentHeader from './PublishAssessmentHeader';
// import ConfirmPublishModal from './ConfirmPublishModal';
// import PublishSuccessModal from './PublishSuccessModal';

export function PublishAssessmentModal({
  isOpen,
  onClose,
  assessmentData,
}: PublishAssessmentModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [view, setView] = useState<'steps' | 'confirm' | 'success'>('steps');

  useEffect(() => {
    if (isOpen) setView('steps');
  }, [isOpen]);

  if (!isOpen) return null;

  // return createPortal(
  //   <div className="fixed inset-0 z-50 flex items-center justify-center">
  //     <div className={`absolute inset-0 ${OVERLAY}`} />

  //     <div
  //       ref={ref}
  //       tabIndex={-1}
  //       className={`relative ${MODAL_WIDTH} ${MODAL_RADIUS} ${MODAL_BORDER} bg-white p-6 shadow-[0px_-6px_12px_0px_#2E382E1F]`}
  //     >
  //       {view === 'steps' && (
  //         <PublishAssessmentSteps
  //           assessmentData={assessmentData}
  //           onClose={onClose}
  //           onRequestPublish={() => setView('confirm')}
  //         />
  //       )}

  //       {view === 'confirm' && (
  //         <ConfirmPublishModal
  //           onCancel={() => setView('steps')}
  //           onPublish={() => setView('success')}
  //         />
  //       )}

  //       {view === 'success' && (
  //         <SuccessModal assessmentName="Aptitude Mock - Jan 2025" onClose={onClose} />
  //       )}
  //     </div>
  //   </div>,
  //   document.body
  // );

  // return createPortal(
  //   <div className="fixed inset-0 z-50 flex items-center justify-center">
  //     <div className={`absolute inset-0 ${OVERLAY}`} />

  //     {/* STEPS LAYOUT */}
  //     {view === 'steps' && (
  //       <div
  //         ref={ref}
  //         tabIndex={-1}
  //         className={`relative ${MODAL_WIDTH} ${MODAL_RADIUS} ${MODAL_BORDER} bg-white p-6 shadow-[0px_-6px_12px_0px_#2E382E1F]`}
  //       >
  //         <PublishAssessmentSteps
  //           assessmentData={assessmentData}
  //           onClose={onClose}
  //           onRequestPublish={() => setView('confirm')}
  //         />
  //       </div>
  //     )}

  //     {/* CONFIRM MODAL – FULL REPLACEMENT */}
  //     {view === 'confirm' && (
  //       <ConfirmPublishModal
  //         onCancel={() => setView('steps')}
  //         onPublish={() => setView('success')}
  //       />
  //     )}

  //     {/* SUCCESS MODAL – FULL REPLACEMENT */}
  //     {view === 'success' && (
  //       <SuccessModal assessmentName="Aptitude Mock - Jan 2025" onClose={onClose} />
  //     )}
  //   </div>,
  //   document.body
  // );

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
          <PublishAssessmentHeader step={4} />

          {view === 'steps' && (
            <PublishAssessmentSteps
              assessmentData={assessmentData}
              onClose={onClose}
              onRequestPublish={() => setView('confirm')}
            />
          )}

          {view === 'confirm' && (
            <ConfirmPublishModal
              onCancel={() => setView('steps')}
              onPublish={() => setView('success')}
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
