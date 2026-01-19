import React from 'react';
import CreateMCQModal from './components/CreateMCQModal';
import CreateCodingModal from './components/CreateCodingModal';

type RegistryContext = {
  assessmentId: string;
  onClose: () => void;
  onSave: (q: any) => void;
  onSaveAndNext: (q: any) => void;
  meta: any;
};

export const questionModalRegistry: Record<string, (ctx: RegistryContext) => React.ReactElement> = {
  MCQ: ({ assessmentId, onClose, onSave, onSaveAndNext, meta }) => (
    <CreateMCQModal
      assessmentId={assessmentId}
      onClose={onClose}
      onSave={onSave}
      onSaveAndNext={onSaveAndNext}
      meta={meta}
    />
  ),

  Coding: ({ onClose, onSave, meta }) => (
    <CreateCodingModal
      onClose={onClose}
      onSubmit={onSave} // adapt to coding modal API
      meta={meta}
    />
  ),
};
