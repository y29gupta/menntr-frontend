'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema, CategoryFormValues } from './category.schema';
import { createCategory, updateCategory, getCategoryMeta } from '@/app/lib/institutions.api';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { CreateCategoryPayload } from './category.types';
import FormDropdown from '@/app/ui/FormDropdown';
import { useEffect } from 'react';

type Props = {
  mode: 'add' | 'edit';
  defaultValues?: Partial<CategoryFormValues>;
  onCancel: () => void;
  onSubmitSuccess: () => void;
};

export default function CategoryForm({ mode, defaultValues, onCancel, onSubmitSuccess }: Props) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      code: defaultValues?.code ?? '',
      assignedUserId: defaultValues?.assignedUserId ?? '',
      programs: defaultValues?.programs ?? [''],
      id: defaultValues?.id,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        name: defaultValues.name ?? '',
        code: defaultValues.code ?? '',
        assignedUserId: defaultValues.assignedUserId ?? '',
        programs: defaultValues.programs ?? [''],
        id: defaultValues.id,
      });
    }
  }, [defaultValues]);

  const { register, handleSubmit, formState, watch, setValue } = form;
  const queryClient = useQueryClient();

  // ✅ Fetch users from category meta endpoint
  const { data: meta } = useQuery({
    queryKey: ['categoryMeta'],
    queryFn: getCategoryMeta,
  });

  const mutation = useMutation({
    mutationFn: async (payload: CreateCategoryPayload) => {
      if (mode === 'edit' && defaultValues?.id) {
        return updateCategory(defaultValues.id, payload);
      }
      return createCategory(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      onSubmitSuccess();
    },
  });

  const onSubmit = (data: CategoryFormValues) => {
    mutation.mutate({
      name: data.name,
      code: data.code,
      assigned_user_id: Number(data.assignedUserId),
      programs: data.programs.filter((p) => p.trim().length > 0),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <div className="flex px-4 pt-4 flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground"
        >
          <img src="/Go-back.svg" alt="" /> Go back
        </button>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full sm:w-auto whitespace-nowrap text-xs sm:text-sm !text-white
          bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
          px-6 py-2.5 rounded-full flex items-center justify-center gap-2 font-medium"
        >
          {mutation.isPending ? (
            <>
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : mode === 'add' ? (
            '+ Add Category'
          ) : (
            'Save Changes'
          )}
        </button>
      </div>

      {/* Card */}
      <div className="p-4">
        <div className="w-full rounded-2xl border-[#C3CAD9] border bg-background p-4 sm:p-6 flex flex-col gap-6 sm:gap-7">
          {/* Name */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <label className="text-sm sm:text-[16px] text-[#0F172A] font-medium">
              Category Name
            </label>
            <input
              {...register('name')}
              placeholder="Enter Category Name"
              className="w-full border-b py-2 sm:py-2.5 outline-none bg-transparent border-[#C3CAD9]"
            />
            {formState.errors.name && (
              <p className="text-xs text-red-500">{formState.errors.name.message}</p>
            )}
          </div>

          {/* Code */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <label className="text-sm sm:text-[16px] text-[#0F172A] font-medium">
              Category Code
            </label>
            <input
              {...register('code')}
              placeholder="Enter Category Code"
              className="w-full border-b py-2 sm:py-2.5 outline-none bg-transparent border-[#C3CAD9]"
            />
            {formState.errors.code && (
              <p className="text-xs text-red-500">{formState.errors.code.message}</p>
            )}
          </div>

          {/* Assign Category */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <label className="text-sm sm:text-[16px] text-[#0F172A] font-medium">
              Assign Category
            </label>

            <FormDropdown
              placeholder="Select the user"
              searchable
              searchPlaceholder="Search for Users"
              dropdownPosition="top"
              options={
                meta?.users.map((user) => ({
                  label: user.name || user.email,
                  value: String(user.id),
                  subLabel: user.email,
                })) ?? []
              }
              value={watch('assignedUserId') ?? ''}
              onChange={(val) => setValue('assignedUserId', val as string)}
            />

            {formState.errors.assignedUserId && (
              <p className="text-xs text-red-500">{formState.errors.assignedUserId.message}</p>
            )}
          </div>

          {/* Total Programs */}
          <div className="pt-4 ">
            <Controller
              name="programs"
              control={form.control}
              render={({ field }) => {
                const programs = Array.isArray(field.value) ? field.value : [''];
                const lastIndex = programs.length - 1;
                const lastValue = programs[lastIndex] || '';
                const hasTyped = lastValue.trim().length > 0;

                const addProgram = () => {
                  if (!hasTyped) return;
                  field.onChange([...programs, '']);
                };

                const removeChip = (index: number) => {
                  const updated = programs.filter((_, i) => i !== index);
                  field.onChange(updated.length ? updated : ['']);
                };

                const clearCurrentInput = () => {
                  const updated = [...programs];
                  updated[lastIndex] = '';
                  field.onChange(updated);
                };

                return (
                  <>
                    {/* Header */}
                    <div className="mb-4">
                      <label className="text-[16px] font-medium text-[#0F172A]">
                        Total Programs
                      </label>
                    </div>

                    {/* Input Row */}
                    <div className="flex items-center gap-4 border-b border-[#C3CAD9] pb-2">
                      <input
                        type="text"
                        value={lastValue}
                        onChange={(e) => {
                          const updated = [...programs];
                          updated[lastIndex] = e.target.value;
                          field.onChange(updated);
                        }}
                        placeholder="Bachelor of Technology"
                        className="flex-1 text-sm bg-transparent focus:outline-none"
                      />

                      <button
                        type="button"
                        onClick={addProgram}
                        disabled={!hasTyped}
                        className={`font-medium ${
                          hasTyped
                            ? '!text-purple-600 cursor-pointer'
                            : '!text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Add
                      </button>

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
                    {programs.length > 1 && (
                      <div className="flex flex-wrap gap-3 mt-6">
                        {programs.slice(0, -1).map((program, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 px-4 py-2 rounded-full
                  border border-[#C3CAD9] text-[#3D465C] text-sm"
                          >
                            {program}

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

                    {form.formState.errors.programs && (
                      <p className="text-xs text-red-500 mt-2">
                        {form.formState.errors.programs.message}
                      </p>
                    )}
                  </>
                );
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
