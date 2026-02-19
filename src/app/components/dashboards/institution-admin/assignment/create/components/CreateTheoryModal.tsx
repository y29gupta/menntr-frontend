'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import FormDropdown from '@/app/ui/FormDropdown';
import { assignmentApi } from '../../assignment.service';

type Props = {
  entityId: string;
  initialData?: any;
  mode?: 'create' | 'edit';
  onSave: () => void;
  onSaveAndNext: () => void;
};

type TheoryFormValues = {
  topic: string;
  difficulty: string;
};

export default function CreateTheoryModal({
  entityId,
  initialData,
  mode = 'create',
  onSave,
  onSaveAndNext,
}: Props) {
  const [question, setQuestion] = useState(initialData?.question_text || '');
  const [guidelines, setGuidelines] = useState(initialData?.answer_guidelines || '');
  const [mandatory, setMandatory] = useState(initialData?.is_mandatory ?? true);
  const [marks, setMarks] = useState(initialData?.points ?? 1);
  const [allowUpload, setAllowUpload] = useState(initialData?.allow_upload ?? false);
  const [allowedFormats, setAllowedFormats] = useState<string[]>(
    initialData?.allowed_formats ?? []
  );

  const { control, handleSubmit } = useForm<TheoryFormValues>({
    defaultValues: {
      topic: initialData?.topic ?? '',
      difficulty: initialData?.difficulty_level ?? 'easy',
    },
  });

  const toggleFormat = (format: string) => {
    setAllowedFormats((prev) =>
      prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
    );
  };

  const buildPayload = (data: TheoryFormValues) => ({
    topic: data.topic,
    question_text: question,
    answer_guidelines: guidelines,
    difficulty_level: data.difficulty,
    points: marks,
    is_mandatory: mandatory,
    allow_upload: allowUpload,
    allowed_formats: allowedFormats,
    question_type: 'theory',
  });

  const createMutation = useMutation({
    mutationFn: (payload: any) => assignmentApi.createAssignmentQuestion(entityId, payload),
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-6 pr-1">
        {/* Topic */}
        <div className="w-[200px]">
          <Controller
            name="topic"
            control={control}
            render={({ field }) => (
              <FormDropdown
                value={field.value}
                placeholder="Select Topic"
                options={[
                  { label: 'General', value: 'general' },
                  { label: 'Technical', value: 'technical' },
                ]}
                onChange={field.onChange}
                triggerClassName="border-2 border-[#D0D5DD] rounded-lg px-3 py-2"
              />
            )}
          />
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
            placeholder="Write the theory question here..."
            className="w-full rounded-2xl border border-[#D0D5DD] p-4 text-sm min-h-[120px]"
          />
        </div>

        {/* Answer Guidelines */}
        <div>
          <label className="text-sm font-medium text-[#101828]">Answer Guidelines</label>

          <textarea
            value={guidelines}
            onChange={(e) => setGuidelines(e.target.value)}
            placeholder="Mention key points or expected concepts for evaluation"
            className="w-full mt-2 rounded-2xl border border-[#D0D5DD] p-4 text-sm min-h-[100px]"
          />
        </div>

        {/* Allow Upload */}
        <div className="space-y-3">
          <div className="flex items-center justify-start gap-3">
            <span className="text-sm font-medium text-[#101828]">Allow file upload</span>

            <button
              type="button"
              onClick={() => setAllowUpload(!allowUpload)}
              className="relative h-6 w-11 border border-[#BE83DF] rounded-full bg-[#F2F4F7]"
            >
              <span
                className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full transition-all ${
                  allowUpload
                    ? 'translate-x-4 bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]'
                    : 'translate-x-0 bg-[#D0D5DD]'
                }`}
              />
            </button>
          </div>

          {allowUpload && (
            <div className="flex gap-2">
              {['pdf', 'doc/docx', 'Image'].map((format) => (
                <button
                  key={format}
                  type="button"
                  onClick={() => toggleFormat(format)}
                  className={`px-4 py-1 rounded-full border text-sm ${
                    allowedFormats.includes(format)
                      ? 'bg-[#F6F0FF] border-[#7C3AED] !text-[#7C3AED]'
                      : 'border-gray-300 !text-[#3D465C]'
                  }`}
                >
                  {format}
                </button>
              ))}
            </div>
          )}
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
                  options={[
                    { label: 'Easy', value: 'easy' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'Hard', value: 'hard' },
                  ]}
                  onChange={field.onChange}
                  triggerClassName="border border-[#D0D5DD] rounded-lg px-3 py-2"
                  dropdownPosition="top"
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
                  onSuccess: onSaveAndNext,
                });
              })}
              className="rounded-full bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] px-5 py-2 text-sm !text-white"
            >
              Save & Add next
            </button>
          )}

          <button
            onClick={handleSubmit((data) => {
              createMutation.mutate(buildPayload(data), {
                onSuccess: onSave,
              });
            })}
            className="rounded-full border border-[#BE83DF] px-5 py-2 text-sm !text-[#BE83DF]"
          >
            Save Question
          </button>
        </div>
      </div>
    </div>
  );
}
