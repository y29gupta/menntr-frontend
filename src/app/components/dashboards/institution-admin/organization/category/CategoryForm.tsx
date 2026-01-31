'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema, CategoryFormValues } from './category.schema';
import { ChevronLeft } from 'lucide-react';
import FormDropdown from '@/app/ui/FormDropdown';
import { createCategory, getCategoryMeta, updateCategory } from '@/app/lib/institutions.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { CreateCategoryPayload } from './category.types';

type Props = {
  mode: 'add' | 'edit';
  defaultValues?: Partial<CategoryFormValues>;
  onCancel: () => void;
  onSubmitSuccess: () => void;
};

const USERS = [
  { id: '1', name: 'Ram Dass. SM', department: 'Engineering department' },
  { id: '2', name: 'Lily.D', department: 'Arts & Science' },
];

const DEPARTMENTS = ['BCA', 'EEE', 'Mech', 'BSC'];

export default function CategoryForm({ mode, defaultValues, onCancel, onSubmitSuccess }: Props) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      code: '',
      assignedUserId: '',
      departments: [],
      ...defaultValues,
    },
  });

  const { register, handleSubmit, watch, setValue, formState } = form;
  const selectedDepartments = watch('departments');

  const { data: metaData, isLoading } = useQuery({
    queryKey: ['category-meta'],
    queryFn: getCategoryMeta,
  });

  useEffect(() => {
    if (mode === 'edit' && defaultValues?.id && metaData) {
      const assignedDepartmentIds = metaData.departments
        .filter((dept: any) => dept.categoryId === defaultValues.id && dept.isAssigned)
        .map((dept: any) => dept.id);

      setValue('departments', assignedDepartmentIds);
    }
  }, [mode, defaultValues?.id, metaData, setValue]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreateCategoryPayload) => {
      if (mode === 'edit' && defaultValues?.id) {
        return updateCategory(defaultValues.id, payload);
      }
      // return createCategory(payload);
      const res = createCategory(payload);
      console.log(res, 'response');
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      onSubmitSuccess();
    },
  });

  const onSubmit = (data: CategoryFormValues) => {
    console.log(data, 'data');
    mutation.mutate({
      name: data.name,
      code: data.code,
      headUserId: Number(data.assignedUserId),
      departmentIds: data.departments.map(Number),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
          className="w-full sm:w-auto  whitespace-nowrap text-xs sm:text-sm !text-white
    bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
    px-6 py-2.5 rounded-full flex items-center justify-center gap-2 font-medium
   "
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
      <div className="w-full rounded-2xl border-[#C3CAD9] border bg-background p-4 sm:p-6 flex flex-col gap-6 sm:gap-7">
        {/* Name */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <label className="text-sm sm:text-[16px] text-[#0F172A] font-medium">Category Name</label>
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
          <label className="text-sm sm:text-[16px] text-[#0F172A] font-medium">Category Code</label>
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

          {/* <Controller
            name="assignedUserId"
            control={form.control}
            render={({ field }) => (
              <FormDropdown
                placeholder="Select the user"
                value={field.value}
                onChange={field.onChange}
                searchable
                searchPlaceholder="Search for Users"
                options={USERS.map((u) => ({
                  label: u.name,
                  value: u.id,
                  subLabel: u.department,
                }))}
              />
            )}
          />
           */}
          <Controller
            name="assignedUserId"
            control={form.control}
            render={({ field }) => {
              console.log(field, 'field');
              return (
                <FormDropdown
                  placeholder="Select the user"
                  value={field.value}
                  onChange={field.onChange}
                  searchable
                  searchPlaceholder="Search for Users"
                  options={
                    metaData?.users.map((user: any) => ({
                      label: user.name,
                      value: user.id,
                      subLabel: user.email,
                    })) ?? []
                  }
                />
              );
            }}
          />

          {formState.errors.assignedUserId && (
            <p className="text-xs text-red-500">{formState.errors.assignedUserId.message}</p>
          )}
        </div>

        {/* Departments */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <label className="text-sm sm:text-[16px] font-medium text-[#0F172A]">
            Departments under this Category
          </label>

          {/* <div className="mt-2 sm:mt-3 flex flex-wrap gap-2">
            {DEPARTMENTS.map((dept) => {
              const active = selectedDepartments.includes(dept);
              return (
                <button
                  type="button"
                  key={dept}
                  onClick={() =>
                    setValue(
                      'departments',
                      active
                        ? selectedDepartments.filter((d) => d !== dept)
                        : [...selectedDepartments, dept]
                    )
                  }
                  className={`rounded-full border border-[#C3CAD9] px-4 py-1 text-sm ${
                    active
                      ? 'border-[#7C3AED] bg-[#F6F0FF] !text-[#7C3AED]'
                      : 'border-muted text-muted-foreground'
                  }`}
                >
                  {active && '✓ '} {dept}
                </button>
              );
            })}
          </div> */}
          <div className="mt-2 flex flex-wrap gap-2">
            {metaData?.departments.map((dept: any) => {
              const active = selectedDepartments.includes(dept.id);

              return (
                <button
                  type="button"
                  key={dept.id}
                  onClick={() =>
                    setValue(
                      'departments',
                      active
                        ? selectedDepartments.filter((d) => d !== dept.id)
                        : [...selectedDepartments, dept.id]
                    )
                  }
                  className={`rounded-full border px-4 py-1 text-sm ${
                    active
                      ? 'border-[#7C3AED] bg-[#F6F0FF] text-[#7C3AED]'
                      : 'border-[#C3CAD9] text-muted-foreground'
                  }`}
                >
                  {active && '✓ '} {dept.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </form>
  );
}
