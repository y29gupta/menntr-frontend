import { GripVertical, Trash2, Plus } from 'lucide-react';
import { useState } from 'react';
import CreateMCQModal from '../components/CreateMCQModal';
import { PublishAssessmentModal } from '@/app/ui/modals/PublishAssessmentModal/PublishAssessmentModal';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { assessmentApi } from '../../assessment.service';

type Props = {
  onBack: () => void;
  onCancel: () => void;
  assessmentId: string;
};

type Question = {
  id: string;
  questionText: string;
  isMandatory: boolean;
  marks: number;
  topic: string;
  questionTypeLabel: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
};

const DIFFICULTY_STYLES: Record<Question['difficulty'], string> = {
  Easy: 'bg-[#ECFDF3] text-[#027A48]',
  Medium: 'bg-[#FFFAEB] text-[#8E6100]',
  Hard: 'bg-[#FFE6E6] text-[#8E0000]',
};

export default function StepFour({ onBack, onCancel, assessmentId }: Props) {
  const [isMCQOpen, setIsMCQOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: questions = [],
    isLoading,
    isError,
  } = useQuery<Question[]>({
    queryKey: ['assessment-questions', assessmentId],
    queryFn: () => assessmentApi.getAssessmentQuestions(assessmentId),
    // enabled: !!assessmentId,
  });

  const assessmentData = {
    id: '14',
  };
  console.log(assessmentId, 'stepfour');

  return (
    <>
      <div className="rounded-2xl border border-[#EAECF0] bg-white p-3 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h3 className="text-base font-semibold text-[#101828]">Questions</h3>
            <p className=" text-sm text-[#667085]">
              Aptitude Mock - Jan 2025 • Aptitude • Practice
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsMCQOpen(true)}
              className="flex items-center gap-2 rounded-full border border-[#904BFF] px-4 py-2 text-sm font-medium !text-[#904BFF]"
            >
              <Plus size={16} />
              Create MCQ question
            </button>

            <span className="cursor-pointer text-sm text-[#667085]">Preview</span>
          </div>
        </div>

        <div className="my-4 h-px bg-[#EAECF0]" />

        <div className="space-y-4">
          {questions.map((q, index) => (
            <div className="flex" key={q.id}>
              <div className="flex rounded-l-xl bg-[#F0F2F7] items-center px-2">
                <GripVertical size={18} className="mt-1 shrink-0 text-[#98A2B3]" />
              </div>

              <div className="flex w-full flex-col rounded-r-xl border border-[#EAECF0] p-2 sm:flex-row sm:gap-1">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <p className="break-words text-sm font-medium text-[#101828]">
                      Q{index + 1}: {q.questionText}
                    </p>
                    {q.isMandatory && (
                      <span className="whitespace-nowrap text-sm text-[#667085]">Mandatory</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-[#667085]">
                      {q.marks} Mark | {q.topic} | {q.questionTypeLabel}
                    </p>

                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-md px-2 py-1 text-xs font-medium ${
                          DIFFICULTY_STYLES[q.difficulty]
                        }`}
                      >
                        {q.difficulty}
                      </span>
                      <Trash2 size={16} className="text-[#636771] font-extrabold" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={onBack}
            className="rounded-full border border-[#7F56D9] px-5 py-2 text-sm font-medium !text-[#7F56D9]"
          >
            Go Back
          </button>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => setOpen(true)}
              className="rounded-full bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] px-6 py-2 text-sm font-medium !text-white"
            >
              Publish
            </button>
            <button
              onClick={onCancel}
              className="rounded-full border border-[#7F56D9] px-5 py-2 text-sm font-medium !text-[#7F56D9]"
            >
              Cancel
            </button>
          </div>
        </div>

        {isMCQOpen && (
          <CreateMCQModal
            assessmentId={assessmentId}
            onClose={() => setIsMCQOpen(false)}
            onSave={() => {
              queryClient.invalidateQueries({
                queryKey: ['assessment-questions', assessmentId],
              });
            }}
            onSaveAndNext={() => {
              queryClient.invalidateQueries({
                queryKey: ['assessment-questions', assessmentId],
              });
            }}
          />
        )}

        <PublishAssessmentModal
          isOpen={open}
          onClose={() => setOpen(false)}
          assessmentId={assessmentId}
        />
      </div>
    </>
  );
}
