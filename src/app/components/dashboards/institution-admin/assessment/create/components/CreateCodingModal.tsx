'use client';

import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import FormDropdown from '@/app/ui/FormDropdown';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { assessmentApi } from '../../assessment.service';
import {
  CodingQuestionMetaResponse,
  CreateCodingQuestionPayload,
  UpdateCodingQuestionPayload,
} from '../../assessment.types';

const problemSchema = z.object({
  topic: z.string().min(1, 'Topic is required'),
  title: z.string().min(1, 'Problem title is required'),
  statement: z.string().min(1, 'Problem statement is required'),
  constraints: z.string().min(1, 'Constraints are required'),
  timeLimit: z.string().min(1, 'Time limit is required'),
  inputFormat: z.string().min(1, 'Input format is required'),
  outputFormat: z.string().min(1, 'Output format is required'),
  testCases: z
    .array(
      z.object({
        input: z.string().min(1, 'Input is required'),
        output: z.string().min(1, 'Output is required'),
      })
    )
    .min(1, 'At least one test case is required'),
  languages: z.array(z.string()).min(1, 'Select at least one language'),
  marks: z.string().min(1, 'Marks are required'),
  difficulty: z.string().min(1, 'Difficulty is required'),
});

type ProblemFormValues = z.infer<typeof problemSchema>;

