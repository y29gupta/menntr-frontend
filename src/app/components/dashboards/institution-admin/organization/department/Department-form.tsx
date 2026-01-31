'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { departmentSchema, DepartmentFormValues } from './department.schema';
import { z } from 'zod';
import DropdownIcon from '../../../../icons/DropdownIcon';
import FormDropdown from '@/app/ui/FormDropdown';
import { getDepartmentMeta } from '@/app/lib/institutions.api';
import { useQuery } from '@tanstack/react-query';
import { meta } from 'zod/v4/core';

export const departmentSchema = z.object({
  name: z.string().min(1, 'Department name is required'),
  code: z.string().min(1, 'Department code is required'),
  category_id: z.string().optional(),
  hodId: z.string().optional(),
});

export type DepartmentFormValues = z.infer<typeof departmentSchema>;

interface Props {
  mode: 'create' | 'edit';
  defaultValues?: Partial<DepartmentFormValues>;
  onBack: () => void;
  onSubmit: (data: DepartmentFormValues) => void;
}

const DepartmentForm = ({ mode, defaultValues, onBack, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues,
  });

  const { data: metaData, isLoading } = useQuery({
    queryKey: ['department-meta'],
    queryFn: getDepartmentMeta,
  });
  const Categoryoption = metaData?.categories.map((item) => ({
    label: item.name,
    value: String(item.id), // ✅ FIX
  }));

  const AssignHODoption = metaData?.hodUsers.map((item) => ({
    label: item.name,
    value: String(item.id), // ✅ FIX
  }));

  console.log(Categoryoption, 'categoryopt');
  return (
    <div className="w-full p-4">
      <div className="flex items-center  justify-between mb-4">
        <div className="flex flex-col  gap-4">
          <button
            onClick={onBack}
            className="text-sm flex  items-center gap-2 font-medium text-gray-600 hover:text-gray-900"
          >
            <span>
              <img src="/Go-back.svg" alt="goback" />
            </span>
            Go back
          </button>
          {/* 🔹 TITLE */}
          <h2 className="text-lg font-bold text-[#1A2C50] mb-6">
            {mode === 'edit' ? 'Edit department' : 'Add department'}
          </h2>
        </div>

        <button
          onClick={handleSubmit(onSubmit)}
          className="px-5 py-2.5 rounded-full text-lg font-medium !text-white
          bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]"
        >
          + {mode === 'edit' ? 'Update Department' : 'Add Department'}
        </button>
      </div>

      <div className=" rounded-xl border border-[#C3CAD9] p-6">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-[#C3CAD9]" />

          <div className="space-y-6 pr-6">
            <div>
              <label className="text-sm text-gray-700 font-medium">Department Name</label>
              <input
                {...register('name')}
                placeholder="Enter Department Name"
                className="mt-2 w-full border-b border-[#C3CAD9] py-2 text-sm
          focus:outline-none focus:border-purple-500"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            {/* Department Code */}
            <div>
              <label className="text-sm text-gray-700 font-medium">Department Code</label>
              <input
                {...register('code')}
                placeholder="Enter Department Code"
                className="mt-2 w-full border-b border-gray-300 py-2 text-sm
          focus:outline-none focus:border-purple-500"
              />
              {errors.code && <p className="text-xs text-red-500 mt-1">{errors.code.message}</p>}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6 pl-6">
            {/* Parent Category (CUSTOM DROPDOWN UI) */}
            {/* Parent Category */}
            <div>
              <label className="text-sm text-gray-700 font-medium">Parent Category</label>

              <Controller
                name="category_id"
                control={control}
                render={({ field }) => {
                  console.log(field, 'field');
                  return (
                    <FormDropdown
                      placeholder="Select Parent Category"
                      value={field.value}
                      onChange={field.onChange}
                      options={Categoryoption || []}
                    />
                  );
                }}
              />
            </div>

            {/* Assign HOD (CUSTOM DROPDOWN UI) */}
            {/* Assign HOD */}
            <div>
              <label className="text-sm text-gray-700 font-medium">Assign HOD</label>

              <Controller
                name="hodId"
                control={control}
                render={({ field }) => (
                  <FormDropdown
                    placeholder="Select User"
                    searchable
                    searchPlaceholder="Search for Users"
                    value={field.value}
                    onChange={field.onChange}
                    // options={[
                    //   { label: 'Dr. Rajesh Kumar', value: '1' },
                    //   { label: 'Dr. Anil Sharma', value: '2' },
                    // ]}
                    options={AssignHODoption || []}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentForm;
