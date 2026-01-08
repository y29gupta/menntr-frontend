import { Controller, UseFormReturn } from 'react-hook-form';
import { CreateAssessmentForm } from '../schema';
import FormDropdown from '@/app/ui/FormDropdown';

type Props = {
  form: UseFormReturn<CreateAssessmentForm>;
  onBack: () => void;
  onNext: () => void;
  onCancel: () => void;
};

const batchOptions = [
  {
    label: 'CSE - 2022–2026 (A)',
    value: 'cse-2022-2026-a',
  },
  {
    label: 'ECE - 2022–2026 (E)',
    value: 'ece-2022-2026-e',
  },
];

export default function StepTwo({ form, onBack, onNext, onCancel }: Props) {
  const { setValue, watch, register } = form;

  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h3 className="font-medium text-[#101828]">Assign Assignment To</h3>
      <p className="text-sm text-[#667085] mb-6">Choose who this assignment will be assigned to</p>

      <label className="text-sm font-medium">Institution Category</label>
      <div className="flex gap-3 mt-2">
        {['Engineering', 'Management', 'Agriculture'].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setValue('institutionCategory', v as any)}
            className={`px-4 py-1.5 rounded-full border text-sm
                ${
                  watch('institutionCategory') === v
                    ? 'border-[#7C3AED] text-[#7C3AED]'
                    : 'border-[#D0D5DD]'
                }`}
          >
            {v}
          </button>
        ))}
      </div>

      <label className="text-sm font-medium mt-4 block">Department</label>
      <div className="flex gap-3 mt-2">
        {['CSE', 'Mech', 'Civil'].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setValue('department', v as any)}
            className={`px-4 py-1.5 rounded-full border text-sm
              ${
                watch('department') === v ? 'border-[#7C3AED] text-[#7C3AED]' : 'border-[#D0D5DD]'
              }`}
          >
            {v}
          </button>
        ))}
      </div>

      <label className="text-sm font-medium mt-4 block">Select Batch</label>

      <Controller
        name="batches"
        control={form.control}
        render={({ field }) => (
          <FormDropdown
            placeholder="Select Batch"
            options={batchOptions}
            value={field.value}
            onChange={field.onChange}
            multiple
            renderChips
          />
        )}
      />
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 rounded-full border broder-[#7C3AED] !text-[#7C3AED]"
        >
          Go Back
        </button>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onNext}
            className="px-6 py-2 rounded-full !text-white bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]"
          >
            Continue
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 broder-[#7C3AED] !text-[#7C3AED] rounded-full border"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
