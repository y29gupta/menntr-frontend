'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import CreateMCQModal from './CreateMCQModal';
import CreateCodingModal from './CreateCodingModal';
import CreateTheoryModal from './CreateTheoryModal';

type QuestionType = 'MCQ' | 'Coding' | 'Theory';

type Props = {
  entityId: string;
  mcqMeta: any;
  codingMeta: any;
  initialData?: any;
  mode?: 'create' | 'edit';
  onClose: () => void;
  onSave: () => void;
  onSaveAndNext: () => void;
};

export default function QuestionModalShell({
  entityId,
  mcqMeta,
  codingMeta,
  initialData,
  mode = 'create',
  onClose,
  onSave,
  onSaveAndNext,
}: Props) {
  const [type, setType] = useState<QuestionType>('MCQ');

  useEffect(() => {
    if (mode === 'edit' && initialData?.type) {
      if (initialData?.type === 'coding') setType('Coding');
      else if (initialData?.type === 'theory') setType('Theory');
      else setType('MCQ');
    }
  }, [mode, initialData]);

  // const headerTitle =
  //   type === 'MCQ'
  //     ? mode === 'edit'
  //       ? 'Edit MCQ Question'
  //       : 'Create MCQ Question'
  //     : mode === 'edit'
  //       ? 'Edit Coding Question'
  //       : 'Add a programming problem for this assessment';

  const headerTitle =
    type === 'MCQ'
      ? mode === 'edit'
        ? 'Edit MCQ Question'
        : 'Create MCQ Question'
      : type === 'Coding'
        ? mode === 'edit'
          ? 'Edit Coding Question'
          : 'Add a programming problem for this assignment'
        : mode === 'edit'
          ? 'Edit Theory Question'
          : 'Create Theory Question';

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/70" onClick={onClose} />

      {/* Right drawer */}
      {/* <div className="absolute right-0 top-0 h-full w-full max-w-[620px] bg-white shadow-xl"> */}
      <div className="absolute right-0 top-0 h-full w-full max-w-[620px] bg-white shadow-xl flex flex-col">
        {/* HEADER */}
        <div className="flex justify-between items-start border-b border-[#C3CAD9] px-6 py-4">
          <div>
            <h3 className="text-base font-semibold text-[#101828]">{headerTitle}</h3>
            <p className="text-sm text-gray-500">Add a question to Aptitude Mock – Jan 2025</p>
          </div>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        {/* CHIPS */}
        <div className="flex gap-2 px-6 py-4">
          {(['MCQ', 'Coding', 'Theory'] as QuestionType[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              disabled={mode === 'edit'}
              className={`flex items-center gap-2 px-4 py-1 rounded-full border text-sm ${
                type === t
                  ? 'bg-[#F6F0FF] border-[#7C3AED] !text-[#7C3AED]'
                  : 'border-gray-300 !text-[#3D465C]'
              }`}
            >
              {type === t && <span className="text-[#7C3AED] text-xs font-bold">✓</span>}
              {t}
            </button>
          ))}
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {type === 'MCQ' && (
            <CreateMCQModal
              assignmentId={entityId}
              meta={mcqMeta}
              initialData={type === 'MCQ' ? initialData : undefined}
              mode={mode}
              onSave={onSave}
              onSaveAndNext={onSaveAndNext}
            />
          )}

          {type === 'Coding' && (
            <CreateCodingModal
              assessmentId={entityId}
              meta={codingMeta}
              initialData={type === 'Coding' ? initialData : undefined}
              mode={mode}
              onSave={onSave}
            />
          )}

          {type === 'Theory' && (
            <CreateTheoryModal
              entityId={entityId}
              initialData={type === 'Theory' ? initialData : undefined}
              mode={mode}
              onSave={onSave}
              onSaveAndNext={onSaveAndNext}
            />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
