'use client';
import DynamicForm from '@/app/components/ui/dynamicForm';
import Stepper from '@/app/components/ui/Stepper';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { studentSetupFormSchema, studentSetupFormValue } from './student.schema';
import StepOne from './steps/StepOne';
import { StepTwo } from './steps/StepTwo';
import StepThree from './steps/StepThree';
import { StepFour } from './steps/StepFour';
import { useMutation, useQuery } from '@tanstack/react-query';
import { studentsApi } from '@/app/lib/services/students.api';
import { toast } from 'react-toastify';
import { message } from 'antd';

const StudentSetupForm = () => {
  const router = useRouter();

  const params = useParams<{ studentId: string }>();
  const studentId = params.studentId as string;

  const searchParams = useSearchParams();

  const rollNumberFromUrl = searchParams.get('rollNumber');

  const [step, setStep] = useState(1);
  const [platformAccess, setPlatformAccess] = useState({
    login_enabled: false,
    assessment_enabled: false,
    result_view_enabled: false,
  });

  const methods = useForm<studentSetupFormValue>({
    resolver: zodResolver(studentSetupFormSchema),
    defaultValues: {},
  });

  const { data: studentData } = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => studentsApi.getStudentById(studentId),
    enabled: !!studentId,
  });

  useEffect(() => {
    if (!studentData?.academic) return;

    const academic = studentData.academic;

    methods.setValue('program', String(academic.category_role_id));
    methods.setValue('department', String(academic.department_role_id));
    methods.setValue('batchId', String(academic.batch_id));
    methods.setValue('section', String(academic.section_id));
    methods.setValue('rollNumber', academic.roll_number);
  }, [studentData, methods]);

  useEffect(() => {
    if (rollNumberFromUrl) {
      methods.setValue('rollNumber', rollNumberFromUrl);
    }
  }, [rollNumberFromUrl, methods]);

  const academicMutation = useMutation({
    mutationFn: (payload: { batch_id: number; roll_number: string; section_id: number }) =>
      studentsApi.addAcademicDetails(params.studentId, payload),

    onSuccess: () => {
      setStep(2);
    },
    onError: (error: any) => {
      console.error('Academic details submission failed', error);
    },
  });

  const enrollmentMutation = useMutation({
    mutationFn: (payload: {
      admission_type: string;
      enrollment_status: string;
      joining_date: string;
    }) => studentsApi.addEnrollmentDetails(params.studentId, payload),

    onSuccess: () => {
      setStep(3);
    },

    onError: (error) => {
      console.error('Enrollment submission failed', error);
    },
  });

  const platformAccessMutation = useMutation({
    mutationFn: (payload: {
      login_enabled: boolean;
      assessment_enabled: boolean;
      result_view_enabled: boolean;
    }) => studentsApi.updatePlatformAccess(params.studentId, payload),

    onSuccess: () => {
      setStep(4);
    },
  });

  const AdditionalInfoMutation = useMutation({
    mutationFn: (payload: { guardian_name?: string; guardian_contact?: string; notes?: string }) =>
      studentsApi.SaveAdditionalInfo(studentId, payload),

    onSuccess: () => {
      message.success('Student information added successfully');
      router.push('/admin/student-management');
    },
  });

  const stepFields: Record<number, (keyof studentSetupFormValue)[]> = {
    1: ['program', 'department', 'batchId', 'academicYear', 'section'],
    2: ['admissionType', 'enrollmentStatus', 'joiningDate'],
    // 3: ['enableLogin', 'allowAssessment', 'allowResult'],
    4: ['guardian_name', 'guardian_contact', 'notes'],
  };
  const handleSubmit = async (data: studentSetupFormValue) => {
    const valid = await methods.trigger(stepFields[step]);
    if (!valid) return;

    console.log(data, 'stepone');

    if (step === 1) {
      academicMutation.mutate({
        batch_id: Number(data.batchId),
        roll_number: data.rollNumber!,
        section_id: Number(data.section),
      });
      return;
    }
    if (step === 2) {
      enrollmentMutation.mutate({
        admission_type: data.admissionType!,
        enrollment_status: data.enrollmentStatus!,
        joining_date: data.joiningDate!,
      });
      return;
    }
    if (step === 3) {
      platformAccessMutation.mutate(platformAccess);
      return;
    }
    if (step === 4) {
      AdditionalInfoMutation.mutate({
        guardian_name: data.guardian_name,
        guardian_contact: data.guardian_contact,
        notes: data.notes,
      });
    }

    if (step < 4) {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <>
      <div
        className=" w-full  flex flex-col justify-between flex-1 h-full  shadow-[0_0_8px_0_#0F172A1F]
  rounded-2xl p-4 gap-4"
      >
        <div>
          <div className="">
            <button onClick={() => router.back()} className="flex gap-2">
              <Image width={16} height={16} src="/Go-back.svg" alt="goback" />
              <span>Go Back</span>
            </button>
          </div>
          <div className="py-1">
            <Stepper step={step} />
          </div>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              {step === 1 && <StepOne form={methods} />}
              {step === 2 && <StepTwo form={methods} />}
              {step === 3 && <StepThree value={platformAccess} onChange={setPlatformAccess} />}
              {step === 4 && <StepFour form={methods} />}
              <div className="flex justify-center  gap-4 mt-6">
                {step > 1 && (
                  <button type="button" onClick={() => setStep(step - 1)}>
                    Back
                  </button>
                )}

                {step < 4 ? (
                  // <button type="button" onClick={handleNext}>
                  //   Go Next
                  // </button>
                  <div className="flex justify-center gap-4">
                    <button
                      type="submit"
                      className=" bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
            !text-white hover:bg-[#6D28D9] py-2 px-4 rounded-[64px]"
                      // disabled={mutation.isPending}
                    >
                      {academicMutation.isPending ? 'Saving...' : 'Go Next'}
                    </button>

                    <button
                      type="button"
                      onClick={() => router.push('/admin/student-management')}
                      className="border border=[#904BFF] px-4 py-2 !text-[#904BFF] rounded-[64px]"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      type="submit"
                      className=' className=" bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
            !text-white hover:bg-[#6D28D9] py-2 px-4 rounded-[64px]'
                    >
                      Add Student
                    </button>
                    <button
                      type="button"
                      // onClick={onCancel}
                      className="border border=[#904BFF] px-4 py-2 !text-[#904BFF] rounded-[64px]"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
};

export default StudentSetupForm;
