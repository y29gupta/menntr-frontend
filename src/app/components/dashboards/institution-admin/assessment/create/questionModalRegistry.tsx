import React from 'react';
import CreateMCQModal from './components/CreateMCQModal';
import CreateCodingModal from './components/CreateCodingModal';

type RegistryContext = {
  assessmentId: string;
  onClose: () => void;
  onSave: (q: any) => void;
  onSaveAndNext: (q: any) => void;
  meta: any;

  initialData?: any;
  mode?: 'create' | 'edit';
};

export const questionModalRegistry: Record<string, (ctx: RegistryContext) => React.ReactElement> = {
  MCQ: ({ assessmentId, onClose, onSave, onSaveAndNext, meta, initialData, mode }) => (
    <CreateMCQModal
      assessmentId={assessmentId}
      onClose={onClose}
      onSave={onSave}
      onSaveAndNext={onSaveAndNext}
      meta={meta}
      initialData={initialData}
      mode={mode}
    />
  ),

  Coding: ({ onClose, onSave, meta, initialData, mode, assessmentId }) => (
    <CreateCodingModal
      onClose={onClose}
      assessmentId={assessmentId}
      onSubmit={onSave} // adapt to coding modal API
      meta={meta}
      initialData={initialData}
      mode={mode}
    />
  ),
};
