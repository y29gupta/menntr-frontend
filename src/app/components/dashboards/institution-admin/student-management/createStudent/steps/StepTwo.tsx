import DynamicForm from '@/app/components/ui/dynamicForm';
import { UseFormReturn } from 'react-hook-form';
import { studentSetupFormValue } from '../student.schema';
import { useQuery } from '@tanstack/react-query';
import { studentsApi } from '@/app/lib/services/students.api';
import { FormFieldConfig } from '@/app/components/ui/form.type';

type Props = {
  form: UseFormReturn<studentSetupFormValue>;
};

export const StepTwo = ({ form }: Props) => {
  const { data } = useQuery({
    queryKey: ['enrollment-meta'],
    queryFn: studentsApi.getEnrollmentMeta,
  });

  const fields: FormFieldConfig<studentSetupFormValue>[] = [
    {
      name: 'admissionType',
      label: 'Admission Type',
      type: 'chip',
      options:
        data?.admission_types?.map((item: any) => ({
          label: item.label,
          value: item.key,
        })) ?? [],
    },
    {
      name: 'enrollmentStatus',
      label: 'Enrollment Status',
      type: 'chip',
      options:
        data?.enrollment_statuses?.map((item: any) => ({
          label: item.label,
          value: item.key,
        })) ?? [],
    },
    {
      name: 'joiningDate',
      label: 'Joining Date',
      type: 'date',
    },
  ];

  return (
    <>
      <p className="text-[#21304e] text-lg font-semibold mb-4">Enrollment & Status</p>

      <DynamicForm fields={fields} layout="single" form={form} />
    </>
  );
};
