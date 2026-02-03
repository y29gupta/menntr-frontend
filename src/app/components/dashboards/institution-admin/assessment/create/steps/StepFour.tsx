// import { GripVertical, Trash2, Plus } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import CreateMCQModal from '../components/CreateMCQModal';
// import { PublishAssessmentModal } from '@/app/ui/modals/PublishAssessmentModal/PublishAssessmentModal';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { assessmentApi } from '../../assessment.service';
// import CreateCodingModal from '../components/CreateCodingModal';
// // import { isMultiType, normalizeTypes, QuestionType } from '@/app/utils/questionType';
// // import { questionModalRegistry } from '../questionModalRegistry';
// import { EditOutlined } from '@ant-design/icons';
// import { message } from 'antd';
// import ConfirmModal from '@/app/ui/modals/ConfirmModal';

// type Props = {
//   onBack: () => void;
//   onCancel: () => void;
//   assessmentId: string;
//   // questionTypes: string | string[];
//   // activeQuestionType: QuestionType | null;
//   // onSelectQuestionType: (type: QuestionType) => void;
//   // onCloseModal: () => void;

//   onDeleteQuestion: (type: string) => void;
// };

// type Question = {
//   // id: string;
//   assessment_question_id: string;
//   question_id: string;
//   questionText: string;
//   isMandatory: boolean;
//   marks: number;
//   topic: string;
//   questionTypeLabel: string;
//   difficulty: 'Easy' | 'Medium' | 'Hard';
// };

// const DIFFICULTY_STYLES: Record<Question['difficulty'], string> = {
//   Easy: 'bg-[#ECFDF3] text-[#027A48]',
//   Medium: 'bg-[#FFFAEB] text-[#8E6100]',
//   Hard: 'bg-[#FFE6E6] text-[#8E0000]',
// };

// export default function StepFour({
//   onBack,
//   onCancel,
//   assessmentId,
//   // questionTypes,
//   // activeQuestionType,
//   // onSelectQuestionType,
//   // onCloseModal,

//   onDeleteQuestion,
// }: Props) {
//   const [isMCQOpen, setIsMCQOpen] = useState(false);
//   const [open, setOpen] = useState(false);

//   const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
//   const [editQuestionData, setEditQuestionData] = useState<any>(null);

//   // const types = normalizeTypes(questionTypes);
//   // const multiType = isMultiType(questionTypes);

//   const queryClient = useQueryClient();

//   const {
//     data: questions = [],
//     isLoading,
//     isError,
//   } = useQuery<Question[]>({
//     queryKey: ['assessment-questions', assessmentId],
//     queryFn: () => assessmentApi.getAssessmentQuestions(assessmentId),
//     // enabled: !!assessmentId,
//   });

//   // -------------edit questionapi-----------------

//   const { data: fetchedEditQuestion, isError: isEditError } = useQuery({
//     queryKey: ['edit-question', editingQuestionId],
//     queryFn: () => assessmentApi.getQuestionById(editingQuestionId!),
//     enabled: !!editingQuestionId,
//   });

//   useEffect(() => {
//     if (!fetchedEditQuestion) return;

//     const typeMap: Record<string, QuestionType> = {
//       mcq: 'MCQ',
//       coding: 'Coding',
//     };

//     setEditQuestionData(fetchedEditQuestion);
//     onSelectQuestionType(typeMap[fetchedEditQuestion.type]);
//   }, [fetchedEditQuestion, onSelectQuestionType]);

//   useEffect(() => {
//     if (isEditError) {
//       message.error('Failed to load question details');
//     }
//   }, [isEditError]);

//   const handleEditClick = (questionId: string) => {
//     setEditingQuestionId(questionId);
//   };

//   // --------------meta data for question based on tyepe------------------

//   const { data: questionMeta } = useQuery({
//     queryKey: ['question-meta', activeQuestionType],
//     queryFn: () => assessmentApi.getQuestionMeta(activeQuestionType!),
//     enabled: !!activeQuestionType,
//     staleTime: Infinity,
//   });

//   // const ActiveModal = activeQuestionType && questionModalRegistry[activeQuestionType];

