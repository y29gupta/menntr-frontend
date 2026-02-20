'use client';

import { GripVertical, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PublishAssessmentModal } from '@/app/ui/modals/PublishAssessmentModal/PublishAssessmentModal';
import { message } from 'antd';
// import QuestionModalShell from '../components/QuestionModal';
import { assignmentApi } from '../../assignment.service';
import { assessmentApi } from '../../../assessment/assessment.service';
import QuestionModalShell from '../components/QuestionModal';
import { PublishEntityModal } from '@/app/ui/modals/PublishEntityModal/PublishEntityModal';

type Props = {
  onBack: () => void;
  onCancel: () => void;
  entityId: string;
};

type Question = {
  assessment_question_id: string;
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

export default function StepFour({ onBack, onCancel, entityId }: Props) {
  const queryClient = useQueryClient();

  /* ---------------- MODAL STATE ---------------- */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState<'create' | 'edit'>('create');
  const [editData, setEditData] = useState<any>(null);

  const [publishOpen, setPublishOpen] = useState(false);

  /* ---------------- QUESTIONS LIST ---------------- */
  const { data: questions = [] } = useQuery<Question[]>({
    queryKey: ['assignment-questions', entityId],
    queryFn: () => assignmentApi.getAssignmentQuestions(entityId),
  });

  /* ---------------- FETCH QUESTION FOR EDIT ---------------- */
  // const { data: fetchedEditQuestion, isError } = useQuery({
  //   queryKey: ['edit-question', editData?.assessment_question_id],
  //   queryFn: () => assessmentApi.getQuestionById(editData.assessment_question_id),
  //   enabled: !!editData?.assessment_question_id,
  // });

  const handleEditClick = async (id: string) => {
    try {
      const question = await queryClient.fetchQuery({
        queryKey: ['edit-question', id],
        queryFn: () => assignmentApi.getAssignmentQuestionById(entityId, id),
      });

      setEditData(question);
      setEditMode('edit');
      setIsModalOpen(true);
    } catch {
      message.error('Failed to load question details');
    }
  };

  /* ---------------- META (BOTH TYPES) ---------------- */
  const { data: mcqMeta } = useQuery({
    queryKey: ['assignment-mcq-meta'],
    queryFn: assignmentApi.getAssignmentQuestionMeta,
    staleTime: Infinity,
  });

  const { data: codingMeta } = useQuery({
    queryKey: ['coding-meta'],
    queryFn: assessmentApi.getCodingQuestionMeta,
    staleTime: Infinity,
  });

  /* ---------------- SAVE HANDLERS ---------------- */
  const refreshQuestions = () => {
    queryClient.invalidateQueries({
      queryKey: ['assignment-questions', entityId],
    });
  };

  const handleDelete = async (id: string) => {
    await assignmentApi.deleteAssignmentQuestion(entityId, id);

    queryClient.invalidateQueries({
      queryKey: ['assignment-questions', entityId],
    });

    message.success('Question deleted successfully');
  };

  return (
    <>
      <div className="rounded-2xl border border-[#EAECF0] bg-white p-3 sm:p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-semibold text-[#101828]">Questions</h3>
            <p className="text-sm text-[#667085]">Aptitude Mock - Jan 2025 • Aptitude • Practice</p>
          </div>

          {/* CREATE */}
          <button
            onClick={() => {
              setEditData(null);
              setEditMode('create');
              setIsModalOpen(true);
            }}
            className="rounded-full border border-[#904BFF] px-4 py-2 text-sm font-medium !text-[#904BFF]"
          >
            Create Question
          </button>
        </div>

        <div className="my-4 h-px bg-[#EAECF0]" />

        {/* QUESTIONS LIST */}
        <div className="space-y-4">
          {questions.map((q, index) => (
            <div
              key={q.assessment_question_id}
              // onClick={() => setEditData({ assessment_question_id: q.assessment_question_id })}
              onClick={() => handleEditClick(q.assessment_question_id)}
              className="flex cursor-pointer rounded-xl hover:bg-[#F7F9FD]"
            >
              <div className="flex items-center bg-[#F0F2F7] px-2 rounded-l-xl">
                <GripVertical size={18} className="text-[#98A2B3]" />
              </div>

              <div className="flex-1 border border-[#EAECF0] p-3 rounded-r-xl">
                <p className="text-sm font-medium text-[#101828]">
                  Q{index + 1}: {q.questionText}
                </p>

                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-[#667085]">
                    {q.marks} Mark | {q.topic} | {q.questionTypeLabel}
                  </p>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-md ${DIFFICULTY_STYLES[q.difficulty]}`}
                    >
                      {q.difficulty}
                    </span>

                    <Trash2
                      size={16}
                      className="cursor-pointer hover:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(q.assessment_question_id);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={onBack}
            className="rounded-full border border-[#7F56D9] px-5 py-2 text-sm !text-[#7F56D9]"
          >
            Go Back
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => setPublishOpen(true)}
              className="rounded-full bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] px-6 py-2 text-sm !text-white"
            >
              Publish
            </button>

            <button
              onClick={onCancel}
              className="rounded-full border border-[#7F56D9] px-5 py-2 text-sm !text-[#7F56D9]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* SINGLE MODAL */}
      {isModalOpen && (
        <QuestionModalShell
          entityId={entityId}
          mcqMeta={mcqMeta}
          codingMeta={codingMeta}
          initialData={editData}
          mode={editMode}
          onClose={() => setIsModalOpen(false)}
          onSave={() => {
            refreshQuestions();
            setIsModalOpen(false);
          }}
          onSaveAndNext={refreshQuestions}
        />
      )}

      {/* <PublishAssessmentModal
        isOpen={publishOpen}
        onClose={() => setPublishOpen(false)}
        assessmentId={entityId}
      /> */}
      <PublishEntityModal
        isOpen={publishOpen}
        onClose={() => setPublishOpen(false)}
        entityId={entityId}
        entityLabel="Assigsnment"
        entityName="Aptitude Mock - Jan 2023"
        redirectPath="/admin/assessment?tab=active"
        fetchSummary={assignmentApi.getAssignmentSummary}
        fetchAssignedTo={assignmentApi.getAssignmentAssignedToDetail}
        fetchAccess={assignmentApi.getAssignmentAccess}
        updateAccess={assignmentApi.updateAssignmentAccess}
        updateSchedule={assignmentApi.updateAssignmentSchedule}
        publishEntity={assignmentApi.publishAssignment}
      />
    </>
  );
}
