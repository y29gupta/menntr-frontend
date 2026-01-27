'use client';
import DynamicForm from '@/app/components/ui/dynamicForm';
import Stepper from '@/app/components/ui/Stepper';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { studentSetupFormSchema, studentSetupFormValue } from './student.schema';
import StepOne from './steps/StepOne';
import { StepTwo } from './steps/StepTwo';
import StepThree from './steps/StepThree';
import { StepFour } from './steps/StepFour';

const StudentSetupForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const methods = useForm<studentSetupFormValue>({
    resolver: zodResolver(studentSetupFormSchema),
    defaultValues: {},
  });

  const stepFields: Record<number, (keyof studentSetupFormValue)[]> = {
    1: ['program', 'department', 'batchId', 'academicYear', 'section'],
    // 2: ['admissionType', 'enrollmentStatus', 'joiningDate'],
    // 3: ['enableLogin', 'allowAssessment', 'allowResult'],
    4: [],
  };

  const handleNext = async () => {
    const valid = await methods.trigger(stepFields[step]);
    if (!valid) return;
    setStep(step + 1);
  };

  const handlesubmit = (data: any) => {
    console.log(data);
  };
  return (
    <>
      <div className=" w-full  rounded-2xl p-4 gap-4">
        <div className="">
          <button onClick={() => router.back()} className="flex gap-2">
            <Image width={16} height={16} src="/Go-back.svg" alt="goback" />
            <span>Go Back</span>
          </button>
        </div>
        <div className="py-4">
          <Stepper step={step} />
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handlesubmit)}>
            {step === 1 && <StepOne form={methods} />}
            {step === 2 && <StepTwo />}
            {step === 3 && <StepThree />}
            {step === 4 && <StepFour />}
            <div className="flex justify-center gap-4 mt-6">
              {step > 1 && (
                <button type="button" onClick={() => setStep(step - 1)}>
                  Back
                </button>
              )}

              {step < 4 ? (
                <button type="button" onClick={handleNext}>
                  Go Nex
                </button>
              ) : (
                <button type="submit">Add Student</button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default StudentSetupForm;
