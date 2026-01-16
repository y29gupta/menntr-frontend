import TextFileIcon from '@/app/components/icons/TextFile';
import { normalizeTypes } from '@/app/utils/questionType';
import { PencilLine, FileText, PencilIcon } from 'lucide-react';

type Props = {
  onBack: () => void;
  onNext: () => void;
  onCancel: () => void;
  onAddMCQ: () => void;
  questionTypes: string | string[];
};

export default function StepThree({ onBack, onNext, onCancel, onAddMCQ, questionTypes }: Props) {
  const types = normalizeTypes(questionTypes);

  const buttonLabel = types.length === 1 ? `Add ${types[0]} Question` : 'Add Questions';

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

        <div className=" flex gap-4">
          {/* Manual creation */}
          <div className="rounded-2xl w-1/2 border border-[#BFC6D6] p-4">
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
                <p className="mt-1 text-sm text-[#667085]">
                  Add questions one by one using the question editor
                </p>
              </div>
              <button
                type="button"
                onClick={onNext}
                className="mt-6 rounded-full border border-[#904BFF] px-5 py-2 text-sm font-medium !text-[#7F56D9]"
              >
                {/* Add MCQ Questions */}
                {buttonLabel}
              </button>
            </div>
          </div>

          {/* Bulk upload */}
          <div className="rounded-2xl w-1/2  border border-[#BFC6D6] p-4">
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
                <p className="mt-1 text-sm text-[#667085]">
                  Upload multiple questions using a CSV template.
                </p>
              </div>
              <button
                type="button"
                className="mt-6 rounded-full border border-[#904BFF] px-5 py-2 text-sm font-medium !text-[#7F56D9]"
              >
                Upload CSV
              </button>
            </div>
          </div>
        </div>

        {/* Options */}
      </div>
      <div>
        {/* Footer actions */}
        <div className="py-2  flex items-center justify-between">
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
              onClick={onNext}
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
        </div>
      </div>
    </div>
  );
}
