'use client';

import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormDropdown from '@/app/ui/FormDropdown';
import { useMutation } from '@tanstack/react-query';
import { mcqMetaResponse, UpdateMCQQuestionPayload } from '../../../assessment/assessment.types';
import { CreateMCQFormValues, createMCQSchema } from '../../../assessment/create/schema';
import { assessmentApi } from '../../../assessment/assessment.service';
import { assignmentApi } from '../../assignment.service';

type Option = {
  id: string;
  text: string;
  correct: boolean;
};

type Props = {
  assignmentId: string;
  meta: mcqMetaResponse;
  initialData?: any;
  mode?: 'create' | 'edit';
  onSave: () => void;
  onSaveAndNext: () => void;
};

export default function CreateMCQModal({
  assignmentId,
  meta,
  initialData,
  mode = 'create',
  onSave,
  onSaveAndNext,
}: Props) {
  const [question, setQuestion] = useState('');
  const [mandatory, setMandatory] = useState(true);
  const [marks, setMarks] = useState(1);
  const [options, setOptions] = useState<Option[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [questionType, setQuestionType] = useState('');

  const { control, handleSubmit, setValue, reset } = useForm<CreateMCQFormValues>({
    resolver: zodResolver(createMCQSchema),
    defaultValues: {
      topic: '',
      questionType: '',
      difficulty: 'easy',
      options: [],
    },
  });

  /* ---------------- EDIT MODE ---------------- */
  // useEffect(() => {
  //   if (!initialData) return;

  //   setQuestion(initialData.question_text);
  //   setMarks(initialData.points);
  //   setMandatory(initialData.is_mandatory ?? true);

  //   setValue('topic', initialData.topic);
  //   setValue('difficulty', initialData.difficulty_level);
  //   setValue('questionType', initialData.question_type);

  //   setOptions(
  //     initialData.options.map((o: any) => ({
  //       id: o.id,
  //       text: o.option_text,
  //       correct: o.is_correct,
  //     }))
  //   );

  //   setQuestionType(normalizeQuestionType(initialData.question_type));
  //   setShowOptions(true);
  // }, [initialData, setValue]);

  useEffect(() => {
    if (!initialData) return;
    if (!Array.isArray(initialData.options)) return;

    setQuestion(initialData.question_text);
    setMarks(initialData.points);
    setMandatory(initialData.is_mandatory ?? true);

    setValue('topic', initialData.topic);
    setValue('difficulty', initialData.difficulty_level);
    setValue('questionType', initialData.question_type);

    setOptions(
      initialData.options.map((o: any) => ({
        id: o.id,
        text: o.option_text,
        correct: o.is_correct,
      }))
    );

    setQuestionType(normalizeQuestionType(initialData.question_type));
    setShowOptions(true);
  }, [initialData, setValue]);

  useEffect(() => {
    setValue('options', options as any, { shouldValidate: true });
  }, [options, setValue]);

  const normalizeQuestionType = (type: string) => {
    if (type === 'single_correct') return 'single';
    if (type === 'multiple_correct') return 'multiple';
    if (type === 'true_false') return 'boolean';
    return '';
  };

  const buildPayload = (data: CreateMCQFormValues): UpdateMCQQuestionPayload => ({
    topic: data.topic,
    question_text: question,
    question_type: data.questionType,
    difficulty_level: data.difficulty,
    points: marks,
    is_mandatory: mandatory,
    options: options.map((o) => ({
      option_text: o.text,
      is_correct: o.correct,
    })),
  });
  const createMutation = useMutation({
    mutationFn: (payload: any) => assignmentApi.createAssignmentMCQQuestion(assignmentId, payload),
  });

  const updateMutation = useMutation({
    mutationFn: (payload: any) =>
      assignmentApi.updateAssignmentMCQQuestion(
        assignmentId,
        initialData?.assessment_question_id || initialData?.id,
        payload
      ),
  });

  const topicOptions = meta?.topics.map((t) => ({ label: t, value: t })) ?? [];
  const questionTypeOptions =
    meta?.questionTypes.map((q) => ({
      label: q.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      value: q,
    })) ?? [];
  const difficultyOptions =
    meta?.difficulties.map((d) => ({
      label: d.charAt(0).toUpperCase() + d.slice(1),
      value: d,
    })) ?? [];

  /* ---------------- ADD OPTION RULES ---------------- */
  const isQuestionTypeSelected = Boolean(questionType);
  const isTrueFalse = questionType === 'boolean';
  const disableAddOption = !isQuestionTypeSelected || (isTrueFalse && options.length >= 2);

  return (
    <div className="flex flex-col h-full">
      {/* BODY */}
      {/* <div className="space-y-6"> */}
      {/* BODY */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-1">
        {/* Dropdowns */}
        <div className="flex gap-3">
          <div className="w-[180px]">
            <Controller
              name="topic"
              control={control}
              render={({ field }) => (
                <FormDropdown
                  value={field.value}
                  placeholder="Select Topic"
                  options={topicOptions}
                  onChange={field.onChange}
                  dropdownPosition="auto"
                  triggerClassName="border-2 border-[#D0D5DD] rounded-lg px-3 py-2"
                />
              )}
            />
          </div>

          <div className="w-[200px]">
            <Controller
              name="questionType"
              control={control}
              render={({ field }) => (
                <FormDropdown
                  value={field.value}
                  placeholder="Question Type"
                  options={questionTypeOptions}
                  onChange={(val) => {
                    const apiValue = Array.isArray(val) ? val[0] : val;
                    field.onChange(apiValue);
                    setQuestionType(normalizeQuestionType(apiValue));
                    setOptions([]);
                    setShowOptions(false);
                  }}
                  dropdownPosition="auto"
                  triggerClassName="border-2 border-[#D0D5DD] rounded-lg px-3 py-2"
                />
              )}
            />
          </div>
        </div>

        {/* Question */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-[#101828]">Question*</label>
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

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question here..."
            className="w-full rounded-2xl border border-[#D0D5DD] p-4 text-sm"
          />
        </div>

        {/* Options */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-medium text-[#101828]">Add Options</h4>

            <button
              type="button"
              disabled={disableAddOption}
              onClick={() => {
                if (disableAddOption) return;
                setShowOptions(true);
                setOptions((prev) => [
                  ...prev,
                  { id: crypto.randomUUID(), text: '', correct: false },
                ]);
              }}
              className={`flex items-center gap-1 rounded-full border border-[#BE83DF] px-3 py-2 text-sm !text-[#BE83DF]
                ${disableAddOption ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <Plus size={14} /> Add Options
            </button>
          </div>

          <div className="space-y-3">
            {showOptions &&
              options.map((opt, i) => (
                <div key={opt.id} className="flex items-center gap-3">
                  {/* ✅ OLD CHECKBOX (UNCHANGED) */}
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={opt.correct}
                      onChange={() =>
                        setOptions((prev) =>
                          questionType === 'multiple'
                            ? prev.map((o) => (o.id === opt.id ? { ...o, correct: !o.correct } : o))
                            : prev.map((o) => ({
                                ...o,
                                correct: o.id === opt.id,
                              }))
                        )
                      }
                      className="peer hidden"
                    />

                    <span
                      className="
      w-5 h-5
      border border-gray-400
      rounded
      flex items-center justify-center
      peer-checked:bg-[#008E2D]
      peer-checked:border-green-500
    "
                    >
                      <svg
                        className="opacity-0 peer-checked:opacity-100 w-4 h-4"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth={3}
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </label>

                  <span className="text-sm">Option {i + 1}</span>

                  <input
                    value={opt.text}
                    onChange={(e) =>
                      setOptions((prev) =>
                        prev.map((o) => (o.id === opt.id ? { ...o, text: e.target.value } : o))
                      )
                    }
                    placeholder="Type your option here..."
                    className="flex-1 rounded-2xl border border-[#D0D5DD] p-4 text-sm"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Marks & Difficulty */}
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium">Marks</label>
            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(+e.target.value)}
              className="w-full rounded-lg border border-[#D0D5DD] px-3 py-2 text-sm"
            />
          </div>

          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium">Difficulty</label>
            <Controller
              name="difficulty"
              control={control}
              render={({ field }) => (
                <FormDropdown
                  value={field.value}
                  placeholder="Difficulty"
                  options={difficultyOptions}
                  onChange={field.onChange}
                  dropdownPosition="auto"
                  triggerClassName="border border-[#D0D5DD] rounded-lg px-3 py-2"
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-6 border-t pt-6 flex justify-between">
        <button
          onClick={onSave}
          className="rounded-full border border-[#BE83DF] px-5 py-2 text-sm !text-[#BE83DF]"
        >
          Cancel
        </button>

        <div className="flex gap-3">
          {mode === 'create' && (
            <button
              onClick={handleSubmit((data) => {
                createMutation.mutate(buildPayload(data), {
                  onSuccess: () => {
                    onSaveAndNext();
                    reset();
                    setQuestion('');
                    setOptions([]);
                  },
                });
              })}
              className="rounded-full bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] px-5 py-2 text-sm !text-white"
            >
              Save & Add next
            </button>
          )}

          <button
            onClick={handleSubmit((data) => {
              const payload = buildPayload(data);
              (mode === 'edit' ? updateMutation : createMutation).mutate(payload, {
                onSuccess: onSave,
              });
            })}
            className="rounded-full border border-[#BE83DF] px-5 py-2 text-sm !text-[#BE83DF]"
          >
            {mode === 'edit' ? 'Update Question' : 'Save Question'}
          </button>
        </div>
      </div>
    </div>
  );
}
