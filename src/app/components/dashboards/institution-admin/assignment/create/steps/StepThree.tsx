'use client';

import TextFileIcon from '@/app/components/icons/TextFile';
import { PencilIcon, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
// import { assessmentApi } from '../../assessment.service';
import { useQueryClient } from '@tanstack/react-query';
import { assignmentApi } from '../../assignment.service';

type BulkUploadForm = {
  file: FileList;
};

type UploadType = 'mcq' | 'coding' | 'theory';

type Props = {
  onBack: () => void;
  onNext: () => void;
  onCancel: () => void;
  assignmentId: string;

  allowedQuestionTypes: string[];
};

export default function StepThree({
  onBack,
  onNext,
  onCancel,
  assignmentId,
  allowedQuestionTypes,
}: Props) {
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const [showTypePopup, setShowTypePopup] = useState(false);
  const [selectedType, setSelectedType] = useState<UploadType | undefined>(undefined);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { register, setValue } = useForm<BulkUploadForm>();

  const queryClient = useQueryClient();

  const handleCancelFile = () => {
    setPendingFile(null);
    setSelectedType(undefined);
    setShowTypePopup(false);

    setValue('file', undefined as any);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const { ref: rhfFileRef, ...fileRegister } = register('file', {
    validate: {
      fileType: (files) =>
        !files?.[0] ||
        ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(
          files[0]?.type
        ) ||
        'Only CSV or Excel allowed',
    },
    onChange: (e) => {
      const file = e.target.files?.[0];
      if (file) {
        setPendingFile(file);
      }
    },
  });

  const handleContinue = async () => {
    // Manual flow
    if (!pendingFile) {
      onNext();
      return;
    }

    //  Explicit guard with UX clarity
    if (!selectedType) {
      console.warn('Question type not selected');
      return;
    }

    try {
      setUploading(true);

      await assignmentApi.bulkUploadQuestions(assignmentId, selectedType, pendingFile);
      queryClient.invalidateQueries({
        queryKey: ['assessment-questions', assignmentId],
      });

      setPendingFile(null);
      setSelectedType(undefined);
      setShowTypePopup(false);

      onNext();
    } catch (err) {
      console.error('Bulk upload failed', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white flex flex-col gap-6 rounded-2xl border border-[#C3CAD9] px-6 pt-6 pb-4">
      <div className="flex flex-col gap-6">
        <div className="border-b border-[#EAECF0]">
          <h2 className="text-base font-semibold text-[#101828]">Add Questions</h2>
          <p className="mt-1 text-sm text-[#667085]">
            Choose how you want to add questions to this assignment
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          {/* Manual creation */}
          <div className="rounded-2xl md:w-1/2 border border-[#BFC6D6] p-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex gap-2">
                <PencilIcon width="16" height="16" />
                <h3 className="text-[16px] font-semibold text-[#101828]">Manual creation</h3>
              </div>

              <p className="mt-1 text-justify text-sm text-[#667085]">
                Add questions one by one using the question editor
              </p>

              <button
                type="button"
                onClick={onNext}
                className="mt-6 rounded-full border border-[#904BFF]
                px-3 py-1.5 text-xs sm:px-5 sm:py-2 sm:text-sm
                font-medium !text-[#7F56D9]"
              >
                Create Questions
              </button>
            </div>
          </div>

          {/* Bulk upload */}
          <div className="rounded-2xl md:w-1/2 border border-[#BFC6D6] p-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex gap-2">
                <TextFileIcon width="16" height="16" />
                <h3 className="text-[16px] font-semibold text-[#101828]">Bulk Upload Questions</h3>
              </div>

              <p className="mt-1 text-justify text-sm text-[#667085]">
                Upload multiple questions using a CSV template.
              </p>

              <button
                onClick={() => setShowTypePopup(true)}
                className="rounded-full border border-[#904BFF] px-5 py-2 text-sm !text-[#7F56D9]"
              >
                Upload CSV
              </button>

              {/* TYPE POPUP */}
              {showTypePopup && (
                <div className="absolute z-50 top-[120px] bg-white border rounded-xl p-4 shadow-md w-[200px]">
                  <p className="text-sm font-medium mb-2">Select Question Type</p>

                  {allowedQuestionTypes.map((type: any) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedType(type);
                        setShowTypePopup(false); //  close popup
                        fileInputRef.current?.click();
                      }}
                      className={`w-full mb-2 rounded-full px-3 py-1.5 text-sm border
                        ${
                          selectedType === type
                            ? 'border-[#904BFF] bg-[#F6F0FF] text-[#7F56D9]'
                            : 'border-gray-300 text-gray-600'
                        }
                      `}
                    >
                      {type.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}

              {pendingFile && (
                <div className="flex items-center gap-2 text-sm text-[#7F56D9]">
                  <span>{pendingFile.name}</span>
                  <button
                    type="button"
                    onClick={handleCancelFile}
                    className="hover:!text-[#000]"
                    aria-label="Remove selected file"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {uploading && <p className="text-xs">Uploading questions…</p>}

              <input
                id="bulk-file"
                type="file"
                accept=".csv,.xlsx"
                hidden
                ref={(el) => {
                  rhfFileRef(el);
                  fileInputRef.current = el;
                }}
                {...fileRegister}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-[#7F56D9]
          px-3 py-1.5 text-xs sm:px-5 sm:py-2 sm:text-sm
          font-medium !text-[#7F56D9]"
        >
          Go Back
        </button>

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <button
            type="button"
            disabled={uploading}
            onClick={handleContinue}
            className="
    rounded-full
    px-3 py-1.5 text-xs
    sm:px-6 sm:py-2 sm:text-sm
    font-medium
    bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
    !text-white
    disabled:opacity-70
    disabled:cursor-not-allowed
  "
          >
            {uploading ? 'Uploading…' : 'Continue'}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border
            px-3 py-1.5 text-xs sm:px-5 sm:py-2 sm:text-sm
            font-medium !text-[#7C3AED]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