//   const handleSaveQuestion = (q: any) => {
//     queryClient.invalidateQueries({
//       queryKey: ['assessment-questions', assessmentId],
//     });

//     onCloseModal(); // close modal after save
//   };

//   const handleSaveAndNextQuestion = (q: any) => {
//     console.log('FINAL PAYLOAD FROM MODAL →', q);
//     queryClient.invalidateQueries({
//       queryKey: ['assessment-questions', assessmentId],
//     });
//     // DO NOT close modal → modal already resets itself
//   };

//   const handleRowClick = (questionId: string) => {
//     setEditingQuestionId(questionId);
//   };

//   // -----------------delete question----------------

//   return (
//     <>
//       <div className="rounded-2xl border border-[#EAECF0] bg-white p-3 sm:p-6">
//         <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
//           <div>
//             <h3 className="text-base font-semibold text-[#101828]">Questions</h3>
//             <p className=" text-sm text-[#667085]">
//               Aptitude Mock - Jan 2025 • Aptitude • Practice
//             </p>
//           </div>

//           <div className="flex flex-wrap items-center gap-3">
//             {!multiType && types.length === 1 && (
//               <button
//                 onClick={() => onSelectQuestionType(types[0])}
//                 className="flex items-center gap-2 rounded-full border border-[#904BFF] px-4 py-2 text-sm font-medium !text-[#904BFF]"
//               >
//                 Create {types[0]} Question
//               </button>
//             )}

//             {/* {multiType && (
//               <Select
//                 placeholder="Create Question"
//                 onChange={(value) => onSelectQuestionType(value)}
//                 options={types.map((type) => ({
//                   label: type,
//                   value: type,
//                 }))}
//               />
//             )} */}

//             {/* <button
//               onClick={() => setIsMCQOpen(true)}
//               className="flex items-center gap-2 rounded-full border border-[#904BFF] px-4 py-2 text-sm font-medium !text-[#904BFF]"
//             >
//               <Plus size={16} />
//               Create MCQ question
//             </button> */}

//             <span className="cursor-pointer text-sm text-[#667085]">Preview</span>
//           </div>
//         </div>

//         <div className="my-4 h-px bg-[#EAECF0]" />

//         <div className="space-y-4 ">
//           {questions.map((q, index) => (
//             <div
//               title="Click to edit question"
//               className="  group
//     flex

//     cursor-pointer
//     rounded-xl
//     transition-all
//     duration-200
//     ease-in-out
//     hover:hover:bg-[#F7F9FD]

//     hover:shadow-sm"
//               key={q.question_id}
//               onClick={() => handleRowClick(q.assessment_question_id)}
//             >
//               <div className="flex rounded-l-xl bg-[#F0F2F7] items-center px-2">
//                 <GripVertical size={18} className="mt-1 shrink-0 text-[#98A2B3]" />
//               </div>

//               <div className="flex w-full  flex-col rounded-r-xl border border-[#EAECF0] p-2 sm:flex-row sm:gap-1">
//                 <div className="min-w-0 flex-1">
//                   <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
//                     <p className="break-words text-sm font-medium text-[#101828]">
//                       Q{index + 1}: {q.questionText}
//                     </p>
//                     {q.isMandatory && (
//                       <span className="whitespace-nowrap text-sm text-[#667085]">Mandatory</span>
//                     )}
//                   </div>

//                   <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                     <p className="text-xs text-[#667085]">
//                       {q.marks} Mark | {q.topic} | {q.questionTypeLabel}
//                     </p>

//                     <div className="flex items-center gap-4">
//                       <span
//                         className={`rounded-md px-2 py-1 text-xs font-medium ${
//                           DIFFICULTY_STYLES[q.difficulty]
//                         }`}
//                       >
//                         {q.difficulty}
//                       </span>
//                       {/* <EditOutlined
//                         size={16}
//                         className="cursor-pointer hover:!text-purple-600 font-extrabold"
//                         onClick={() => handleEditClick(q.assessment_question_id)}
//                       /> */}
//                       <Trash2
//                         size={16}
//                         className="
//                                   font-extrabold
//                                   cursor-pointer
//                                   transition-colors
//                                   duration-200
//                                   hover:!text-red-600
//                                 "
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           // setDeleteQuestionId(q.assessment_question_id);
//                           // setDeleteModalOpen(true);
//                           onDeleteQuestion(q.assessment_question_id);
//                         }}
//                         // className=" font-extrabold cursor-pointer hover:!text-purple-600"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Footer */}
//         <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <button
//             onClick={onBack}
//             className="rounded-full border border-[#7F56D9] px-5 py-2 text-sm font-medium !text-[#7F56D9]"
//           >
//             Go Back
//           </button>

