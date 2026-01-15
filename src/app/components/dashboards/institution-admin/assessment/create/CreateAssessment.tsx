'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Stepper from './Stepper';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import { createAssessmentSchema, CreateAssessmentForm, stepOneSchema } from './schema';
import StepThree from './steps/StepThree';
import StepFour from './steps/StepFour';
import { useMutation } from '@tanstack/react-query';
import { assessmentApi } from '../assessment.service';

type CreateAssessmentProps = {
  onCancel: () => void;
};

export default function CreateAssessment({ onCancel }: CreateAssessmentProps) {
  const [step, setStep] = useState(1);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);

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
    console.log(values, 'stepone');

    const res = await createAssessmentMutation.mutateAsync({
      feature_id: 5,
      duration_minutes: 30,
      tags: ['verbal', 'english'],

      title: values.title,
      description: values.description,
      category: values.category,
      assessment_type: values.AssessmentType,
      question_type: values.questionType,
    });

    setAssessmentId(res.id);
    setStep(2);
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

  return (
    <div className="w-full bg-[#F9FAFB] rounded-2xl ">
      <h2 className="text-xl font-semibold text-[#101828]">Create Assessment</h2>
      <p className="text-sm text-[#667085]">Set up your Assessment</p>

      <Stepper step={step} />

      {/* {step === 1 && <StepOne form={form} onNext={() => setStep(2)} />}

      {step === 2 && <StepTwo form={form} onBack={() => setStep(1)} onNext={() => setStep(3)} />} */}
      {step === 1 && <StepOne form={form} onNext={handleStepOneNext} onCancel={onCancel} />}

      {step === 2 && (
        <StepTwo
          form={form}
          onBack={() => setStep(1)}
          onNext={handleStepTwoNext}
          onCancel={onCancel}
        />
      )}
      {step === 3 && (
        <StepThree
          onBack={() => setStep(2)}
          onNext={handleStepThreeNext}
          onCancel={onCancel}
          onAddMCQ={() => setStep(4)}
        />
      )}
      {step === 4 && (
        <StepFour onBack={() => setStep(3)} onCancel={onCancel} assessmentId={assessmentId!} />
      )}
    </div>
  );
}
