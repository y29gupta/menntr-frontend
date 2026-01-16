import React from 'react';
import CreateMCQModal from './components/CreateMCQModal';
import CreateCodingModal from './components/CreateCodingModal';

type RegistryContext = {
  assessmentId: string;
  onClose: () => void;
  onSave: (q: any) => void;
  onSaveAndNext: (q: any) => void;
};

export const questionModalRegistry: Record<string, (ctx: RegistryContext) => React.ReactElement> = {
  MCQ: ({ assessmentId, onClose, onSave, onSaveAndNext }) => (
    <CreateMCQModal
      assessmentId={assessmentId}
      onClose={onClose}
      onSave={onSave}
      onSaveAndNext={onSaveAndNext}
    />
  ),

  Coding: ({ onClose, onSave }) => (
    <CreateCodingModal
      onClose={onClose}
      onSubmit={onSave} // adapt to coding modal API
    />
  ),
};
