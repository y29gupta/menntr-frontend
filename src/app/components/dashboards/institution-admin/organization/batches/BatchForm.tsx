'use client';

import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import FormDropdown from '@/app/ui/FormDropdown';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createBatch, updateBatch, getBatchMeta } from './batches.service';
import { CreateBatchPayload } from './batches.types';

const batchSchema = z.object({
  name: z.string().min(1, 'Batch name is required'),
  category: z.string().min(1, 'Institution category is required'),
  departmentId: z.string().min(1, 'Department is required'),
  facultyIds: z.array(z.string()).min(1, 'Assign at least one faculty'),
  startYear: z.string().min(1, 'Start year is required'),
  endYear: z.string().min(1, 'End year is required'),
  status: z.enum(['Active', 'Inactive']),
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
    reset, // ✅ ADD
    formState: { errors },
  } = useForm<BatchFormValues>({
    resolver: zodResolver(batchSchema),
    defaultValues: {
      status: 'Active',
      facultyIds: [],
    },
  });

  const { data: metaRes } = useQuery({
    queryKey: ['batch-meta'],
    queryFn: getBatchMeta,
  });

  const meta = metaRes?.data;

  useEffect(() => {
    if (mode === 'edit' && editRow && meta) {
      // 🔥 RESOLVE DEPARTMENT ID (REAL FIX)
      const resolvedDepartmentId =
        editRow.department?.id !== 0
          ? editRow.department?.id
          : meta.departments.find(
              (d: any) =>
                d.name.trim().toLowerCase() === editRow.department?.name?.trim().toLowerCase()
            )?.id;

      reset({
        name: editRow.name,

        // ✅ CATEGORY (already OK in your case)
        category: String(
          typeof editRow.category === 'object'
            ? editRow.category.id
            : meta.categories.find(
                (c: any) => c.name.toLowerCase() === String(editRow.category).toLowerCase()
              )?.id
        ),

        // ✅ DEPARTMENT (THIS IS THE FIX)
        departmentId: String(resolvedDepartmentId ?? ''),

        facultyIds: editRow.coordinator ? [String(editRow.coordinator.id)] : [],

        startYear: String(editRow.academic_year).split('-')[0],
        endYear: String(editRow.academic_year).split('-')[1],

        status: editRow.status,
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

  const facultyOptions =
    meta?.faculties?.map((f: any) => ({
      label: f.name,
      value: String(f.id),
    })) ?? [];

  const categoryOptions =
    meta?.categories?.map((c: any) => ({
      label: c.name,
      value: String(c.id),
    })) ?? [];

  const yearOptions = Array.from({ length: 10 }).map((_, i) => {
    const y = `${2017 + i}`;
    return { label: y, value: y };
  });

  return (
    <div className="w-full">
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
              <label className="text-[16px] font-medium text-gray-700">Department</label>
              <Controller
                name="departmentId"
                control={control}
                render={({ field }) => (
                  <FormDropdown
                    placeholder="Select department"
                    value={field.value}
                    onChange={field.onChange}
                    options={
                      meta?.departments?.map((d: any) => ({
                        label: d.name,
                        value: String(d.id),
                      })) ?? []
                    }
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
                name="facultyIds"
                control={control}
                render={({ field }) => (
                  // <FormDropdown
                  //   placeholder="Select Faculty"
                  //   multiple
                  //   searchable
                  //   value={field.value}
                  //   onChange={field.onChange}
                  //   options={facultyOptions}
                  // />
                  <FormDropdown
                    placeholder="Select Faculty"
                    multiple
                    searchable
                    value={field.value}
                    renderChips //
                    onChange={(val) => {
                      const current = Array.isArray(field.value) ? field.value : [];
                      if (Array.isArray(val)) {
                        field.onChange(val);
                      } else {
                        field.onChange(
                          current.includes(val)
                            ? current.filter((v) => v !== val)
                            : [...current, val]
                        );
                      }
                    }}
                    options={facultyOptions}
                  />
                )}
              />
              {errors.facultyIds && (
                <p className="text-xs text-red-500 mt-1">{errors.facultyIds.message}</p>
              )}
            </div>

            {/* Academic Year */}
            <div>
              <label className="text-[16px] font-medium text-gray-700">Academic Year</label>
              <div className="flex gap-4 mt-2">
                <Controller
                  name="startYear"
                  control={control}
                  render={({ field }) => (
                    <FormDropdown
                      placeholder="Start year"
                      value={field.value}
                      onChange={field.onChange}
                      options={yearOptions}
                    />
                  )}
                />
                <Controller
                  name="endYear"
                  control={control}
                  render={({ field }) => (
                    <FormDropdown
                      placeholder="End year"
                      value={field.value}
                      onChange={field.onChange}
                      options={yearOptions}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8 pl-6">
            {/* Institution Category */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Institution category<span className="text-red-500">*</span>
              </label>

              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <div className="flex gap-3 mt-3 flex-wrap">
                    {categoryOptions.map((item: any) => (
                      <button
                        type="button"
                        key={item.value}
                        onClick={() => field.onChange(item.value)}
                        className={`px-4 py-1.5 rounded-full border text-sm font-medium ${
                          field.value === item.value
                            ? 'border-purple-500 !text-purple-600 bg-purple-50'
                            : 'border-gray-300 text-gray-500'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {field.value === item.value && <span>✓</span>}
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              />
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
                        className={`px-4 py-1.5 rounded-full border text-sm font-medium ${
                          field.value === item
                            ? 'border-purple-500 !text-purple-600 bg-purple-50'
                            : 'border-gray-300 text-gray-500'
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
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          type="button"
          onClick={handleSubmit(async (data) => {
            const payload: CreateBatchPayload = {
              name: data.name.trim(),
              code: data.name.trim().replace(/\s+/g, '_').toUpperCase(),
              categoryRoleId: Number(data.category),
              departmentRoleId: Number(data.departmentId),
              coordinatorId: Number(data.facultyIds[0]),
              academicYear: Number(data.startYear),
              startDate: `${data.startYear}-01-01`,
              endDate: `${data.endYear}-01-01`,
              isActive: data.status === 'Active',
            };

            if (mode === 'edit' && editRow?.id) {
              await updateMutation.mutateAsync({
                id: editRow.id,
                payload,
              });
            } else {
              await createMutation.mutateAsync(payload);
            }

            console.log('MODE:', mode, 'EDIT ID:', editRow?.id);

            onBack();
          })}
          className="px-6 py-2.5 rounded-full text-sm font-medium text-white
          bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]"
        >
          {mode === 'edit' ? 'Update Batch' : 'Add Batch'}
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
