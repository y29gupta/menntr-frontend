'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import CreateMCQModal from './CreateMCQModal';
import CreateCodingModal from './CreateCodingModal';

// import CreateMCQForm from './CreateMCQForm';
// import CreateCodingForm from './CreateCodingForm';

type Props = {
  assessmentId: string;
  mcqMeta: any;
  codingMeta: any;
  initialType?: 'MCQ' | 'Coding';
  initialData?: any;
  mode?: 'create' | 'edit';
  onClose: () => void;
  onSave: () => void;
  onSaveAndNext: () => void;
};

export default function QuestionModalShell({
  assessmentId,
  mcqMeta,
  codingMeta,
  initialType = 'MCQ',
  initialData,
  mode = 'create',
  onClose,
  onSave,
  onSaveAndNext,
}: Props) {
  const [type, setType] = useState<'MCQ' | 'Coding'>('MCQ');

  useEffect(() => {
    if (mode === 'edit' && initialData?.type) {
      setType(initialData.type === 'coding' ? 'Coding' : 'MCQ');
    }
  }, [mode, initialData]);

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      <div className="absolute inset-0 bg-white/70" onClick={onClose} />

      <div className="absolute right-0 top-0 h-full w-full max-w-[620px] bg-white shadow-xl">
        {/* HEADER */}
        <div className="flex justify-between items-start border-b px-6 py-4">
          <div>
            <h3 className="text-base font-semibold text-[#101828]">
              {type === 'MCQ'
                ? mode === 'edit'
                  ? 'Edit MCQ Question'
                  : 'Create MCQ Question'
                : mode === 'edit'
                  ? 'Edit Coding Question'
                  : 'Add a programming problem for this assessment'}
            </h3>

            <p className="text-sm text-gray-500">Add a question to Aptitude Mock – Jan 2025</p>
          </div>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        {/* CHIPS */}
        <div className="flex gap-2 px-6 py-4">
          {(['MCQ', 'Coding'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              disabled={mode === 'edit'}
              className={`px-4 py-1 rounded-full border text-sm ${
                type === t ? 'bg-purple-100 border-purple-500 text-purple-700' : 'border-gray-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* BODY */}
        <div className="px-6 pb-6 overflow-y-auto h-[calc(100%-160px)]">
          {type === 'MCQ' && mcqMeta ? (
            <CreateMCQModal
              assessmentId={assessmentId}
              meta={mcqMeta}
              initialData={type === initialType ? initialData : undefined}
              mode={mode}
              onSave={onSave}
              onSaveAndNext={onSaveAndNext}
            />
          ) : type === 'Coding' && codingMeta ? (
            <CreateCodingModal
              assessmentId={assessmentId}
              meta={codingMeta}
              initialData={type === initialType ? initialData : undefined}
              mode={mode}
              onSubmit={onSave}
            />
          ) : null}
        </div>
      </div>
    </div>,
    document.body
  );
}
