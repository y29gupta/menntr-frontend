import TextFileIcon from '@/app/components/icons/TextFile';
import { normalizeTypes } from '@/app/utils/questionType';
import { PencilLine, FileText, PencilIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { assessmentApi } from '../../assessment.service';

import { X } from 'lucide-react';
import { useRef } from 'react';

type BulkUploadForm = {
  file: FileList;
};

type Props = {
  onBack: () => void;
  onNext: () => void;
  onCancel: () => void;
  onAddMCQ: () => void;
  questionTypes: string | string[];
  assessmentId: string | null;
};

export default function StepThree({
  onBack,
  onNext,
  onCancel,
  onAddMCQ,
  questionTypes,
  assessmentId,
}: Props) {
  const types = normalizeTypes(questionTypes);

  const buttonLabel = types.length === 1 ? `Add ${types[0]} Question` : 'Add Questions';
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BulkUploadForm>({
    mode: 'onChange',
  });

  const selectedFile = watch('file')?.[0];

  const handleCancelFile = () => {
    setPendingFile(null);
    setValue('file', undefined as any);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const { ref: rhfFileRef, ...fileRegister } = register('file', {
    required: 'File is required',
    validate: {
      fileType: (files) =>
        ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(
          files[0]?.type
        ) || 'Only CSV or Excel allowed',
    },
    onChange: (e) => {
      const file = e.target.files?.[0];
      if (file) {
        setPendingFile(file); // store only
      }
    },
  });

  const handleContinue = async () => {
    if (!pendingFile) {
      onNext(); // manual flow
      return;
    }

    setUploading(true);

    const questionType = types[0]?.toLowerCase() === 'mcq' ? 'mcq' : 'coding';

    try {
      await assessmentApi.bulkUploadQuestions(assessmentId, questionType, pendingFile);

      setPendingFile(null);
      onNext(); // move to Step 4
    } catch (err) {
      console.error('Bulk upload failed', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white flex flex-col gap-6  rounded-2xl border border-[#C3CAD9] px-6 pt-6 pb-4">
      {/* <div className="flex border flex-col"> */}
      <div className=" flex flex-col gap-6">
        <div className="border-b border-[#EAECF0] ">
          <h2 className="text-base font-semibold text-[#101828]">Add Questions</h2>
          <p className="mt-1 text-sm text-[#667085]">
            Choose how you want to add questions to this assessment
          </p>
        </div>

        <div className=" flex  flex-col  md:flex-row justify-center items-center gap-4">
          {/* Manual creation */}
          <div className="rounded-2xl md:w-1/2 border border-[#BFC6D6] p-4">
            <div className="flex flex-col items-center justify-center gap-4 ">
              <div className="flex gap-2  ">
                <div>
                  <PencilIcon width="16" height="16" />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#101828]">Manual creation</h3>
                </div>
              </div>

              <div>
                <p className="mt-1 text-justify text-sm text-[#667085]">
                  Add questions one by one using the question editor
                </p>
              </div>
              <button
                type="button"
                onClick={onNext}
                className="mt-6 rounded-full border border-[#904BFF]   whitespace-nowrap 
                 px-3 py-1.5 text-xs
               sm:px-5 sm:py-2 sm:text-sm font-medium !text-[#7F56D9]"
              >
                {/* Add MCQ Questions */}
                {buttonLabel}
              </button>
            </div>
          </div>

          {/* Bulk upload */}
          <div className="rounded-2xl  md:w-1/2   border border-[#BFC6D6] p-4">
            <div className="flex flex-col items-center justify-center gap-4 ">
              <div className="flex gap-2  ">
                <div>
                  <TextFileIcon width="16" height="16" />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#101828]">
                    Bulk Upload Questions
                  </h3>
                </div>
              </div>

              <div>
                <p className="mt-1 text-justify text-sm text-[#667085]">
                  Upload multiple questions using a CSV template.
                </p>
              </div>
              <button
                type="button"
                className="mt-6 rounded-full border border-[#904BFF] px-5 py-2 text-sm font-medium !text-[#7F56D9]"
                onClick={() => document.getElementById('bulk-file')?.click()}
              >
                Upload CSV
              </button>
              {/* {selectedFile && <p className="text-sm  text-[#7F56D9]">{selectedFile.name}</p>} */}
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

              {/* <input
                id="bulk-file"
                type="file"
                accept=".csv,.xlsx"
                ref
                hidden
                {...register('file', {
                  required: 'File is required',
                  validate: {
                    fileType: (files) =>
                      [
                        'text/csv',
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                      ].includes(files[0]?.type) || 'Only CSV or Excel allowed',
                  },
                  onChange: (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setPendingFile(file); // store only
                    }
                  },
                })}
              /> */}

              <input
                id="bulk-file"
                type="file"
                accept=".csv,.xlsx"
                hidden
                ref={(el) => {
                  rhfFileRef(el); // RHF ref
                  fileInputRef.current = el; // your ref
                }}
                {...fileRegister}
              />
            </div>
          </div>
        </div>

        {/* Options */}
      </div>
      <div>
        {/* Footer actions */}
        {/* <div className="py-2  flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="rounded-full border border-[#7F56D9] px-5 py-2 text-sm font-medium !text-[#7F56D9]"
          >
            Go Back
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleContinue}
              className="rounded-full  bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] px-6 py-2 text-sm font-medium !text-white"
            >
              Continue
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="rounded-full border broder-[#7C3AED] !text-[#7C3AED] px-5 py-2 text-sm font-medium text-[#344054]"
            >
              Cancel
            </button>
          </div>
        </div> */}
        {/* Footer actions */}
        <div className="py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Back button */}
          <button
            type="button"
            onClick={onBack}
            className="
      rounded-full border border-[#7F56D9]
      whitespace-nowrap
      px-3 py-1.5 text-xs
      sm:px-5 sm:py-2 sm:text-sm
      font-medium !text-[#7F56D9]
    "
          >
            Go Back
          </button>

          {/* Right buttons */}
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <button
              type="button"
              onClick={handleContinue}
              className="
        rounded-full
        whitespace-nowrap
        px-3 py-1.5 text-xs
        sm:px-6 sm:py-2 sm:text-sm
        font-medium
        bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
        !text-white
      "
            >
              Continue
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="
        rounded-full border
        whitespace-nowrap
        px-3 py-1.5 text-xs
        sm:px-5 sm:py-2 sm:text-sm
        font-medium
        !text-[#7C3AED]
      "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
