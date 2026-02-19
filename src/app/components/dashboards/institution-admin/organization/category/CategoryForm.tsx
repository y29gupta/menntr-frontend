'use client';

import { useForm } from 'react-hook-form';
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
      id: defaultValues?.id,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        name: defaultValues.name ?? '',
        code: defaultValues.code ?? '',
        assignedUserId: defaultValues.assignedUserId ?? '',
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
        </div>
      </div>
    </form>
  );
}
