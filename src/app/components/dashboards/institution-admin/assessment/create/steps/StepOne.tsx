import { UseFormReturn } from 'react-hook-form';
import { CreateAssessmentForm } from '../schema';

type Props = {
  form: UseFormReturn<CreateAssessmentForm>;
  onNext: () => void;
  onCancel: () => void;
};

export default function StepOne({ form, onNext, onCancel }: Props) {
  const { register, setValue, watch } = form;

  const category = watch('category');
  const type = watch('AssessmentType');
  const questionType = watch('questionType');

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
              {...register('AssessmentName')}
              placeholder="e.g. DSA Assessment – Week 3"
              className="w-full pt-2 border-b border-[#C3CAD9] outline-none py-2"
            />

            <label className="text-sm font-medium mt-4 block">Description (Optional)</label>
            <input
              {...register('description')}
              placeholder="Enter description"
              className="w-full border-b border-[#C3CAD9] outline-none py-2"
            />
          </div>
          <label className="text-sm font-medium block mt-6">Assessment Question Type</label>
          <div className="flex gap-3 mt-2">
            {['MCQ', 'Coding'].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setValue('questionType', v as any)}
                className={`px-4 py-1.5 rounded-full border text-sm
              ${questionType === v ? 'border-[#7C3AED] text-[#7C3AED]' : 'border-[#D0D5DD]'}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <div className="border-r border-[#C3CAD9] "></div>
        <div className="w-full max-w-2/4 ">
          <label className="text-sm font-medium">Assessment Category</label>
          <div className="flex gap-3 mt-4">
            {['Aptitude', 'Domain'].map((v) => (
              <button
                type="button"
                key={v}
                onClick={() => setValue('category', v as any)}
                className={`px-4 py-1.5 rounded-full border text-sm
                  ${category === v ? 'border-[#7C3AED] text-[#7C3AED]' : 'border-[#D0D5DD]'}`}
              >
                {v}
              </button>
            ))}
          </div>

          <label className="text-sm font-medium mt-4 block">Assessment Type</label>
          <div className="flex gap-3 mt-4">
            {['Practice', 'Assignment', 'Mock Test'].map((v) => (
              <button
                type="button"
                key={v}
                onClick={() => setValue('AssessmentType', v as any)}
                className={`px-4 py-1.5 rounded-full border text-sm
                  ${type === v ? 'border-[#7C3AED] text-[#7C3AED]' : 'border-[#D0D5DD]'}`}
              >
                {v === 'Graded' ? 'Graded Assessment' : v}
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
          className="px-8 py-2 rounded-full text-white bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]"
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
