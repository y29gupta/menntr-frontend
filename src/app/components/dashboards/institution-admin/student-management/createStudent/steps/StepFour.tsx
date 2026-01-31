import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { studentSetupFormValue } from '../student.schema';
import { FormFieldConfig } from '@/app/components/ui/form.type';
import DynamicForm from '@/app/components/ui/dynamicForm';

type Props = {
  form: UseFormReturn<studentSetupFormValue>;
};

export const StepFour = ({ form }: Props) => {
  const fields: FormFieldConfig<studentSetupFormValue>[] = [
    {
      name: 'guardian_name',
      label: 'Guardian Name',
      type: 'text',
    },
    {
      name: 'guardian_contact',
      label: 'Guardian Contact Number',
      type: 'text',
    },
    {
      name: 'notes',
      label: 'Notes',
      type: 'text',
      message: 'visible only to administrators',
    },
  ];

  return (
    <>
      <div className=" rounded-3xl  ">
        <h2 className=" text-lg font-semibold text-[#1A2C50]">Additional Information (Optional)</h2>
        <DynamicForm fields={fields} layout="single" form={form} />
      </div>
    </>
  );
};
