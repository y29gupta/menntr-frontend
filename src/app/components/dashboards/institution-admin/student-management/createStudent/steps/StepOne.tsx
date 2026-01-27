import DynamicForm from '@/app/components/ui/dynamicForm';
import { FormFieldConfig } from '@/app/components/ui/form.type';
import React from 'react';
import { studentSetupFormValue } from '../student.schema';
import { FieldValues, UseFormReturn } from 'react-hook-form';

type options = {
  label: string;
  value: string;
};

// type stepONeformValue = {
//   program: string;
//   department: string;
//   batchId: string;
//   academicYear: string;
//   section: string;
//   options: options[];
// };

export type props = {
  form: UseFormReturn<studentSetupFormValue>;
};

type FieldGroup<T> = {
  title?: string;
  fields: FormFieldConfig<T>[];
};

function StepOne({ form }: props) {
  // const studentFields: FormFieldConfig<studentSetupFormValue>[] = [
  //   {
  //     name: 'program',
  //     label: 'Select Program',
  //     type: 'dropdown',
  //     options: [{ label: 'btech', value: 'btech' }],
  //   },
  //   { name: 'department', label: 'Select Department', type: 'dropdown' },
  //   { name: 'batchId', label: 'Select Batch', type: 'dropdown' },
  //   { name: 'academicYear', label: 'Select Year', type: 'dropdown' },
  //   { name: 'section', label: 'Select Section', type: 'dropdown' },
  // ];
  const groups: FieldGroup<studentSetupFormValue>[] = [
    {
      title: 'Program & Department',
      fields: [
        {
          name: 'program',
          label: 'Select Program',
          type: 'dropdown',
          options: [{ label: 'btech', value: 'btech' }],
        },
        { name: 'department', label: 'Select Department', type: 'dropdown' },
      ],
    },
    {
      title: 'Batch & Academic Year',
      fields: [
        { name: 'batchId', label: 'Select Batch', type: 'dropdown' },
        { name: 'academicYear', label: 'Select Year', type: 'dropdown' },
      ],
    },
    {
      title: 'Section/Class',
      fields: [{ name: 'section', label: 'Select Section', type: 'dropdown' }],
    },
  ];

  return (
    <>
      <div className="flex flex-col">
        <p className="text-[#1A2C50] text-lg font-semibold">Academic Details</p>
      </div>
      <DynamicForm<studentSetupFormValue>
        title="Add Student"
        // fields={studentFields}
        // defaultValues={defaultValues}
        // isSubmitting={mutation.isPending}
        // onCancel={onCancel}
        layout="single"
        groups={groups}
        form={form}
      />
    </>
  );
}

export default StepOne;
