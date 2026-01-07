'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Stepper from './Stepper';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import { createAssessmentSchema, CreateAssessmentForm, stepOneSchema } from './schema';

type CreateAssessmentProps = {
  onCancel: () => void;
};

export default function CreateAssessment({ onCancel }: CreateAssessmentProps) {
  const [step, setStep] = useState(1);

  const form = useForm<CreateAssessmentForm>({
    resolver: zodResolver(createAssessmentSchema),
    defaultValues: {
      category: 'Aptitude',
      AssessmentType: 'Graded',
      questionType: 'MCQ',
      institutionCategory: 'Engineering',
      department: 'CSE',
    },
  });

  const handleStepOneNext = async () => {
    const isValid = await form.trigger([
      'AssessmentName',
      'description',
      'category',
      'AssessmentType',
      'questionType',
    ]);

    if (isValid) setStep(2);
  };

  const handleStepTwoNext = async () => {
    const isValid = await form.trigger(['institutionCategory', 'department', 'batch']);

    if (isValid) setStep(3);
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
    </div>
  );
}
