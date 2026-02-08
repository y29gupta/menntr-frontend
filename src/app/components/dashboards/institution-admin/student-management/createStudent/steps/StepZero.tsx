import DynamicForm from '@/app/components/ui/dynamicForm';
import { FormFieldConfig } from '@/app/components/ui/form.type';
import React from 'react';
import { studentSetupFormValue } from '../student.schema';
import { UseFormReturn } from 'react-hook-form';

type Props = {
  form: UseFormReturn<studentSetupFormValue>;
};

export const StepZero = ({ form }: Props) => {
  const fields: FormFieldConfig<studentSetupFormValue>[] = [
    { name: 'firstName', label: 'First Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', type: 'text' },
    { name: 'email', label: 'Email Id', type: 'email' },
    { name: 'phone', label: 'Phone', type: 'text' },
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
    {
      name: 'rollNumber',
      label: 'Roll Number / University ID',
      type: 'text',
    },
  ];

  return (
    <>
      <div className="flex flex-col">
        <p className="text-[#1A2C50] text-lg font-semibold mb-4">Basic Information</p>
      </div>
      <div className="relative border px-6 pt-6 pb-8 rounded-3xl border-[#DBE3E9]">
        <DynamicForm<studentSetupFormValue> fields={fields} layout="two-column" form={form} />
      </div>
    </>
  );
};
