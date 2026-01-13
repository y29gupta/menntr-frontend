import { UseFormReturn } from 'react-hook-form';
import { CreateAssessmentForm } from '../schema';
import { useQuery } from '@tanstack/react-query';
import { assessmentApi } from '../../assessment.service';
import { useEffect } from 'react';

type Props = {
  form: UseFormReturn<CreateAssessmentForm>;
  onNext: () => void;
  onCancel: () => void;
};

export default function StepOne({ form, onNext, onCancel }: Props) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const category = watch('category');
  const type = watch('AssessmentType');
  const questionType = watch('questionType');

  const { data: metaData } = useQuery({
    queryKey: ['assessment-meta'],
    queryFn: assessmentApi.getAssessmentMeta,
  });
  const assessmentCategories = metaData?.assessmentCategories ?? [];
  const assessmentTypes = metaData?.assessmentTypes ?? [];
  const questionTypes = metaData?.questionTypes ?? [];

  useEffect(() => {
    if (assessmentCategories.length && !category) {
      setValue('category', assessmentCategories[0] as any, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    if (assessmentTypes.length && !type) {
      setValue('AssessmentType', assessmentTypes[0] as any, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    if (questionTypes.length && !questionType) {
      setValue('questionType', questionTypes[0] as any, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [
    assessmentCategories,
    assessmentTypes,
    questionTypes,
    category,
    type,
    questionType,
    setValue,
  ]);

  return (
    <div className="bg-white  rounded-2xl px-6 shadow">
      <div className=" mb-5 border-b border-[#C3CAD9]  ">
        <h3 className="font-medium text-[#101828]">Assessment Details</h3>
        <p className="text-sm text-[#667085] mb-6">
          Define the basic information for this Assessment.
        </p>
      </div>
      {/* <div className="border border-[#C3CAD9] w-full"></div> */}
      <div className="flex space-x-[24px]   w-full">
        <div className="flex  flex-1  flex-col gap-6">
          <div className="">
            <label className="text-[16px] font-medium ">Assessment Name</label>
            <input
              {...register('title', { shouldUnregister: false })}
              placeholder="e.g. DSA Assessment – Week 3"
              className="w-full pt-2 border-b border-[#C3CAD9] outline-none py-2"
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}

            <label className="text-sm font-medium mt-4 block">Description (Optional)</label>
            <input
              {...register('description')}
              placeholder="Enter description"
              className="w-full border-b border-[#C3CAD9] outline-none py-2"
            />
          </div>
          <label className="text-sm font-medium block mt-6">Assessment Question Type</label>
          <div className="flex gap-3 mt-2">
            {questionTypes.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() =>
                  setValue('questionType', v as any, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                className={`px-4 py-1.5 rounded-full border text-[16px] !text-[#3D465C] font-light
        ${
          questionType === v
            ? 'border-[#7C3AED] !text-[#7C3AED] bg-[#F6F0FF]'
            : 'border-gray-300 text-gray-500'
        }`}
              >
                <span className="flex items-center gap-2">
                  {questionType === v && <span>✓</span>}
                  {v}
                </span>
              </button>
            ))}
          </div>
          {errors.questionType && (
            <p className="text-xs text-red-500 mt-1">{errors.questionType.message}</p>
          )}
        </div>
        <div className="border-r border-[#C3CAD9] "></div>
        <div className="w-full max-w-2/4 ">
          <label className="text-sm font-medium">Assessment Category</label>
          <div className="flex gap-3 mt-4">
            {assessmentCategories.map((v) => (
              <button
                type="button"
                key={v}
                onClick={() =>
                  setValue('category', v as any, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                className={`px-4 py-1.5 rounded-full border text-[16px] !text-[#3D465C] font-light
        ${
          category === v
            ? 'border-[#7C3AED] !text-[#7C3AED] bg-[#F6F0FF]'
            : 'border-[#C3CAD9] !text-[#3D465C] '
        }`}
              >
                <span className="flex items-center gap-2">
                  {category === v && <span>✓</span>}
                  {v}
                </span>
              </button>
            ))}
          </div>

          <label className="text-sm font-medium mt-4 block">Assessment Type</label>
          <div className="flex gap-3 mt-4">
            {assessmentTypes.map((v) => (
              <button
                type="button"
                key={v}
                onClick={() =>
                  setValue('AssessmentType', v as any, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                className={`px-4 py-1.5 rounded-full border text-[16px] !text-[#3D465C] font-light
        ${
          type === v
            ? 'border-purple-500 !text-purple-600 bg-purple-50'
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
      <div className="border-b mt-2 border-[#C3CAD9] w-full"></div>

      <div className="flex justify-center gap-3 mb-2 mt-3">
        <button
          type="button"
          onClick={onNext}
          className="px-8 py-2 rounded-full !text-white bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]"
        >
          Continue
        </button>
        <button type="button" onClick={onCancel} className="px-8 py-2 rounded-full border">
          Cancel
        </button>
      </div>
    </div>
  );
}
