'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Stepper from './Stepper';
// import StepOne from './steps/StepOne'
//
import { message } from 'antd';
const StepOne = dynamic(() => import('./steps/StepOne'), { ssr: false });
const StepTwo = dynamic(() => import('./steps/StepTwo'), { ssr: false });
const StepThree = dynamic(() => import('./steps/StepThree'), { ssr: false });
const StepFour = dynamic(() => import('./steps/StepFour'), { ssr: false });

// import StepTwo from './steps/StepTwo';
import { createAssessmentSchema, CreateAssessmentForm, stepOneSchema } from './schema';
// import StepThree from './steps/StepThree';
// import StepFour from './steps/StepFour';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { assessmentApi } from '../assessment.service';
import { QuestionType } from '@/app/utils/questionType';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import ConfirmModal from '@/app/ui/modals/ConfirmModal';

export default function CreateAssessment() {
  const [step, setStep] = useState(1);

  const closeQuestionModal = () => {
    setActiveQuestionType(null);
  };

  const router = useRouter();

  const handleCancel = () => {
    router.replace('/admin/assessment?tab=active');
  };

  const form = useForm<CreateAssessmentForm>({
    resolver: zodResolver(createAssessmentSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      // category: 'Aptitude',
      // AssessmentType: 'Graded',
      // questionType: 'MCQ',
      // institutionCategory: 'Engineering',
      // department: 'CSE',
    },
  });

  const [assessmentId, setAssessmentId] = useState<string | null>(null);

  const questionTypes = form.watch('questionType'); // comes from Step One meta API

  const [activeQuestionType, setActiveQuestionType] = useState<QuestionType | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState<string | null>(null);

  const openQuestionModal = (type: QuestionType) => {
    setActiveQuestionType(type);
  };

  const queryClient = useQueryClient();

  const createAssessmentMutation = useMutation({
    mutationFn: assessmentApi.createAssessment,
  });

  const updateAudienceMutation = useMutation({
    mutationFn: ({ assessmentId, batchIds }: { assessmentId: string; batchIds: number[] }) =>
      assessmentApi.updateAssessmentAudience(assessmentId, {
        batch_ids: batchIds,
      }),
  });

  const handleStepOneNext = async () => {
    const isValid = await form.trigger([
      'title',
      // 'description',
      'category',
      'AssessmentType',
      'questionType',
    ]);

    if (!isValid) return;
    const values = form.getValues();

    // const res = await createAssessmentMutation.mutateAsync({
    //   // feature_id: 5,
    //   duration_minutes: 30,
    //   tags: ['verbal', 'english'],

    //   title: values.title,
    //   description: values.description,
    //   category: values.category,
    //   assessment_type: values.AssessmentType.toLowerCase(),
    //   question_type: values.questionType.toLowerCase(),
    // });

    // setAssessmentId(res.id);
    setAssessmentId('31');
    setStep(2);
  };
  const handleStepTwoNext = async () => {
    const isValid = await form.trigger(['institutionCategory', 'department', 'batches']);

    // if (!isValid || !assessmentId) return;
    // if (!isValid) return;

    const { batches } = form.getValues();

    // await updateAudienceMutation.mutateAsync({
    //   assessmentId,
    //   batchIds: batches.map((id) => Number(id)),
    // });

    setStep(3);
  };

  const handleStepThreeNext = () => {
    setStep(4);
  };

  const deleteQuestionMutation = useMutation({
    mutationFn: (questionId: string) =>
      assessmentApi.deleteAssessmentQuestion(assessmentId, questionId),

    onSuccess: () => {
      message.success('Question deleted successfully');

      queryClient.invalidateQueries({
        queryKey: ['assessment-questions', assessmentId],
      });

      setDeleteModalOpen(false);
      setDeleteQuestionId(null);
    },

    onError: () => {
      message.error('Failed to delete question');
    },
  });

  return (
    <>
      <div
        className="w-full  bg-white/60
  backdrop-blur-[100px]
  h-full
  supports-[backdrop-filter]:backdrop-blur-[100px]
  shadow-[0px_0px_8px_0px_#0F172A1F] p-4 rounded-2xl "
      >
        <h2 className="text-xl font-semibold text-[#101828]">Create Assessment</h2>
        <p className="text-sm text-[#667085]">Set up your Assessment</p>

        <Stepper step={step} />

        {/* {step === 1 && <StepOne form={form} onNext={() => setStep(2)} />}

      {step === 2 && <StepTwo form={form} onBack={() => setStep(1)} onNext={() => setStep(3)} />} */}
        {step === 1 && <StepOne form={form} onNext={handleStepOneNext} onCancel={handleCancel} />}

        {step === 2 && (
          <StepTwo
            form={form}
            onBack={() => setStep(1)}
            onNext={handleStepTwoNext}
            onCancel={handleCancel}
          />
        )}
        {step === 3 && (
          <StepThree
            onBack={() => setStep(2)}
            onNext={handleStepThreeNext}
            onCancel={handleCancel}
            onAddMCQ={() => setStep(4)}
            questionTypes={questionTypes}
            assessmentId={assessmentId}
          />
        )}
        {step === 4 && (
          <StepFour
            onBack={() => setStep(3)}
            onCancel={handleCancel}
            assessmentId={assessmentId!}
            questionTypes={questionTypes}
            activeQuestionType={activeQuestionType}
            onSelectQuestionType={openQuestionModal}
            onCloseModal={closeQuestionModal}
            onDeleteQuestion={(id) => {
              setDeleteQuestionId(id);
              setDeleteModalOpen(true);
            }}
          />
        )}
      </div>

      <ConfirmModal
        open={deleteModalOpen}
        title="Delete Question"
        description="Are you sure you want to delete this question?"
        warning="This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => {
          setDeleteModalOpen(false);
          setDeleteQuestionId(null);
        }}
        onConfirm={() => {
          if (!deleteQuestionId) return;
          deleteQuestionMutation.mutate(deleteQuestionId);
        }}
      />
    </>
  );
}
