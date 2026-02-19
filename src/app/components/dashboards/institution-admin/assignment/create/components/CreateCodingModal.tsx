'use client';

import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import FormDropdown from '@/app/ui/FormDropdown';
import { assessmentApi } from '../../../assessment/assessment.service';
// import { assessmentApi } from '../../assessment.service';

const inputClass =
  'w-full h-[44px] px-3 rounded-lg border border-[#E5E7EB] text-sm placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#E9D5FF]';

const labelClass = 'text-sm font-medium text-[#344054] mb-1 block';

type Props = {
  assessmentId: string;
  meta: any;
  initialData?: any;
  mode?: 'create' | 'edit';
  onSave: () => void;
};

type CodingFormValues = {
  topic: string;
  title: string;
  problem_statement: string;
  constraints: string;
  timeLimit: string;
  input_format: string;
  output_format: string;
  points: number | string;
  difficulty: string;
  languages: string[];
  sample_test_cases: {
    input: string;
    output: string;
  }[];
};

export default function CreateCodingModal({
  meta,
  onSave,
  initialData,
  assessmentId,
  mode,
}: Props) {
  const { control, register, handleSubmit, setValue, watch } = useForm<CodingFormValues>({
    defaultValues: {
      sample_test_cases: [{ input: '', output: '' }],
      languages: [],
    },
  });

  const [mandatory, setMandatory] = useState(initialData?.is_mandatory ?? true);

  const topicOptions = meta?.topics?.map((t: string) => ({ label: t, value: t })) ?? [];

  const timeLimitOptions =
    meta?.timeLimits?.map((t: number) => ({
      label: `${t} second${t > 1 ? 's' : ''}`,
      value: String(t),
    })) ?? [];
  const languageOptions = meta?.languages?.map((l: string) => ({ label: l, value: l })) ?? [];
  const difficultyOptions = meta?.difficulties?.map((d: string) => ({ label: d, value: d })) ?? [];

  useEffect(() => {
    if (!initialData) return;

    setValue('topic', initialData.topic);
    setValue('title', initialData.problem_title);
    setValue('problem_statement', initialData.problem_statement);
    setValue('constraints', initialData.constraints);
    setValue('timeLimit', String(initialData.time_limit_minutes));
    setValue('input_format', initialData.input_format);
    setValue('output_format', initialData.output_format);
    setValue('points', initialData.points);
    setValue('difficulty', initialData.difficulty_level);
    setValue('languages', initialData.supported_languages ?? []);

    setValue(
      'sample_test_cases',
      initialData.sample_test_cases?.length
        ? initialData.sample_test_cases
        : [{ input: '', output: '' }]
    );
  }, [initialData, setValue]);

  const testCases = watch('sample_test_cases');
  const addTestCase = () => {
    setValue('sample_test_cases', [...(testCases || []), { input: '', output: '' }]);
  };

  const onSubmit = async (form: any) => {
    if (mode === 'edit' && initialData?.assessment_question_id) {
      const updatePayload = {
        type: 'coding' as const,
        topic: form.topic,
        difficulty_level: form.difficulty,
        points: Number(form.points),
        time_limit_minutes: Number(form.timeLimit),
        problem_title: form.title,
        problem_statement: form.problem_statement,
        constraints: form.constraints,
        input_format: form.input_format,
        output_format: form.output_format,
        supported_languages: form.languages ?? [],
        sample_test_cases: form.sample_test_cases,
      };

      await assessmentApi.updateQuestion(initialData.assessment_question_id, updatePayload);
    } else {
      const createPayload = {
        topic: form.topic,
        difficulty_level: form.difficulty,
        points: Number(form.points),
        time_limit_minutes: Number(form.timeLimit),
        problem_title: form.title,
        problem_statement: form.problem_statement,
        constraints: form.constraints,
        input_format: form.input_format,
        output_format: form.output_format,
        supported_languages: form.languages ?? [],
        sample_test_cases: form.sample_test_cases,

        is_mandatory: mandatory,
      };

      await assessmentApi.createCodingQuestion(assessmentId, createPayload);
    }

    onSave();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Select Topic */}
      <div className="w-1/3">
        <label className={labelClass}>
          Select Topic <span className="text-red-500">*</span>
        </label>
        <Controller
          name="topic"
          control={control}
          render={({ field }) => (
            <FormDropdown
              placeholder="Select Topic"
              value={field.value}
              onChange={field.onChange}
              options={topicOptions}
            />
          )}
        />
      </div>

      {/* Title + Mandatory */}
      <div className="flex items-center mb-1 justify-between">
        <label className={labelClass}>
          Problem Title <span className="text-red-500">*</span>
        </label>

        <div className="flex items-center gap-2">
          <span className="text-sm text-[#667085]">Mandatory</span>
          <button
            type="button"
            onClick={() => setMandatory(!mandatory)}
            className="relative h-6 w-11 rounded-full border border-[#D0D5DD] bg-[#F2F4F7]"
          >
            <span
              className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full transition ${
                mandatory ? 'translate-x-5 bg-[#7C3AED]' : 'bg-[#D0D5DD]'
              }`}
            />
          </button>
        </div>
      </div>

      <input {...register('title')} placeholder="ex. Two Sum" className={inputClass} />

      {/* Problem Statement */}
      <div>
        <label className={`${labelClass} mt-3`}>
          Problem Statement <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('problem_statement')}
          rows={4}
          placeholder="Write the full problem statement here. Describe the task clearly with context."
          className={`${inputClass} h-auto`}
        />
      </div>

      {/* Constraints + Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            Constraints <span className="text-red-500">*</span>
          </label>
          <input
            {...register('constraints')}
            placeholder="e.g. 1 ≤ N ≤ 10⁵, -10⁹ ≤ Ai ≤ 10⁹"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Time Limit <span className="text-red-500">*</span>
          </label>
          <Controller
            name="timeLimit"
            control={control}
            render={({ field }) => (
              <FormDropdown
                placeholder="Select time limit"
                value={field.value}
                onChange={field.onChange}
                options={timeLimitOptions}
              />
            )}
          />
        </div>
      </div>

      {/* Input / Output */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            Input Format <span className="text-red-500">*</span>
          </label>
          <input {...register('input_format')} placeholder="Enter Input" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>
            Output Format <span className="text-red-500">*</span>
          </label>
          <input {...register('output_format')} placeholder="Enter Output" className={inputClass} />
        </div>
      </div>

      {/* Sample Test Cases */}
      <div>
        <div className="flex justify-between mb-2">
          <label className={labelClass}>Sample Test Cases</label>
          <button
            type="button"
            onClick={addTestCase}
            className="text-sm px-3 py-1.5 rounded-full border border-[#7C3AED] text-[#7C3AED]"
          >
            Add Another Test Case
          </button>
        </div>

        {testCases?.map((_, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <input
              {...register(`sample_test_cases.${index}.input`)}
              placeholder="Enter Input"
              className={inputClass}
            />
            <input
              {...register(`sample_test_cases.${index}.output`)}
              placeholder="Enter Output"
              className={inputClass}
            />
          </div>
        ))}
      </div>

      {/* Language Support */}
      <div>
        <label className={labelClass}>Language Support</label>
        <Controller
          name="languages"
          control={control}
          render={({ field }) => (
            <FormDropdown
              placeholder="Select languages"
              value={field.value}
              onChange={field.onChange}
              options={languageOptions}
              multiple
            />
          )}
        />
      </div>

      {/* Marks + Difficulty */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Marks</label>
          <input {...register('points')} placeholder="10" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Difficulty</label>
          <Controller
            name="difficulty"
            control={control}
            render={({ field }) => (
              <FormDropdown
                placeholder="Easy"
                value={field.value}
                onChange={field.onChange}
                options={difficultyOptions}
              />
            )}
          />
        </div>
      </div>
      {/* ✅ FOOTER (FUNCTIONAL & FIGMA MATCHED) */}
      <div className="flex justify-end gap-3 pt-6 border-t border-[#EAECF0]">
        <button
          type="submit"
          className="rounded-full bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] px-5 py-2 text-sm !text-white"
        >
          Save Question
        </button>

        <button
          type="button"
          onClick={onSave}
          className="rounded-full border border-[#BE83DF] px-5 py-2 text-sm !text-[#BE83DF]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
