import { Controller, UseFormReturn } from 'react-hook-form';
import { CreateAssessmentForm } from '../schema';
import FormDropdown from '@/app/ui/FormDropdown';
import { useQuery } from '@tanstack/react-query';
import { assessmentApi } from '../../assessment.service';
import { useEffect, useMemo } from 'react';

type Props = {
  form: UseFormReturn<CreateAssessmentForm>;
  onBack: () => void;
  onNext: () => void;
  onCancel: () => void;
};

type AssessmentBatch = {
  id: number;
  name: string;
  academicYear: number;
  semester: number | null;
};

type AssessmentDepartment = {
  id: number;
  name: string;
  batches: AssessmentBatch[];
};

type AssessmentCategory = {
  id: number;
  name: string;
  departments: AssessmentDepartment[];
};

type AssessmentMetaResponse = {
  institutionCategories: AssessmentCategory[];
};

export default function StepTwo({ form, onBack, onNext, onCancel }: Props) {
  const {
    setValue,
    watch,
    control,
    formState: { errors },
  } = form;

  const selectedCategory = watch('institutionCategory');
  const selectedDepartment = watch('department');

  /* ---------------- Meta API ---------------- */
  const { data: institutionMeta } = useQuery<AssessmentMetaResponse>({
    queryKey: ['assignAudience-meta'],
    queryFn: assessmentApi.getInstitutionMeta,
  });

  const institutionCategories: AssessmentCategory[] = institutionMeta?.institutionCategories ?? [];

  /* ---------------- Derived Data ---------------- */
  const departments = useMemo<AssessmentDepartment[]>(() => {
    return institutionCategories.find((c) => c.name === selectedCategory)?.departments ?? [];
  }, [institutionCategories, selectedCategory]);

  const batches = useMemo<AssessmentBatch[]>(() => {
    return departments.find((d) => d.name === selectedDepartment)?.batches ?? [];
  }, [departments, selectedDepartment]);

  useEffect(() => {
    setValue('department', '', { shouldDirty: true });
    setValue('batches', [], { shouldDirty: true });
  }, [selectedCategory, setValue]);

  useEffect(() => {
    setValue('batches', [], { shouldDirty: true });
  }, [selectedDepartment, setValue]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h3 className="font-medium text-[#101828]">Assign Assignment To</h3>
      <p className="text-sm text-[#667085] mb-6">Choose who this assignment will be assigned to</p>

      <label className="text-sm font-medium">Institution Category</label>
      <div className="flex gap-3 mt-2">
        {institutionCategories.map((c) => {
          const selected = selectedCategory === c.name;

          return (
            <button
              key={c.id}
              type="button"
              onClick={() =>
                setValue('institutionCategory', c.name as any, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              className={`px-4 py-1.5 rounded-full border text-[16px] font-light
                ${
                  selected
                    ? 'border-[#7C3AED] !text-[#7C3AED] bg-[#F6F0FF]'
                    : 'border-[#D0D5DD] !text-[#3D465C]'
                }`}
            >
              <span className="flex items-center gap-2">
                {selected && <span>✓</span>}
                {c.name}
              </span>
            </button>
          );
        })}
      </div>
      {errors.institutionCategory && (
        <p className="text-xs text-red-500 mt-1">{errors.institutionCategory.message as string}</p>
      )}

      <label className="text-sm font-medium mt-4 block">Department</label>

      {!selectedCategory && (
        <p className="text-sm  !text-[#7C3AED] bg-amber-50  py-2 ">Select category first</p>
      )}

      <div className="flex gap-3 mt-2">
        {departments.map((d) => {
          const selected = selectedDepartment === d.name;

          return (
            <button
              key={d.id}
              type="button"
              onClick={() =>
                setValue('department', d.name as any, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              className={`px-4 py-1.5 rounded-full border text-[16px] font-light
                  ${
                    selected
                      ? 'border-[#7C3AED] !text-[#7C3AED] bg-[#F6F0FF]'
                      : 'border-[#D0D5DD] !text-[#3D465C]'
                  }`}
            >
              <span className="flex items-center gap-2">
                {selected && <span>✓</span>}
                {d.name}
              </span>
            </button>
          );
        })}
      </div>
      {errors.department && (
        <p className="text-xs text-red-500 mt-1">{errors.department.message as string}</p>
      )}

      <label className="text-sm font-medium mt-4 block">Select Batch</label>

      {/* <Controller
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
      /> */}
      <Controller
        name="batches"
        control={control}
        render={({ field }) => (
          <div title={!selectedDepartment ? 'Select department first' : ''}>
            <FormDropdown
              placeholder="Select Batch"
              options={batches.map((b: AssessmentBatch) => ({
                label: b.name,
                value: String(b.id),
              }))}
              value={field.value}
              onChange={field.onChange}
              multiple
              renderChips
              // disabled={!selectedDepartment}
            />
          </div>
        )}
      />

      {errors.batches && (
        <p className="text-xs text-red-500 mt-1">{errors.batches.message as string}</p>
      )}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onBack}
          className="sm:px-6 px-2  py-2 rounded-full border broder-[#7C3AED] !text-[#7C3AED]"
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
