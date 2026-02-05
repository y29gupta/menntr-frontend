'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import DynamicForm from '@/app/components/ui/dynamicForm';
import { FormFieldConfig } from '@/app/components/ui/form.type';
import { studentFormSchema, StudentFormValues } from '../student.types';
import { studentsApi } from '@/app/lib/services/students.api';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const studentFields: FormFieldConfig<StudentFormValues>[] = [
  { name: 'firstName', label: 'First Name', type: 'text' },
  { name: 'phone', label: 'Phone', type: 'text' },
  { name: 'lastName', label: 'Last Name', type: 'text' },
  {
    name: 'rollNumber',
    label: 'Roll Number / University ID',
    type: 'text',
  },
  { name: 'email', label: 'Email Id', type: 'email' },
  {
    name: 'gender',
    label: 'Gender',
    type: 'dropdown',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Other', value: 'other' },
    ],
  },
];
type Props = {
  mode: 'create' | 'edit';
  defaultValues?: Partial<StudentFormValues>;
  onCancel: () => void;
  studentId?: string;
};

export default function CreateStudentForm({ mode, defaultValues, onCancel, studentId }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  console.log(studentId, 'studentid');
  const methods = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues,
  });

  // const mutation = useMutation({
  //   mutationFn: studentsApi.createStudent,
  //   onSuccess: (res, variable) => {
  //     const { student_id } = res.data ?? '';

  //     queryClient.invalidateQueries({ queryKey: ['students'] });
  //     router.push(
  //       `/admin/student-management/${student_id}/studentSetup?rollNumber=${variable.rollNumber}`
  //     );
  //   },
  // });

  const createMutation = useMutation({
    mutationFn: studentsApi.createStudent,
    onSuccess: (res, variables) => {
      const student_id = res.data.student_id;

      queryClient.invalidateQueries({ queryKey: ['students'] });

      router.push(
        `/admin/student-management/${student_id}/studentSetup?rollNumber=${variables.rollNumber}`
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: Partial<StudentFormValues>) =>
      studentsApi.updateStudent(studentId!, payload),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: ['students'] });

      router.push(
        `/admin/student-management/${studentId}/studentSetup?rollNumber=${variables.rollNumber}`
      );
    },
  });

  const onSubmit = (data: StudentFormValues) => {
    if (mode === 'edit') {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };
  const isSaving = mode === 'edit' ? updateMutation.isPending : createMutation.isPending;

  // const onSubmit = (data: StudentFormValues) => {
  //   mutation.mutate(data);
  // };

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
      <div className="relative  border px-6 pt-6 pb-8 rounded-3xl border-[#DBE3E9]">
        <DynamicForm<StudentFormValues> fields={studentFields} layout="two-column" form={methods} />
      </div>

      <div className="flex justify-center gap-4">
        <button
          type="submit"
          className=" bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
            !text-white hover:bg-[#6D28D9] py-2 px-4 rounded-[64px]"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Go Next'}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="border border=[#904BFF] px-4 py-2 !text-[#904BFF] rounded-[64px]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
