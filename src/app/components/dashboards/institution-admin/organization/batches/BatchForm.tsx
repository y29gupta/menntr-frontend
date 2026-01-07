'use client';

import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormDropdown from '@/app/ui/FormDropdown';

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
  defaultValues?: Partial<BatchFormValues>;
  onBack: () => void;
  onSubmit: (data: BatchFormValues) => void;
};

export default function BatchForm({ mode, defaultValues, onBack, onSubmit }: Props) {
  const {
    control,
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BatchFormValues>({
    resolver: zodResolver(batchSchema),
    defaultValues: {
      status: 'Active',
      facultyIds: [],
      ...defaultValues,
    },
  });

  const facultyOptions = [
    { label: 'Dr. Anand', value: 'anand' },
    { label: 'Mr. Karthick', value: 'karthick' },
    { label: 'Ms. Neha', value: 'neha' },
    { label: 'Ms. Neha', value: 'neha' },
    { label: 'Ms. Neha', value: 'neha' },
  ];

  const yearOptions = Array.from({ length: 10 }).map((_, i) => {
    const y = `${2017 + i}`;
    return { label: y, value: y };
  });
  const facultyIdsValue = watch('facultyIds');
  const facultyIdsArray = Array.isArray(facultyIdsValue) ? facultyIdsValue : [];

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
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
                    options={[
                      { label: 'Computer Science', value: '1' },
                      { label: 'Information Technology', value: '2' },
                      { label: 'Mechanical Engineering', value: '3' },
                    ]}
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
                  <div className="flex gap-3 mt-3">
                    {['Engineering', 'Agriculture'].map((item) => (
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
          onClick={handleSubmit(onSubmit)}
          className="px-6 py-2.5 rounded-full text-sm font-medium !text-white
          bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]"
        >
          + {mode === 'edit' ? 'Update Batch' : 'Add Batch'}
        </button>

        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-full text-sm font-medium border border-purple-500 text-purple-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