//           <div className="flex flex-col gap-3 sm:flex-row">
//             <button
//               onClick={() => setOpen(true)}
//               className="rounded-full bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] px-6 py-2 text-sm font-medium !text-white"
//             >
//               Publish
//             </button>
//             <button
//               onClick={onCancel}
//               className="rounded-full border border-[#7F56D9] px-5 py-2 text-sm font-medium !text-[#7F56D9]"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>

//         {ActiveModal &&
//           ActiveModal({
//             meta: questionMeta,
//             assessmentId,
//             // onClose: onCloseModal,
//             onClose: () => {
//               setEditingQuestionId(null);
//               setEditQuestionData(null);
//               onCloseModal();
//             },
//             onSave: handleSaveQuestion,
//             onSaveAndNext: handleSaveAndNextQuestion,
//             initialData: editQuestionData,
//             mode: editQuestionData ? 'edit' : 'create',
//           })}

//         <PublishAssessmentModal
//           isOpen={open}
//           onClose={() => setOpen(false)}
//           assessmentId={assessmentId}
//         />
//       </div>
//     </>
//   );
// }
'use client';

import { GripVertical, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { assessmentApi } from '../../assessment.service';
import { PublishAssessmentModal } from '@/app/ui/modals/PublishAssessmentModal/PublishAssessmentModal';
import { message } from 'antd';
import QuestionModalShell from '../components/QuestionModal';

type Props = {
  onBack: () => void;
  onCancel: () => void;
  assessmentId: string;
  onDeleteQuestion: (id: string) => void;
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

export default function StepFour({ onBack, onCancel, assessmentId, onDeleteQuestion }: Props) {
  const queryClient = useQueryClient();

  /* ---------------- MODAL STATE ---------------- */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState<'create' | 'edit'>('create');
  const [editData, setEditData] = useState<any>(null);

  const [publishOpen, setPublishOpen] = useState(false);

  /* ---------------- QUESTIONS LIST ---------------- */
  const { data: questions = [] } = useQuery<Question[]>({
    queryKey: ['assessment-questions', assessmentId],
    queryFn: () => assessmentApi.getAssessmentQuestions(assessmentId),
  });

  /* ---------------- FETCH QUESTION FOR EDIT ---------------- */
  const { data: fetchedEditQuestion, isError } = useQuery({
    queryKey: ['edit-question', editData?.assessment_question_id],
    queryFn: () => assessmentApi.getQuestionById(editData.assessment_question_id),
    enabled: !!editData?.assessment_question_id,
  });

  useEffect(() => {
    if (!fetchedEditQuestion) return;

    setEditData(fetchedEditQuestion);
    setEditMode('edit');
    setIsModalOpen(true);
  }, [fetchedEditQuestion]);

  useEffect(() => {
    if (isError) {
      message.error('Failed to load question details');
    }
  }, [isError]);

  /* ---------------- META (BOTH TYPES) ---------------- */
  const { data: mcqMeta } = useQuery({
    queryKey: ['mcq-meta'],
    queryFn: assessmentApi.getMCQMeta,
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
      queryKey: ['assessment-questions', assessmentId],
    });
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
              onClick={() => setEditData({ assessment_question_id: q.assessment_question_id })}
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
                        onDeleteQuestion(q.assessment_question_id);
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
          assessmentId={assessmentId}
          mcqMeta={mcqMeta}
          codingMeta={codingMeta}
          initialType={editData?.type === 'coding' ? 'Coding' : 'MCQ'}
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

      <PublishAssessmentModal
        isOpen={publishOpen}
        onClose={() => setPublishOpen(false)}
        assessmentId={assessmentId}
      />
    </>
  );
}
