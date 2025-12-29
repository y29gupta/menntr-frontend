'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema, CategoryFormValues } from './category.schema';
import { ChevronLeft } from 'lucide-react';
import FormDropdown from '@/app/ui/FormDropdown';

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

  const onSubmit = (data: CategoryFormValues) => {
    console.log('CATEGORY SUBMIT:', data);
    onSubmitSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <img src="/Go-back.svg" alt="" /> Go back
        </button>

        <button
          type="submit"
          className="w-full sm:w-auto whitespace-nowrap text-xs sm:text-sm !text-white
      bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
      px-6 py-2.5 rounded-full flex items-center justify-center gap-2 font-medium"
        >
          {mode === 'add' ? '+ Add Category' : 'Save Changes'}
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

          <Controller
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

          {formState.errors.assignedUserId && (
            <p className="text-xs text-red-500">{formState.errors.assignedUserId.message}</p>
          )}
        </div>

        {/* Departments */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <label className="text-sm sm:text-[16px] font-medium text-[#0F172A]">
            Departments under this Category
          </label>

          <div className="mt-2 sm:mt-3 flex flex-wrap gap-2">
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
          </div>
        </div>
      </div>
    </form>
  );
}