/* =======================
   Modal (UNCHANGED)
======================= */
function Modal({ isOpen, onClose, title, subtitle, children, footer, visible }: any) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      <div className="absolute inset-0 bg-white/70" onClick={onClose} />

      <div
        className={`
          absolute right-0 top-0 h-full w-full max-w-[620px] flex flex-col
          bg-white shadow-[-4px_0px_16px_0px_#0F172A26]
          transform transition-transform duration-300 ease-in-out
          ${visible ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="border-b border-gray-200 p-4 flex items-start justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
          <X className="cursor-pointer text-[#667085]" onClick={onClose} />
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</div>
        <div className="bg-white p-4 sm:p-6 flex-shrink-0">{footer}</div>
      </div>
    </div>,
    document.body
  );
}

/* =======================
   Reusable Fields (UNCHANGED)
======================= */
function FormField({ label, required, error, children, className = '' }: any) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700 block mb-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function TextInput({ placeholder, register, ...props }: any) {
  return (
    <input
      {...register}
      placeholder={placeholder}
      className="w-full h-10 border-b border-gray-300 text-sm focus:outline-none focus:border-purple-500"
      {...props}
    />
  );
}

function TextArea({ placeholder, register, rows = 4, ...props }: any) {
  return (
    <textarea
      {...register}
      placeholder={placeholder}
      rows={rows}
      className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-purple-500 resize-none"
      {...props}
    />
  );
}

/* =======================
   Main Component
======================= */

type CreateCodingModalProps = {
  onClose: () => void;
  onSubmit: (data: ProblemFormValues) => void;
  initialData?: any;
  mode?: 'create' | 'edit';
  meta?: CodingQuestionMetaResponse;
};

export default function CreateCodingModal({
  onClose,
  onSubmit: onSubmitCallback,
  initialData = null,
  mode = 'create',
  meta,
  assessmentId,
}: any) {
  const [mandatory, setMandatory] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  console.log(initialData, 'edit coding');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const rafId = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(rafId);
  }, [mounted]);

  /* =======================
     API META (LOGIC ONLY)
  ======================= */

  // const { data: meta } = useQuery<CodingQuestionMetaResponse>({
  //   queryKey: ['coding-question-meta'],
  //   queryFn: assessmentApi.getCodingQuestionMeta,
  //   staleTime: Infinity,
  // });

  console.log(meta, 'coding meta');
  const topicOptions = meta?.topics.map((t: any) => ({ label: t, value: t })) ?? [];

  const timeLimitOptions =
    meta?.timeLimits.map((t: number) => ({
      label: `${t} second${t > 1 ? 's' : ''}`,
      value: String(t),
    })) ?? [];

  const languageOptions =
    meta?.languages.map((l: string) => ({
      label: l,
      value: l.toLowerCase(),
    })) ?? [];

  const difficultyOptions =
    meta?.difficulties.map((d: string) => ({
      label: d.charAt(0).toUpperCase() + d.slice(1),
      value: d,
    })) ?? [];

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProblemFormValues>({
    resolver: zodResolver(problemSchema),
    defaultValues: initialData || {
      testCases: [{ input: '', output: '' }],
      languages: [],
    },
  });

  // useEffect(() => {
  //   if (!initialData) return;

  //   Object.entries(initialData).forEach(([key, value]) => {
  //     setValue(key as any, value, { shouldValidate: true });
  //   });
  // }, [initialData, setValue]);

  useEffect(() => {
    if (!initialData) return;

    setValue('topic', initialData.topic);
    setValue('title', initialData.problem_title);
    setValue('statement', initialData.problem_statement);
    setValue('constraints', initialData.constraints);
    setValue('timeLimit', String(initialData.time_limit_minutes));
    setValue('inputFormat', initialData.input_format);
    setValue('outputFormat', initialData.output_format);

    setValue(
      'testCases',
      initialData.sample_test_cases?.map((tc: any) => ({
        input: tc.input,
        output: tc.output,
      })) || []
    );

    setValue(
      'languages',
      initialData.supported_languages?.map((l: string) => l.toLowerCase()) || []
    );

    setValue('marks', String(initialData.points));
    setValue('difficulty', initialData.difficulty_level);
  }, [initialData, setValue]);

  const testCases = watch('testCases');

  const addTestCase = () => {
    setValue('testCases', [...testCases, { input: '', output: '' }]);
  };

  const removeTestCase = (index: number) => {
    if (testCases.length > 1) {
      setValue(
        'testCases',
        testCases.filter((_, i) => i !== index)
      );
    }
  };

  // const onSubmit = (data: ProblemFormValues) => {
  //   onSubmitCallback?.(data);
  // };

  const updateQuestionMutation = useMutation({
    mutationFn: (payload: UpdateCodingQuestionPayload) =>
      assessmentApi.updateQuestion(initialData.assessment_question_id, payload),
  });

  const createQuestionMutation = useMutation({
    mutationFn: (payload: CreateCodingQuestionPayload) =>
      assessmentApi.createCodingQuestion(assessmentId, payload),
  });

  // const onSubmit = (data: ProblemFormValues) => {
  //   const payload: UpdateCodingQuestionPayload = {
  //     type: 'coding',
  //     topic: data.topic,
  //     difficulty_level: data.difficulty,
  //     points: Number(data.marks),
  //     time_limit_minutes: Number(data.timeLimit),
  //     problem_title: data.title,
  //     problem_statement: data.statement,
  //     constraints: data.constraints,
  //     input_format: data.inputFormat,
  //     output_format: data.outputFormat,
  //     supported_languages: data.languages.map((l) => l.toUpperCase()),
  //     sample_test_cases: data.testCases,
  //   };

  //   if (mode === 'edit' && initialData?.assessment_question_id) {
  //     updateQuestionMutation.mutate(payload, {
  //       onSuccess: () => {
  //         onSubmitCallback(payload);
  //         onClose();
  //       },
  //     });
  //   } else {
  //     onSubmitCallback(payload); // existing create flow
  //   }
  // };

  const onSubmit = (data: ProblemFormValues) => {
    if (mode === 'edit' && initialData?.assessment_question_id) {
      const payload: UpdateCodingQuestionPayload = {
        type: 'coding',
        topic: data.topic,
        difficulty_level: data.difficulty,
        points: Number(data.marks),
        time_limit_minutes: Number(data.timeLimit),
        problem_title: data.title,
        problem_statement: data.statement,
        constraints: data.constraints,
        input_format: data.inputFormat,
        output_format: data.outputFormat,
        supported_languages: data.languages.map((l) => l.toUpperCase()),
        sample_test_cases: data.testCases,
      };

      updateQuestionMutation.mutate(payload, {
        onSuccess: () => {
          onSubmitCallback(payload);
          onClose();
        },
      });
    } else {
      /* =======================
         CREATE FLOW (⭐ ADDED)
      ======================= */
      const payload: CreateCodingQuestionPayload = {
        topic: data.topic,
        difficulty_level: data.difficulty,
        points: Number(data.marks),
        time_limit_minutes: Number(data.timeLimit),
        problem_title: data.title,
        problem_statement: data.statement,
        constraints: data.constraints,
        input_format: data.inputFormat,
        output_format: data.outputFormat,
        supported_languages: data.languages.map((l) => l.toUpperCase()),
        sample_test_cases: data.testCases,
        is_mandatory: mandatory,
      };
      console.log(payload, 'coding payload');

      createQuestionMutation.mutate(payload, {
        onSuccess: () => {
          onSubmitCallback(payload);
          onClose();
        },
      });
    }
  };
  if (!mounted) return null;

  return (
    <Modal
      isOpen
      visible={visible}
      onClose={onClose}
      title="Add a programming problem for this assessment"
      subtitle="Add a question to Aptitude Mock – Jan 2025"
      footer={
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="w-full sm:w-auto px-6 py-2 rounded-full text-sm font-medium text-white! bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] order-1 sm:order-2"
          >
            {mode === 'edit' ? 'Update Question' : 'Save Question'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-full text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 order-2 sm:order-1"
          >
            Cancel
          </button>
        </div>
      }
    >
      {/* === FROM HERE DOWN: 100% UNCHANGED UI === */}

      {/* Select Topic */}
      <div className="space-y-6">
        <div className="w-1/3">
          <FormField error={errors.topic?.message}>
            <div className="h-10">
              <Controller
                name="topic"
                control={control}
                render={({ field }) => (
                  <FormDropdown
                    placeholder="Select Topic"
                    value={field.value}
                    onChange={field.onChange}
                    options={topicOptions}
                    searchable
                  />
                )}
              />
            </div>
          </FormField>
        </div>

        {/* Problem Title */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Problem Title <span className="text-red-500">*</span>
          </label>

          <div className="flex items-center gap-2">
            <span className="text-sm text-[#667085]">Mandatory</span>
            <button
              type="button"
              onClick={() => setMandatory(!mandatory)}
              className="relative h-6 w-11 border border-[#BE83DF] rounded-full bg-[#F2F4F7]"
            >
              <span
                className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full transition-all ${
                  mandatory
                    ? 'translate-x-4 bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]'
                    : 'translate-x-0 bg-[#D0D5DD]'
                }`}
              />
            </button>
          </div>
        </div>

        <FormField error={errors.title?.message}>
          <TextInput placeholder="ex. Two Sum" register={register('title')} />
        </FormField>

        <FormField label="Problem Statement" required error={errors.statement?.message}>
          <TextArea
            placeholder="Write the full problem statement here. Describe the task clearly with context."
            register={register('statement')}
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Constraints" required error={errors.constraints?.message}>
            <TextInput placeholder="e.g. 1 ≤ N ≤ 10⁵" register={register('constraints')} />
          </FormField>

          <FormField label="Time Limit" required error={errors.timeLimit?.message}>
            <div className="h-10">
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
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Input Format" required error={errors.inputFormat?.message}>
            <TextInput placeholder="Enter input" register={register('inputFormat')} />
          </FormField>

          <FormField label="Output Format" required error={errors.outputFormat?.message}>
            <TextInput placeholder="Enter Output" register={register('outputFormat')} />
          </FormField>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
            <label className="text-sm font-medium text-gray-700">Sample Test Cases</label>
            <button
              type="button"
              onClick={addTestCase}
              className="text-sm font-medium text-purple-600! hover:text-purple-700! border border-purple-600 rounded-2xl px-3 py-1.5"
            >
              Add Another Test Case
            </button>
          </div>

          <div className="space-y-4">
            {testCases.map((_, index) => (
              <div key={index} className="relative border border-gray-200 rounded-lg p-3 sm:p-4">
                {testCases.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTestCase(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Input</label>
                    <input
                      {...register(`testCases.${index}.input` as const)}
                      placeholder="Enter input"
                      className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Output</label>
                    <input
                      {...register(`testCases.${index}.output` as const)}
                      placeholder="Enter output"
                      className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <FormField label="Language Support" error={errors.languages?.message}>
          <div className="h-10">
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
                  searchable
                  renderChips
                />
              )}
            />
          </div>
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Marks" error={errors.marks?.message}>
            <TextInput placeholder="10" type="number" register={register('marks')} />
          </FormField>

          <FormField label="Difficulty" error={errors.difficulty?.message}>
            <div className="h-10">
              <Controller
                name="difficulty"
                control={control}
                render={({ field }) => (
                  <FormDropdown
                    placeholder="Select difficulty"
                    value={field.value}
                    onChange={field.onChange}
                    options={difficultyOptions}
                  />
                )}
              />
            </div>
          </FormField>
        </div>
      </div>
    </Modal>
  );
}
