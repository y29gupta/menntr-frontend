'use client';

import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import FormDropdown from '@/app/ui/FormDropdown';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createBatch, updateBatch, getBatchMeta } from './batches.service';
import { CreateBatchPayload } from './batches.types';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import { Plus, X } from 'lucide-react';
import YearInput from '@/app/ui/YearInput';

const batchSchema = z.object({
  name: z.string().min(1, 'Batch name is required'),
  category: z.string().min(1, 'Category is required'),
  departmentId: z.string().min(1, 'Department is required'),
  facultyId: z.string().optional(), // Optional faculty assignment
  startYear: z.custom<Dayjs>().nullable(),
  endYear: z.custom<Dayjs>().nullable(),
  status: z.enum(['Active', 'Inactive']),
  sections: z
    .array(z.string().min(1, 'Section name is required'))
    .min(1, 'At least one section is required'),
});

export type BatchFormValues = z.infer<typeof batchSchema>;

type Props = {
  mode: 'create' | 'edit';
  batchId?: number;
  editRow?: any; // raw table row
  onBack: () => void;
};

export default function BatchForm({ mode, batchId, onBack, editRow }: Props) {
  const {
    control,
    watch,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BatchFormValues>({
    resolver: zodResolver(batchSchema),
    defaultValues: {
      name: '',
      category: '',
      departmentId: '',
      startYear: null,
      endYear: null,
      status: 'Active',
      sections: [''],
      facultyId: undefined,
    },
  });

  const selectedCategory = watch('category');
  const selectedDepartment = watch('departmentId');

  const { data: metaRes } = useQuery({
    queryKey: ['batch-meta'],
    queryFn: getBatchMeta,
  });

  const meta = metaRes?.data;

  useEffect(() => {
    if (mode === 'edit' && editRow && meta) {
      const resolvedDepartmentId =
        editRow.department?.id !== 0
          ? editRow.department?.id
          : meta.departments.find(
              (d: any) =>
                d.name.trim().toLowerCase() === editRow.department?.name?.trim().toLowerCase()
            )?.id;

      reset({
        name: editRow.name,

        category: String(
          typeof editRow.category === 'object'
            ? editRow.category.id
            : meta.categories.find(
                (c: any) => c.name.toLowerCase() === String(editRow.category).toLowerCase()
              )?.id
        ),

        departmentId: String(resolvedDepartmentId ?? ''),

        facultyId: editRow.coordinator ? String(editRow.coordinator.id) : undefined,

        startYear: dayjs(String(editRow.academic_year).split('-')[0], 'YYYY'),
        endYear: dayjs(String(editRow.academic_year).split('-')[1], 'YYYY'),

        status: editRow.status,
        sections: editRow.sections?.map((s: any) => s.name || s) || [''],
      });
    }
  }, [mode, editRow, meta, reset]);

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createBatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['batches'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateBatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['batches'] });
    },
  });

  const categoryOptions =
    meta?.categories?.map((c: any) => ({
      label: c.name,
      value: String(c.id),
    })) ?? [];

  // Filter departments based on selected category
  const departmentOptions =
    meta?.departments
      ?.filter((d: any) => {
        if (!selectedCategory) return true;
        return d.parent_id === Number(selectedCategory);
      })
      .map((d: any) => ({
        label: d.name,
        value: String(d.id),
      })) ?? [];

  // Filter faculty based on selected department
  // Faculty roles have parent_id pointing to the department role
  const facultyOptions =
    meta?.facultyRoles
      ?.filter((fr: any) => {
        if (!selectedDepartment) return false;
        return fr.parentId === Number(selectedDepartment);
      })
      .flatMap((fr: any) =>
        fr.users.map((user: any) => ({
          label: user.name || user.email,
          value: user.id,
        }))
      ) ?? [];

  const yearOptions = Array.from({ length: 10 }).map((_, i) => {
    const y = `${2017 + i}`;
    return { label: y, value: y };
  });

  return (
    <div className="w-full p-4">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col gap-3">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium">
            <img src="/Go-back.svg" alt="back" />
            Go back
          </button>

          <h2 className="text-lg font-bold text-[#1A2C50]">
            {mode === 'edit' ? 'Edit Batch' : 'Add Batch'}
          </h2>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="border border-[#C3CAD9] rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 relative">
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-[#C3CAD9]" />

          {/* LEFT COLUMN */}
          <div className="space-y-6 pr-6">
            {/* Batch Name */}
            <div>
              <label className="text-[16px] font-medium text-gray-700">Batch Name</label>
              <input
                {...register('name')}
                placeholder="e.g. CSE - 2023–27"
                className="mt-2 w-full border-b border-gray-300 py-2 text-sm
                focus:outline-none focus:border-purple-500"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            {/* Department */}
            <div>
              <label className="text-[16px] font-medium text-gray-700">
                Department <span className="text-red-500">*</span>
              </label>
              <Controller
                name="departmentId"
                control={control}
                render={({ field }) => (
                  <FormDropdown
                    placeholder={selectedCategory ? 'Select department' : 'Select category first'}
                    value={field.value}
                    onChange={(val) => {
                      field.onChange(val);
                      // Reset faculty when department changes
                      setValue('facultyId', undefined);
                    }}
                    options={selectedCategory ? departmentOptions : []}
                  />
                )}
              />
              {errors.departmentId && (
                <p className="text-xs text-red-500 mt-1">{errors.departmentId.message}</p>
              )}
            </div>

            {/* Assign Faculty */}
            <div>
              <label className="text-[16px] font-medium text-gray-700">Assign Faculty</label>
              <Controller
                name="facultyId"
                control={control}
                render={({ field }) => (
                  <FormDropdown
                    placeholder={
                      selectedDepartment ? 'Select Faculty (Optional)' : 'Select department first'
                    }
                    value={field.value || ''}
                    onChange={(val) => {
                      field.onChange(val);
                    }}
                    options={selectedDepartment ? facultyOptions : []}
                  />
                )}
              />
            </div>

            {/* Academic Year */}
            <div>
              <label className="text-[16px] font-medium text-gray-700">Academic Year</label>

              <div className="flex gap-4 mt-2">
                <Controller
                  name="startYear"
                  control={control}
                  render={({ field }) => (
                    <YearInput
                      label="Start Year"
                      placeholder="Select start year"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />

                <Controller
                  name="endYear"
                  control={control}
                  render={({ field }) => (
                    <YearInput
                      label="End Year"
                      placeholder="Select end year"
                      value={field.value}
                      onChange={field.onChange}
                      disabledBefore={watch('startYear')}
                    />
                  )}
                />
              </div>

              {(errors.startYear || errors.endYear) && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.startYear?.message || errors.endYear?.message}
                </p>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8 sm:pl-6">
            {/* Institution Category */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Institution Category <span className="text-red-500">*</span>
              </label>

              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-3 mt-3 max-h-[6.5rem] min-h-[6.5rem] overflow-y-auto">
                    {categoryOptions.map((item: any) => (
                      <button
                        type="button"
                        key={item.value}
                        onClick={() => {
                          field.onChange(item.value);
                          setValue('departmentId', '');
                          setValue('facultyId', undefined);
                        }}
                        className={`px-4 py-1.5 rounded-full border text-sm font-light whitespace-nowrap ${
                          field.value === item.value
                            ? 'border-purple-500 !text-purple-600 bg-purple-50'
                            : 'border-[#C3CAD9] text-[#3D465C]'
                        }`}
                      >
                        <span className="flex items-center gap-2 whitespace-nowrap">
                          {field.value === item.value && <span>✓</span>}
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              />

              {errors.category && (
                <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>
              )}
            </div>

            {/* Batch Status */}
            <div>
              <label className="text-sm font-medium text-gray-700">Batch Status</label>

              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <div className="flex gap-3 mt-3">
                    {['Active', 'Inactive'].map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => field.onChange(item)}
                        className={`px-4 py-1.5 rounded-full border text-sm font-light ${
                          field.value === item
                            ? 'border-purple-500 !text-purple-600 bg-purple-50'
                            : 'border-[#C3CAD9] text-[#3D465C]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {field.value === item && <span>✓</span>}
                          {item}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              />
            </div>

            <div className="pt-6 border-t border-[#C3CAD9]">
              <Controller
                name="sections"
                control={control}
                render={({ field }) => {
                  const sections = Array.isArray(field.value) ? field.value : [''];
                  const lastIndex = sections.length - 1;
                  const lastValue = sections[lastIndex] || '';
                  const hasTyped = lastValue.trim().length > 0;

                  const addSection = () => {
                    if (!hasTyped) return;
                    field.onChange([...sections, '']);
                  };

                  const removeChip = (index: number) => {
                    const updated = sections.filter((_, i) => i !== index);
                    field.onChange(updated.length ? updated : ['']);
                  };

                  const clearCurrentInput = () => {
                    const updated = [...sections];
                    updated[lastIndex] = '';
                    field.onChange(updated);
                  };

                  return (
                    <>
                      {/* Header */}
                      <div className="mb-4">
                        <label className="text-lg font-medium text-[#1A2C50]">
                          Total Sections <span className="text-red-500">*</span>
                        </label>
                      </div>

                      {/* Input Row */}
                      <div className="flex items-center gap-4 border-b border-gray-300 pb-2">
                        <input
                          type="text"
                          value={lastValue}
                          onChange={(e) => {
                            const updated = [...sections];
                            updated[lastIndex] = e.target.value;
                            field.onChange(updated);
                          }}
                          placeholder="CSE-2017-A"
                          className="flex-1 text-sm focus:outline-none"
                        />

                        {/* Add Button */}
                        <button
                          type="button"
                          onClick={addSection}
                          disabled={!hasTyped}
                          className={`font-medium ${
                            hasTyped
                              ? '!text-purple-600 cursor-pointer'
                              : '!text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Add
                        </button>

                        {/* Close Button (only when typing) */}
                        {hasTyped && (
                          <button
                            type="button"
                            onClick={clearCurrentInput}
                            className="text-gray-400 hover:text-red-500"
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      {/* Chips */}
                      {sections.length > 1 && (
                        <div className="flex flex-wrap gap-3 mt-6">
                          {sections.slice(0, -1).map((section, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 px-4 py-2 rounded-full
                  border border-[#C3CAD9] text-[#3D465C] text-sm"
                            >
                              {section}

                              <button
                                type="button"
                                onClick={() => removeChip(index)}
                                className="text-gray-500 hover:text-red-500"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  );
                }}
              />

              {errors.sections && (
                <p className="text-xs text-red-500 mt-2">{errors.sections.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          type="button"
          onClick={handleSubmit(async (data) => {
            // Filter out empty sections
            const validSections = data.sections.filter((s) => s.trim().length > 0);

            const payload: CreateBatchPayload = {
              name: data.name.trim(),
              code: data.name.trim().replace(/\s+/g, '_').toUpperCase(),
              categoryRoleId: Number(data.category),
              departmentRoleId: Number(data.departmentId),
              coordinatorId: data.facultyId ? Number(data.facultyId) : undefined,
              startDate: `${data.startYear?.year()}-01-01`,
              endDate: `${data.endYear?.year()}-12-31`,
              isActive: data.status === 'Active',
              sections: validSections,
            };

            if (mode === 'edit' && editRow?.id) {
              await updateMutation.mutateAsync({
                id: editRow.id,
                payload,
              });
            } else {
              await createMutation.mutateAsync(payload);
            }

            onBack();
          })}
          className="px-6 py-2.5 rounded-full text-sm font-medium !text-white
          bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]"
        >
          {mode === 'edit' ? 'Update Batch' : 'Create Batch'}
        </button>

        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2.5 rounded-full text-sm font-medium border border-purple-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
