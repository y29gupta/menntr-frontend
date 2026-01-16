'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { DatePicker } from 'antd';
import { Calendar } from 'lucide-react';
import dayjs from 'dayjs';
import FormDropdown from '@/app/ui/FormDropdown';

const assessmentSchema = z.object({
  assessmentName: z.string().min(1, 'Assessment name is required'),
  assessmentType: z.enum(['Practice', 'Assignment', 'Mock Test']),

  durationHours: z.string().min(1, 'Hours required'),
  durationMinutes: z.string().min(1, 'Minutes required'),

  attempts: z.string().min(1, 'Attempts required'),
  publishedOn: z.date().nullable(),
  expiresOn: z.date().nullable(),

  assignBy: z.enum(['batches', 'students']),
  batchIds: z.array(z.string()).min(1, 'Select at least one batch'),

  enableReattempt: z.boolean(),

  assignAbsent: z.boolean(),
  absentAssessmentId: z.string().nullable(),

  assignBelow: z.boolean(),
  belowAssessmentId: z.string().nullable(),
  belowScore: z.string().nullable(),

  assignAbove: z.boolean(),
  aboveAssessmentId: z.string().nullable(),
  aboveScore: z.string().nullable(),

  reportVisibility: z.boolean(),
  questionNavigation: z.boolean(),

  tabProctoring: z.boolean(),
  cameraProctoring: z.boolean(),
  fullScreenRecording: z.boolean(),
});

type AssessmentFormValues = z.infer<typeof assessmentSchema>;

