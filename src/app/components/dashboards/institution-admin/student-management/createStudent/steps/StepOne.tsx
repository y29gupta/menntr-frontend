import DynamicForm from '@/app/components/ui/dynamicForm';
import { FormFieldConfig } from '@/app/components/ui/form.type';
import React, { useEffect, useMemo } from 'react';
import { studentSetupFormValue } from '../student.schema';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getBatches, getDepartments, getPrograms } from '@/app/lib/services/students.api';

export type props = {
  form: UseFormReturn<studentSetupFormValue>;
};

type FieldGroup<T> = {
  title?: string;
  fields: FormFieldConfig<T>[];
};

function StepOne({ form }: props) {
  const { watch, setValue } = form;

  const programId = watch('program');
  const departmentId = watch('department');
  const batchId = watch('batchId');

  const { data: programs = [] } = useQuery({
    queryKey: ['programs'],
    queryFn: getPrograms,
  });

  console.log(programId, 'prog');
  const { data: departments = [] } = useQuery({
    queryKey: ['departments', programId],
    queryFn: () => getDepartments(programId),
    enabled: !!programId,
  });

  const { data: batches = [] } = useQuery({
    queryKey: ['batches', departmentId],
    queryFn: () => getBatches(departmentId),
    enabled: !!departmentId,
  });

  // Reset dependent fields when program changes
  useEffect(() => {
    setValue('department', '');
    setValue('batchId', '');
    setValue('academicYear', '');
    setValue('section', '');
  }, [programId]);

  // Reset dependent fields when department changes
  useEffect(() => {
    setValue('batchId', '');
    setValue('academicYear', '');
    setValue('section', '');
  }, [departmentId]);

  /* ------------------ Options Mapping ------------------ */

  const programOptions = programs.map((p: any) => ({
    label: p.name,
    value: String(p.id),
  }));

  const departmentOptions = departments.map((d: any) => ({
    label: d.name,
    value: String(d.id),
  }));

  const batchOptions = batches.map((b: any) => ({
    label: b.name,
    value: String(b.id),
  }));

  const academicYearOptions = useMemo(() => {
    const batch = batches.find((b: any) => String(b.id) === batchId);
    return batch
      ? [{ label: String(batch.academic_year), value: String(batch.academic_year) }]
      : [];
  }, [batches, batchId]);

  const sectionOptions = useMemo(() => {
    const batch = batches.find((b: any) => String(b.id) === batchId);

    return (
      batch?.sections?.map((s: { id: number; name: string }) => ({
        label: s.name,
        value: String(s.id), // ✅ primitive
      })) ?? []
    );
  }, [batches, batchId]);

  const groups: FieldGroup<studentSetupFormValue>[] = [
    {
      title: 'Program & Department',
      fields: [
        {
          name: 'program',
          label: 'Select Program',
          type: 'dropdown',
          options: programOptions,
        },
        {
          name: 'department',
          label: 'Select Department',
          type: 'dropdown',
          options: departmentOptions,
        },
      ],
    },
    {
      title: 'Batch & Academic Year',
      fields: [
        { name: 'batchId', label: 'Select Batch', type: 'dropdown', options: batchOptions },
        {
          name: 'academicYear',
          label: 'Select Year',
          type: 'dropdown',
          options: academicYearOptions,
        },
      ],
    },
    {
      title: 'Section/Class',
      fields: [
        { name: 'section', label: 'Select Section', type: 'dropdown', options: sectionOptions },
      ],
    },
  ];

  return (
    <>
      <div className="flex  flex-col">
        <p className="text-[#1A2C50]  text-lg font-semibold">Academic Details</p>
      </div>
      <DynamicForm<studentSetupFormValue>
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
