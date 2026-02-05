'use client';

import { useEffect, useState } from 'react';
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
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { assessmentApi } from '../assessment.service';
// import { QuestionType } from '@/app/utils/questionType';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import ConfirmModal from '@/app/ui/modals/ConfirmModal';
import { toTitleCase } from '@/app/utils/stringFormat';

type Props = {
  mode?: 'create' | 'edit';
  editAssessmentId?: string;
};

export default function CreateAssessment({ mode = 'create', editAssessmentId }: Props) {
  const [step, setStep] = useState(1);

  const [instructions, setInstructions] = useState<string | undefined>();
  const [tags, setTags] = useState<string[] | undefined>();
  const [durationMinutes, setDurationMinutes] = useState<number | undefined>();

  // const [activeQuestionType, setActiveQuestionType] = useState<QuestionType | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState<string | null>(null);

  const [assessmentId, setAssessmentId] = useState<string>('');
  const [isHydrated, setIsHydrated] = useState(false);

  const isEdit = mode === 'edit';

  // const closeQuestionModal = () => {
  //   setActiveQuestionType(null);
  // };

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

  const { data: assessmentResponse } = useQuery({
    queryKey: ['edit-assessment', editAssessmentId],
    queryFn: () => assessmentApi.getAssessmentById(editAssessmentId!),
    enabled: isEdit && !!editAssessmentId,
    staleTime: 1 * 60 * 1000, // performance
  });

  // const questionTypes = form.watch('questionType'); // comes from Step One meta API

  // const openQuestionModal = (type: QuestionType) => {
  //   setActiveQuestionType(type);
  // };

  const queryClient = useQueryClient();

  const createAssessmentMutation = useMutation({
    mutationFn: assessmentApi.createAssessment,
  });

  const updateAssessmentMutation = useMutation({
    mutationFn: ({ assessmentId, payload }: { assessmentId: string; payload: any }) =>
      assessmentApi.updateAssessment(assessmentId, payload),
  });

  const updateAudienceMutation = useMutation({
    mutationFn: ({ assessmentId, batchIds }: { assessmentId: string; batchIds: number[] }) =>
      assessmentApi.updateAssessmentAudience(assessmentId, {
        batch_ids: batchIds,
      }),
  });

  const buildCreatePayload = (values: CreateAssessmentForm) => {
    return {
      title: values.title,
      description: values.description,
      duration_minutes: 30, // or values.duration_minutes if you add later
      tags: ['verbal', 'english'], // optional

      category: values.category,
      assessment_type: values.AssessmentType.toLowerCase(),
      // question_type: values.questionType.toLowerCase(),
    };
  };
  const buildUpdatePayload = (values: CreateAssessmentForm) => {
    return {
      title: values.title,
      description: values.description,

      duration_minutes: durationMinutes,
      instructions,
      tags,

      category: values.category,
      assessment_type: values.AssessmentType,
      // question_type: values.questionType,
    };
  };

  useEffect(() => {
    if (!isEdit || !assessmentResponse || isHydrated) return;

    setAssessmentId(assessmentResponse.id);
    form.setValue('title', assessmentResponse.title, { shouldDirty: false });
    form.setValue('description', assessmentResponse.description ?? '');

    form.setValue('category', assessmentResponse.metadata?.category ?? '', {
      shouldDirty: false,
    });

    form.setValue(
      'AssessmentType',
      toTitleCase(assessmentResponse.metadata?.assessment_type) ?? '',
      { shouldDirty: false }
    );

    // form.setValue('questionType', toTitleCase(assessmentResponse.metadata?.question_type) ?? '', {
    //   shouldDirty: false,
    // });

    // store non-form fields for UPDATE
    setInstructions(assessmentResponse.instructions);
    setTags(assessmentResponse.tags);
    setDurationMinutes(assessmentResponse.duration_minutes);

    if (assessmentResponse.batches?.length) {
      form.setValue(
        'batches',
        assessmentResponse.batches.map((b: any) => String(b.id))
      );
    }

    setIsHydrated(true);
  }, [isEdit, assessmentResponse, isHydrated, form]);

  const handleStepOneNext = async () => {
    const isValid = await form.trigger(['title', 'category', 'AssessmentType']);

    if (!isValid) return;

    const values = form.getValues();

    try {
      if (isEdit && assessmentId) {
        const payload = buildUpdatePayload(values);

        await updateAssessmentMutation.mutateAsync({
          assessmentId,
          payload,
        });

        message.success('Assessment updated successfully');
      } else {
        const payload = buildCreatePayload(values);

        const res = await createAssessmentMutation.mutateAsync(payload);
        setAssessmentId(res.id);

        message.success('Assessment created successfully');
      }

      // SAME FLOW
      setStep(2);
    } catch (error) {
      message.error('Failed to save assessment');
    }
  };

  const handleStepTwoNext = async () => {
    const isValid = await form.trigger(['institutionCategory', 'department', 'batches']);

    if (!isValid || !assessmentId) return;
    // if (!isValid) return;

    const { batches } = form.getValues();

    await updateAudienceMutation.mutateAsync({
      assessmentId,
      batchIds: batches.map((id) => Number(id)),
    });

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
            // onAddMCQ={() => setStep(4)}
            // questionTypes={questionTypes}
            assessmentId={assessmentId}
          />
        )}
        {step === 4 && (
          <StepFour
            onBack={() => setStep(3)}
            onCancel={handleCancel}
            assessmentId={assessmentId!}
            // questionTypes={questionTypes}
            // activeQuestionType={activeQuestionType}
            // onSelectQuestionType={openQuestionModal}
            // onCloseModal={closeQuestionModal}
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