function SettingConfigForm() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AssessmentFormValues>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      assessmentType: 'Practice',

      publishedOn: null,
      expiresOn: null,

      assignBy: 'batches',
      batchIds: [],

      enableReattempt: false,
      assignAbsent: false,
      absentAssessmentId: null,

      assignBelow: false,
      belowAssessmentId: null,
      belowScore: null,

      assignAbove: false,
      aboveAssessmentId: null,
      aboveScore: null,

      reportVisibility: true,
      questionNavigation: true,

      tabProctoring: false,
      cameraProctoring: false,
      fullScreenRecording: false,
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      {/* ASSESSMENT DETAILS */}
      <div className="border border-[#E3E6EF] rounded-xl p-4 sm:p-6 bg-white">
        <h3 className="text-sm font-semibold text-[#1A2C50] mb-6">Assessment Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-12 relative">
          {/* Divider only for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-[#E3E6EF]" />

          {/* LEFT */}
          <div className="space-y-3 md:pr-6">
            <label className="text-sm font-medium text-gray-700">Assessment Name</label>

            <input
              {...register('assessmentName')}
              placeholder="e.g Aptitude Mock - Jan 2025"
              className="w-full border-b border-gray-300 py-2 text-sm
                   focus:outline-none focus:border-purple-500"
            />

            {errors.assessmentName && (
              <p className="text-xs text-red-500">{errors.assessmentName.message}</p>
            )}
          </div>

          {/* RIGHT */}
          <div className="space-y-3 md:pl-6">
            <label className="text-sm font-medium text-gray-700">Assessment Type</label>

            <Controller
              name="assessmentType"
              control={control}
              render={({ field }) => (
                <div className="flex gap-3 flex-wrap">
                  {['Practice', 'Assignment', 'Mock Test'].map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => field.onChange(item)}
                      className={`px-4 py-1.5 rounded-full border text-sm font-medium
                  ${
                    field.value === item
                      ? 'border-purple-500! text-purple-600! bg-purple-50'
                      : 'border-gray-300 text-gray-500'
                  }`}
                    >
                      <span className="flex items-center gap-2">
                        {field.value === item && <span>✓</span>}
                        {item}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            />

            {errors.assessmentType && (
              <p className="text-xs text-red-500">{errors.assessmentType.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* ATTEMPTS & DURATION */}
      <div className="border border-[#E3E6EF] rounded-xl p-4 sm:p-6 bg-white mt-6">
        <h3 className="text-sm font-semibold text-[#1A2C50] mb-6">Attempts & Duration</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-10 relative">
          {/* dividers – desktop only */}
          <div className="hidden md:block absolute left-1/3 top-0 h-full w-px bg-[#E3E6EF]" />
          <div className="hidden md:block absolute left-2/3 top-0 h-full w-px bg-[#E3E6EF]" />

          {/* HOURS */}
          <div className="space-y-2 md:pr-6">
            <label className="text-sm font-medium text-gray-700">Assessment Duration</label>
            <span className="block text-xs text-gray-400">Hours</span>

            <input
              {...register('durationHours')}
              placeholder="e.g 1"
              className="w-full border-b border-gray-300 py-2 text-sm
               focus:outline-none focus:border-purple-500"
            />

            {errors.durationHours && (
              <p className="text-xs text-red-500">{errors.durationHours.message}</p>
            )}
          </div>

          {/* MINUTES */}
          <div className="space-y-2 md:px-6">
            <label className="text-sm font-medium text-gray-700">Assessment Duration</label>
            <span className="block text-xs text-gray-400">Mins</span>

            <input
              {...register('durationMinutes')}
              placeholder="e.g 23"
              className="w-full border-b border-gray-300 py-2 text-sm
               focus:outline-none focus:border-purple-500"
            />

            {errors.durationMinutes && (
              <p className="text-xs text-red-500">{errors.durationMinutes.message}</p>
            )}
          </div>

          {/* ATTEMPTS */}
          <div className="space-y-2 md:pl-6">
            <label className="text-sm font-medium text-gray-700">No. of attempts</label>
            <span className="block text-xs text-gray-400">
              Number of times a candidate can attempt this assessment.
            </span>

            <input
              {...register('attempts')}
              placeholder="e.g 1"
              className="w-full border-b border-gray-300 py-2 text-sm
               focus:outline-none focus:border-purple-500"
            />

            {errors.attempts && <p className="text-xs text-red-500">{errors.attempts.message}</p>}
          </div>
        </div>
      </div>

      {/* PUBLISH & EXPIRY */}
      <div className="border border-[#E3E6EF] rounded-xl p-4 sm:p-6 bg-white mt-6">
        <h3 className="text-sm font-semibold text-[#1A2C50] mb-6">Publish & Expiry</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-12 relative">
          {/* divider – desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-[#E3E6EF]" />

          {/* PUBLISHED ON */}
          <div className="space-y-3 md:pr-6">
            <label className="text-sm font-medium text-gray-700">Published on</label>

            <Controller
              name="publishedOn"
              control={control}
              render={({ field }) => (
                <DatePicker
                  showTime
                  format="DD MMM YYYY, hh:mm A"
                  allowClear={false}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(val) => field.onChange(val ? val.toDate() : null)}
                  suffixIcon={null}
                  className="w-full border-none shadow-none"
                  inputRender={(inputProps) => (
                    <div className="relative w-full">
                      <input
                        {...inputProps}
                        readOnly
                        placeholder="Select date & time"
                        className="w-full cursor-pointer border-b border-gray-300 py-2 pr-8 text-sm
                       focus:outline-none focus:border-purple-500"
                      />
                      <Calendar
                        size={16}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  )}
                />
              )}
            />
          </div>

          {/* EXPIRES ON */}
          <div className="space-y-3 md:pl-6">
            <label className="text-sm font-medium text-gray-700">Expires On</label>

            <Controller
              name="expiresOn"
              control={control}
              render={({ field }) => (
                <DatePicker
                  showTime
                  format="DD MMM YYYY, hh:mm A"
                  allowClear={false}
                  value={field.value ? dayjs(field.value) : null}
                  minDate={watch('publishedOn') ? dayjs(watch('publishedOn')) : undefined}
                  onChange={(val) => field.onChange(val ? val.toDate() : null)}
                  suffixIcon={null}
                  className="w-full border-none shadow-none"
                  inputRender={(inputProps) => (
                    <div className="relative w-full">
                      <input
                        {...inputProps}
                        readOnly
                        placeholder="Select date & time"
                        className="w-full cursor-pointer border-b border-gray-300 py-2 pr-8 text-sm
                       focus:outline-none focus:border-purple-500"
                      />
                      <Calendar
                        size={16}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  )}
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* CANDIDATE SELECTION */}
      <div className="border border-[#C3CAD9] rounded-xl p-4 sm:p-6 mt-6">
        <h3 className="text-sm font-semibold text-[#1A2C50] mb-1">Candidate Selection</h3>
        <p className="text-xs text-gray-500 mb-6">
          Select which students should receive this assessment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-12 relative">
          {/* vertical divider – desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-[#C3CAD9]" />

          {/* LEFT — Assign assessment by */}
          <div className="space-y-2 md:pr-6">
            <label className="text-sm font-medium text-gray-700">Assign assessment by</label>

            <Controller
              name="assignBy"
              control={control}
              render={({ field }) => (
                <FormDropdown
                  placeholder="Batches"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { label: 'Batches', value: 'batches' },
                    { label: 'Students', value: 'students' },
                  ]}
                />
              )}
            />

            {errors.assignBy && <p className="text-xs text-red-500">{errors.assignBy.message}</p>}
          </div>

          {/* RIGHT — Select Batches */}
          <div className="space-y-2 md:pl-6">
            <label className="text-sm font-medium text-gray-700">Select Batches</label>

            <Controller
              name="batchIds"
              control={control}
              render={({ field }) => (
                <FormDropdown
                  placeholder="Select batches"
                  multiple
                  searchable
                  renderChips
                  value={field.value}
                  onChange={(val) => {
                    const current = field.value ?? [];
                    if (Array.isArray(val)) field.onChange(val);
                    else
                      field.onChange(
                        current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
                      );
                  }}
                  options={[
                    { label: 'CSE - 2022–2026 (A)', value: '1' },
                    { label: 'ECE - 2022–2026 (E)', value: '2' },
                  ]}
                />
              )}
            />

            {errors.batchIds && <p className="text-xs text-red-500">{errors.batchIds.message}</p>}
          </div>
        </div>
      </div>

      {/* REATTEMPT & ELIGIBILITY RULES */}
      <div className="border border-[#E3E6EF] rounded-xl p-4 sm:p-6 bg-white mt-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h3 className="text-sm font-semibold text-[#1A2C50]">Reattempt & Eligibility Rules</h3>
            <p className="text-xs text-gray-500">
              Control who can reattempt this assessment based on previous performance or attendance.
            </p>
          </div>

          {/* ENABLE TOGGLE */}
          <Controller
            name="enableReattempt"
            control={control}
            render={({ field }) => (
              <button
                type="button"
                onClick={() => field.onChange(!field.value)}
                className="relative h-6 w-11 border border-[#BE83DF] rounded-full bg-[#F2F4F7] shrink-0"
              >
                <span
                  className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full transition-all ${
                    field.value
                      ? 'translate-x-4 bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]'
                      : 'translate-x-0 bg-[#D0D5DD]'
                  }`}
                />
              </button>
            )}
          />
        </div>

        {/* ASSIGN TO ABSENT */}
        <div className="border-b border-[#E3E6EF] pb-6 mb-6">
          <Controller
            name="assignAbsent"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <span className="text-sm font-medium text-[#1A2C50] break-words">
                  Assign to Absent Students
                </span>

                <button
                  type="button"
                  onClick={() => field.onChange(!field.value)}
                  className="relative h-6 w-11 border border-[#BE83DF] rounded-full bg-[#F2F4F7] shrink-0"
                >
                  <span
                    className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full transition-all ${
                      field.value
                        ? 'translate-x-4 bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]'
                        : 'translate-x-0 bg-[#D0D5DD]'
                    }`}
                  />
                </button>
              </div>
            )}
          />

          <Controller
            name="absentAssessmentId"
            control={control}
            render={({ field }) => (
              <FormDropdown
                placeholder="Select Previous Assessment"
                value={field.value ?? undefined}
                onChange={field.onChange}
                options={[{ label: 'Internal Assessment - CSE', value: '1' }]}
              />
            )}
          />

          <p className="text-xs text-gray-400 mt-2">
            Students who were marked absent in the selected assessment will receive this assessment.
          </p>
        </div>

        {/* BELOW / ABOVE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-12 relative">
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-[#E3E6EF]" />

          {/* BELOW */}
          <div className="space-y-4 md:pr-6">
            <Controller
              name="assignBelow"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-sm font-medium text-[#1A2C50] break-words">
                    Assign to Students Who Scored Below
                  </span>

                  <button
                    type="button"
                    onClick={() => field.onChange(!field.value)}
                    className="relative h-6 w-11 border border-[#BE83DF] rounded-full bg-[#F2F4F7] shrink-0"
                  >
                    <span
                      className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full transition-all ${
                        field.value
                          ? 'translate-x-4 bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]'
                          : 'translate-x-0 bg-[#D0D5DD]'
                      }`}
                    />
                  </button>
                </div>
              )}
            />

            <FormDropdown
              placeholder="Select Previous Assessment"
              value={watch('belowAssessmentId') ?? undefined}
              onChange={(v) => typeof v === 'string' && setValue('belowAssessmentId', v)}
              options={[{ label: 'Internal Assessment - CSE', value: '1' }]}
            />

            <input
              {...register('belowScore')}
              placeholder="Score Threshold (%)"
              className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none"
            />
          </div>

          {/* ABOVE */}
          <div className="space-y-4 md:pl-6">
            <Controller
              name="assignAbove"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-sm font-medium text-[#1A2C50] break-words">
                    Assign to Students Who Scored Above
                  </span>

                  <button
                    type="button"
                    onClick={() => field.onChange(!field.value)}
                    className="relative h-6 w-11 border border-[#BE83DF] rounded-full bg-[#F2F4F7] shrink-0"
                  >
                    <span
                      className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full transition-all ${
                        field.value
                          ? 'translate-x-4 bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]'
                          : 'translate-x-0 bg-[#D0D5DD]'
                      }`}
                    />
                  </button>
                </div>
              )}
            />

            <FormDropdown
              placeholder="Select Previous Assessment"
              value={watch('aboveAssessmentId') ?? undefined}
              onChange={(v) => typeof v === 'string' && setValue('aboveAssessmentId', v)}
              options={[{ label: 'Internal Assessment - CSE', value: '1' }]}
            />

            <input
              {...register('aboveScore')}
              placeholder="Score Threshold (%)"
              className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center mt-6 text-xs text-[#4577F8]">
          If a student matches multiple rules, the assessment will be assigned only once.
        </div>

        <div className="text-center mt-1 text-sm font-medium text-[#1A2C50]">
          Based on selected rules, <span className="font-bold">36</span> students will be assigned
          this assessment.
        </div>
      </div>

      {/* TEST CONFIGURATION & PROCTORING */}
      <div className="border border-[#E3E6EF] rounded-xl p-4 sm:p-6 bg-white mt-6">
        {/* HEADER */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-[#1A2C50]">Test Configuration & Proctoring</h3>
          <p className="text-xs text-gray-500">
            Configure how students attempt the assessment and how suspicious behavior is monitored.
          </p>
        </div>

        {/* REPORT VISIBILITY */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 py-4 border-b border-[#E3E6EF]">
          <div className="sm:pr-6">
            <p className="text-sm font-medium text-[#1A2C50]">Report Visibility</p>
            <p className="text-xs text-gray-500 mt-1 max-w-[520px]">
              Allows students to view their assessment report after submission. Includes overall
              score, question-wise performance, and correctness. Proctoring data will not be visible
              to students.
            </p>
          </div>

          <Controller
            name="reportVisibility"
            control={control}
            render={({ field }) => (
              <button
                type="button"
                onClick={() => field.onChange(!field.value)}
                className="relative h-6 w-11 border border-[#BE83DF] rounded-full bg-[#F2F4F7] shrink-0"
              >
                <span
                  className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full transition-all ${
                    field.value
                      ? 'translate-x-4 bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]'
                      : 'translate-x-0 bg-[#D0D5DD]'
                  }`}
                />
              </button>
            )}
          />
        </div>

        {/* QUESTION NAVIGATION */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 py-4 border-b border-[#E3E6EF]">
          <div className="sm:pr-6">
            <p className="text-sm font-medium text-[#1A2C50]">Question Navigation Mode</p>
            <p className="text-xs text-gray-500 mt-1 max-w-[520px]">
              Toggle ON – Allows students to freely navigate between questions.
              <br />
              Toggle OFF – Students must answer questions sequentially and cannot navigate freely.
            </p>
          </div>

          <Controller
            name="questionNavigation"
            control={control}
            render={({ field }) => (
              <button
                type="button"
                onClick={() => field.onChange(!field.value)}
                className="relative h-6 w-11 border border-[#BE83DF] rounded-full bg-[#F2F4F7] shrink-0"
              >
                <span
                  className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full transition-all ${
                    field.value
                      ? 'translate-x-4 bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]'
                      : 'translate-x-0 bg-[#D0D5DD]'
                  }`}
                />
              </button>
            )}
          />
        </div>

        {/* PROCTORING CONTROLS */}
        <div className="pt-6">
          <p className="text-sm font-medium text-[#1A2C50] mb-4">Proctoring Controls</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-10 relative">
            <div className="hidden md:block absolute left-1/3 top-0 h-full w-px bg-[#E3E6EF]" />
            <div className="hidden md:block absolute left-2/3 top-0 h-full w-px bg-[#E3E6EF]" />

            {/* TAB PROCTORING */}
            <div className="space-y-2 md:pr-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-sm font-medium text-[#1A2C50]">Tab Proctoring</span>

                <Controller
                  name="tabProctoring"
                  control={control}
                  render={({ field }) => (
                    <button
                      type="button"
                      onClick={() => field.onChange(!field.value)}
                      className="relative h-6 w-11 border border-[#BE83DF] rounded-full bg-[#F2F4F7] shrink-0"
                    >
                      <span
                        className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full transition-all ${
                          field.value
                            ? 'translate-x-4 bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]'
                            : 'translate-x-0 bg-[#D0D5DD]'
                        }`}
                      />
                    </button>
                  )}
                />
              </div>

              <p className="text-xs text-gray-500">
                Triggers a warning whenever the student switches tabs or exits the test window.
              </p>
            </div>

            {/* CAMERA PROCTORING */}
            <div className="space-y-2 md:px-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-sm font-medium text-[#1A2C50]">Camera Proctoring</span>

                <Controller
                  name="cameraProctoring"
                  control={control}
                  render={({ field }) => (
                    <button
                      type="button"
                      onClick={() => field.onChange(!field.value)}
                      className="relative h-6 w-11 border border-[#BE83DF] rounded-full bg-[#F2F4F7] shrink-0"
                    >
                      <span
                        className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full transition-all ${
                          field.value
                            ? 'translate-x-4 bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]'
                            : 'translate-x-0 bg-[#D0D5DD]'
                        }`}
                      />
                    </button>
                  )}
                />
              </div>

              <p className="text-xs text-gray-500">
                Automatically captures the candidate’s image at regular intervals and detects camera
                off-events.
              </p>
            </div>

            {/* FULL SCREEN RECORDING */}
            <div className="space-y-2 md:pl-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-sm font-medium text-[#1A2C50]">Full Screen Recording</span>

                <Controller
                  name="fullScreenRecording"
                  control={control}
                  render={({ field }) => (
                    <button
                      type="button"
                      onClick={() => field.onChange(!field.value)}
                      className="relative h-6 w-11 border border-[#BE83DF] rounded-full bg-[#F2F4F7] shrink-0"
                    >
                      <span
                        className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full transition-all ${
                          field.value
                            ? 'translate-x-4 bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]'
                            : 'translate-x-0 bg-[#D0D5DD]'
                        }`}
                      />
                    </button>
                  )}
                />
              </div>

              <p className="text-xs text-gray-500">
                Records the candidate’s full screen, camera feed, and activity during the
                assessment.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E3E6EF]" />

          {/* FOOTER NOTE */}
          <p className="text-xs text-center text-blue-600 mt-6">
            Students are informed before starting the assessment that proctoring and monitoring are
            enabled for academic integrity.
          </p>
        </div>
      </div>

      {/* ACTION FOOTER */}
      <div className="mt-8 border border-[#E3E6EF] rounded-xl p-4 sm:p-6 bg-white">
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          {/* SAVE */}
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 rounded-full text-sm font-medium text-white!
             bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
             hover:opacity-90 transition"
          >
            Save Configurations
          </button>

          {/* CANCEL */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-2 rounded-full text-sm font-medium
             border border-purple-400 text-purple-600
             hover:bg-purple-50 transition"
          >
            Cancel Changes
          </button>
        </div>
      </div>
    </form>
  );
}

export default SettingConfigForm;
