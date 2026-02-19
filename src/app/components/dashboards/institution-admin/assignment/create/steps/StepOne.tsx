import { UseFormReturn } from 'react-hook-form';
import { CreateAssignmentForm } from '../schema';
import { useQuery } from '@tanstack/react-query';
import { assignmentApi } from '../../assignment.service';
import { useEffect } from 'react';

type Props = {
  form: UseFormReturn<CreateAssignmentForm>;
  onNext: () => void;
  onCancel: () => void;
};

export default function AssignmentStepOne({ form, onNext, onCancel }: Props) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const category = watch('category');
  const type = watch('assignmentType'); // 👈 change if your field name differs

  const { data: metaData } = useQuery({
    queryKey: ['assignment-meta'], // ✅ changed
    queryFn: assignmentApi.getAssignmentMeta, // ✅ changed
  });

  const assignmentCategories = metaData?.assignmentCategories ?? [];
  const assignmentTypes = metaData?.assignmentTypes ?? [];

  useEffect(() => {
    if (assignmentCategories.length && !form.formState.dirtyFields.category) {
      if (!category) {
        setValue('category', assignmentCategories[0] as any, {
          shouldValidate: true,
          shouldDirty: false,
        });
      }
    }

    if (assignmentTypes.length && !form.formState.dirtyFields.assignmentType) {
      if (!type) {
        setValue('assignmentType', assignmentTypes[0] as any, {
          shouldValidate: true,
          shouldDirty: false,
        });
      }
    }
  }, [assignmentCategories, assignmentTypes, category, type, setValue]);

  return (
    <>
      <div className="rounded-2xl px-6 py-4 shadow">
        {/* HEADER */}
        <div className="mb-5 border-b border-[#8f9cb7]">
          <h3 className="font-medium text-[#101828]">Assignment Details</h3>
          <p className="text-sm text-[#667085] mb-6">
            Define the basic information for this Assignment.
          </p>
        </div>

        {/* FORM CONTENT */}
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {/* LEFT COLUMN */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div>
              <label className="text-[16px] font-medium">Assignment Name</label>
              <input
                {...register('title', { shouldUnregister: false })}
                placeholder="e.g. DSA Assignment – Week 3"
                className="w-full border-b border-[#C3CAD9] outline-none py-2"
              />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}

              <label className="text-sm font-medium mt-4 block">Description (Optional)</label>
              <input
                {...register('description')}
                placeholder="Enter description"
                className="w-full border-b border-[#C3CAD9] outline-none py-2"
              />
            </div>
          </div>

          {/* DIVIDER */}
          <div className="hidden lg:block border-r border-[#C3CAD9]"></div>
          <div className="block lg:hidden border-b border-[#C3CAD9] my-4"></div>

          {/* RIGHT COLUMN */}
          <div className="w-full lg:w-1/2">
            <label className="text-sm font-medium">Assignment Category</label>
            <div className="flex flex-wrap gap-3 mt-4">
              {assignmentCategories.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() =>
                    setValue('category', v as any, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  className={`px-4 py-1.5 rounded-full border text-[16px] font-light
                  ${
                    category === v
                      ? 'border-[#7C3AED] text-[#7C3AED] bg-[#F6F0FF]'
                      : 'border-[#C3CAD9] text-[#3D465C]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {category === v && <span>✓</span>}
                    {v}
                  </span>
                </button>
              ))}
            </div>

            <label className="text-sm font-medium mt-4 block">Assignment Type</label>

            <div className="flex flex-wrap gap-3 mt-4">
              {assignmentTypes.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() =>
                    setValue('assignmentType', v as any, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  className={`px-4 py-1.5 rounded-full border text-[16px] font-light
                  ${
                    type === v
                      ? 'border-purple-500 text-purple-600 bg-purple-50'
                      : 'border-gray-300 text-gray-500'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {type === v && <span>✓</span>}
                    {v}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-6">
        <button
          type="button"
          onClick={onNext}
          className="px-8 py-2 rounded-full !text-white
                     bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]"
        >
          Continue
        </button>

        <button type="button" onClick={onCancel} className="px-8 py-2 rounded-full border">
          Cancel
        </button>
      </div>
    </>
  );
}
