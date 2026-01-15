'use client';
import { createPortal } from 'react-dom';
import { X, ChevronDown, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CreateMCQFormValues, createMCQSchema } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import FormDropdown from '@/app/ui/FormDropdown';
import { useMutation, useQuery } from '@tanstack/react-query';
import { assessmentApi } from '../../assessment.service';

type Option = {
  id: string;
  text: string;
  correct: boolean;
};

type Props = {
  onClose: () => void;
  onSave: (q: any) => void;
  onSaveAndNext: (q: any) => void;
  assessmentId: string;
};
type questionMetaResponse = {
  topics: string[];
  difficulties: string[];
  questionTypes: string[];
};

// const DIFFICULTY_OPTIONS = [
//   { label: 'Easy', value: 'easy' },
//   { label: 'Medium', value: 'medium' },
//   { label: 'Hard', value: 'hard' },
// ];

export default function CreateMCQModal({ onClose, onSave, onSaveAndNext, assessmentId }: Props) {
  const [mounted, setMounted] = useState(false);
  const [question, setQuestion] = useState('');
  const [mandatory, setMandatory] = useState(true);
  const [marks, setMarks] = useState(1);
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);

  const [showOptions, setShowOptions] = useState(false);
  const [questionType, setQuestionType] = useState<string>('');

  const { control, handleSubmit, setValue } = useForm<CreateMCQFormValues>({
    resolver: zodResolver(createMCQSchema),
    defaultValues: {
      topic: '',
      questionType: '',
      difficulty: 'easy',
      options: [],
    },
  });

  useEffect(() => {
    setValue('options', options as any, { shouldValidate: true });
  }, [options, setValue]);

  const buildApiPayload = (data: CreateMCQFormValues) => ({
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
  const createQuestionMutation = useMutation({
    mutationFn: (payload: any) => assessmentApi.createAssessmentQuestion(assessmentId, payload),
  });

  const { data: questionMeta } = useQuery<questionMetaResponse>({
    queryKey: ['questions-meta'],
    queryFn: assessmentApi.getMCQMeta,
    staleTime: Infinity,
  });

  const topicOptions =
    questionMeta?.topics.map((t) => ({
      label: t,
      value: t,
    })) ?? [];

  const questionTypeOptions =
    questionMeta?.questionTypes.map((q) => ({
      label: q.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      value: q,
    })) ?? [];

  const difficultyOptions =
    questionMeta?.difficulties.map((d) => ({
      label: d.charAt(0).toUpperCase() + d.slice(1),
      value: d,
    })) ?? [];

  useEffect(() => setMounted(true), []);

  const normalizeQuestionType = (type: string) => {
    if (type === 'single_correct') return 'single';
    if (type === 'multiple_correct') return 'multiple';
    if (type === 'true_false') return 'boolean';
    return type;
  };

  useEffect(() => {
    if (!mounted) return;

    requestAnimationFrame(() => {
      setVisible(true);
    });
  }, [mounted]);

  if (!mounted) return null;

  const onSubmit = (data: CreateMCQFormValues) => {
    const payload = {
      question,
      mandatory,
      marks,
      difficulty: data.difficulty,
      options,
      subject: data.topic,
      type: data.questionType,
    };

    onSave(payload);
  };
  const isTrueFalse = questionType === 'boolean';
  const disableAddOption = isTrueFalse && options.length >= 2;

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      {/* FULL SCREEN WHITE TRANSPARENT OVERLAY */}
      <div className="absolute inset-0 bg-white/70" onClick={onClose} />

      {/* RIGHT PANEL – starts from VERY TOP */}
      <div
        className={`
    absolute right-0 top-0 h-full w-full max-w-[620px]  bg-white
   shadow-[-4px_0px_16px_0px_#0F172A26]
    transform transition-transform duration-400 ease-in-out
    ${visible ? 'translate-x-0' : 'translate-x-full'}
  `}
        //   className="absolute right-0 top-0 h-full w-full max-w-[520px] bg-white shadow-[0px_0px_8px_0px_#0F172A1A]"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#EAECF0] px-6 py-2">
          <div>
            <h3 className="text-base font-semibold text-[#101828]">Create MCQ Question</h3>
            <p className="mt-1 text-sm text-[#667085]">
              Add a question to Aptitude Mock - Jan 2025
            </p>
          </div>
          <X className="cursor-pointer text-[#667085]" onClick={onClose} />
        </div>

        {/* Body */}
        <div className="h-[calc(100%-160px)]  overflow-y-scroll  p-6 space-y-6">
          {/* Dropdowns */}
          <div className="flex gap-3">
            {/* Topic */}
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

            {/* Question Type */}
            <div className="w-[200px]">
              <Controller
                name="questionType"
                control={control}
                render={({ field }) => (
                  <FormDropdown
                    value={field.value}
                    placeholder="QuestionType"
                    options={questionTypeOptions}
                    onChange={(val) => {
                      const apiValue = Array.isArray(val) ? val[0] : val;

                      field.onChange(apiValue); // keep API value for payload
                      setQuestionType(normalizeQuestionType(apiValue)); // FIXED logic

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
                    className={`absolute top-[2px] left-[2px]  h-5 w-5 rounded-full transition-all ${
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
              className="w-full rounded-2xl border border-[#D0D5DD] p-4 text-sm focus: focus:outline-none focus:ring-0"
            />
          </div>

          {/* Options */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-medium text-[#101828]">Add Options</h4>
              {/* <button
                type="button"
                onClick={() => {
                  setShowOptions(true);

                  // For single & multiple → add ONE option per click
                  if (questionType === 'single' || questionType === 'multiple') {
                    setOptions((prev) => [
                      ...prev,
                      {
                        id: crypto.randomUUID(),
                        text: '',
                        correct: false,
                      },
                    ]);
                  }
                }}
                className="flex py-2 px-3 rounded-full items-center gap-1 text-sm border border-[#BE83DF] !text-[#BE83DF]"
              >
                <Plus size={14} /> Add Options
              </button> */}
              <div
                title={disableAddOption ? 'Only two option can be created for true/false' : ''}
                className="inline-block"
              >
                <button
                  type="button"
                  disabled={disableAddOption}
                  onClick={() => {
                    setShowOptions(true);

                    if (disableAddOption) return;

                    if (
                      questionType === 'single' ||
                      questionType === 'multiple' ||
                      questionType === 'boolean'
                    ) {
                      setOptions((prev) => [
                        ...prev,
                        {
                          id: crypto.randomUUID(),
                          text: '',
                          correct: false,
                        },
                      ]);
                    }
                  }}
                  className={`flex py-2 px-3 font-medium cursor-pointer rounded-full items-center gap-1 text-sm border border-[#BE83DF] !text-[#BE83DF]
      ${disableAddOption ? 'opacity-50 cursor-not-allowed' : ''}
    `}
                >
                  <Plus size={14} /> Add Options
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {showOptions &&
                options.map((opt, i) => (
                  <div key={opt.id} className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={opt.correct}
                        onChange={() =>
                          setOptions((prev) =>
                            questionType === 'multiple'
                              ? prev.map((o) =>
                                  o.id === opt.id ? { ...o, correct: !o.correct } : o
                                )
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
                          className=" peer-checked:!block w-4 h-4 !text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    </label>

                    <span className="text-sm text-[#101828]">Option {i + 1}</span>
                    <input
                      value={opt.text}
                      onChange={(e) =>
                        setOptions((prev) =>
                          prev.map((o) => (o.id === opt.id ? { ...o, text: e.target.value } : o))
                        )
                      }
                      placeholder="Type your option here..."
                      className="flex-1 rounded-2xl border border-[#D0D5DD] p-4 text-sm focus: focus:outline-none focus:ring-0"
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Marks & Difficulty */}
          <div className="flex gap-4  items-center">
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-[#101828]">Marks</label>
              <input
                type="number"
                value={marks}
                onChange={(e) => setMarks(+e.target.value)}
                className="w-full  rounded-lg border border-[#D0D5DD] px-3 py-2 text-sm focus: focus:outline-none focus:ring-0"
              />
            </div>

            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-[#101828]">Difficulty</label>
              {/* <div className="flex items-center justify-between rounded-lg border border-[#D0D5DD] px-3 py-2 text-sm">
                {difficulty}
                <ChevronDown size={16} />
              </div> */}
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

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-[#EAECF0] bg-white p-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="rounded-full border border-[#BE83DF] px-5 py-2 text-sm !text-[#BE83DF]"
            >
              Cancel
            </button>

            <div className="flex gap-3">
              {/* <button
                onClick={handleSubmit((data) => {
                  const payload = {
                    question,
                    mandatory,
                    marks,
                    difficulty: data.difficulty,
                    options,
                    subject: data.topic,
                    type: data.questionType,
                  };

                  onSaveAndNext(payload);
                  setQuestion('');
                })}
                className="rounded-full bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] px-5 py-2 text-sm !text-white"
              >
                Save & Add next
              </button> */}
              <button
                onClick={handleSubmit((data) => {
                  const payload = buildApiPayload(data);

                  createQuestionMutation.mutate(payload, {
                    onSuccess: () => {
                      onSaveAndNext(payload); // keeps StepFour behaviour intact

                      // reset ONLY form-related state
                      setQuestion('');
                      setOptions([]);
                      setMarks(1);
                      setMandatory(true);
                    },
                  });
                })}
                className="rounded-full bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] px-5 py-2 text-sm !text-white"
              >
                Save & Add next
              </button>

              {/* <button
                onClick={handleSubmit((data) => {
                  const payload = {
                    question,
                    mandatory,
                    marks,
                    difficulty: data.difficulty,
                    options,
                    subject: data.topic,
                    type: data.questionType,
                  };

                  onSave(payload);
                  onClose();
                })}
                className="rounded-full border border-[#BE83DF] px-5 py-2 text-sm !text-[#BE83DF]"
              >
                Save Question
              </button> */}
              <button
                onClick={handleSubmit((data) => {
                  const payload = buildApiPayload(data);

                  createQuestionMutation.mutate(payload, {
                    onSuccess: () => {
                      onSave(payload); // existing StepFour logic
                      onClose(); // close modal
                    },
                  });
                })}
                className="rounded-full border border-[#BE83DF] px-5 py-2 text-sm !text-[#BE83DF]"
              >
                Save Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
