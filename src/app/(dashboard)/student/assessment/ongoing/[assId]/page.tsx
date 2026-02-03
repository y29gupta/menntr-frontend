'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import AssessmentHeaders from '@/app/components/dashboards/student/assessment/assessmentHeaders';
import AssessmentStepModal from '@/app/ui/modals/AssessmentStepModal';

/* ================= API ================= */

async function fetchAssessment(assId: string) {
  const res = await fetch(`/api/student/assessments/${assId}`, { credentials: 'include' });

  if (!res.ok) throw new Error('Failed to fetch assessment');
  return res.json();
}

/* ================= DATE FORMAT ================= */

function formatAssignedDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'long' });

  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
          ? 'rd'
          : 'th';

  return `${day}${suffix} ${month} ${year}`;
}

/* ================= PAGE ================= */

export default function AssessmentStartPage() {
  const router = useRouter();
  const { assId } = useParams<{ assId: string }>();

  const [checked, setChecked] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['assessment', assId],
    queryFn: () => fetchAssessment(assId),
    enabled: !!assId,
  });

  if (isLoading || isError || !data) return null;

  return (
    <div className="min-h-screen w-full">
      <AssessmentHeaders />

      {/* ================= MAIN CARD ================= */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_6px_24px_rgba(16,24,40,0.08)] p-4 sm:p-5 md:p-6">
        {/* ================= TOP ROW ================= */}
        <div className="flex justify-between items-start flex-wrap gap-3">
          {/* Go Back */}
          <div className="mt-2 sm:mt-4">
            <button
              onClick={() => router.push('/student/assessment')}
              className="text-sm flex items-center gap-2 font-medium text-gray-600 hover:text-gray-900"
            >
              <img src="/Go-back.svg" alt="goback" />
              Go back
            </button>
          </div>

          {/* Status */}
          <div className="flex flex-col items-end gap-2 sm:gap-3">
            <div className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-lg font-medium">
              {data.status}
            </div>

            <p className="text-xs text-slate-500">
              Assigned on :
              <span className="font-medium text-slate-500 ml-1">
                {formatAssignedDate(data.timing.start_time)}
              </span>
            </p>
          </div>
        </div>

        {/* ================= TITLE ================= */}
        <div className="flex flex-col mt-3">
          <p className="text-base sm:text-lg text-slate-800 font-medium">{data.title}</p>

          <p className="flex flex-wrap items-center text-[12px] text-slate-500 mt-1">
            <span>Data Structures</span>
            <span className="mx-2 text-slate-400">•</span>
            <span>3rd Year</span>
            <span className="mx-2 text-slate-400">•</span>
            <span>Section A</span>
          </p>
        </div>

        {/* ================= OVERVIEW ================= */}
        <div className="bg-[#FAFBFC] border border-gray-200 rounded-xl p-5 mt-5">
          <h3 className="text-sm font-semibold text-gray-800">Assessment Overview</h3>

          <div className="h-px bg-gray-200 mt-3 mb-4" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <OverviewItem label="Duration" value={`${data.overview.duration_minutes} minutes`} />
            <OverviewItem label="Assessment Type" value={data.overview.assessment_type} />
            <OverviewItem label="Total Questions" value={String(data.overview.total_questions)} />
            <OverviewItem label="MCQ Questions" value={String(data.overview.mcq_questions)} />
            <OverviewItem label="Coding Questions" value={String(data.overview.coding_questions)} />
            <OverviewItem label="Total Marks" value={String(data.overview.total_marks)} />
          </div>
        </div>

        {/* ================= RULES ================= */}
        <div className="bg-[#FAFBFC] border border-gray-200 rounded-xl p-5 mt-5">
          <h3 className="text-sm font-semibold text-gray-800">Assessment Rules</h3>

          <div className="h-px bg-gray-200 mt-3 mb-4" />

          <ul className="space-y-3 text-sm text-gray-700">
            {data.rules.map((rule: string, i: number) => (
              <Rule key={i} text={rule} />
            ))}
          </ul>
        </div>

        {/* ================= EVALUATION ================= */}
        <div className="bg-[#FAFBFC] border border-gray-200 rounded-xl p-5 mt-5">
          <h3 className="text-sm font-semibold text-gray-800">Evaluation & Results</h3>

          <div className="h-px bg-gray-200 mt-3 mb-4" />

          {data.evaluation.mcq && (
            <p className="text-sm text-gray-600 mb-2">{data.evaluation.mcq}</p>
          )}

          {data.evaluation.coding && (
            <p className="text-sm text-gray-600 mb-4">{data.evaluation.coding}</p>
          )}

          {/* ================= CHECKBOX ================= */}
          <label className="flex items-start gap-2 text-sm text-gray-800 cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="
                mt-0.75
                peer relative h-4 w-4 appearance-none rounded border border-gray-300
                checked:border-transparent
                checked:bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
                checked:after:content-['✔']
                checked:after:absolute
                checked:after:inset-0
                checked:after:flex
                checked:after:items-center
                checked:after:justify-center
                checked:after:text-[11px]
                checked:after:text-white
              "
            />

            <span className="font-semibold leading-tight">
              I have read and understood the assessment instructions
            </span>
          </label>

          {/* ================= GO NEXT BUTTON ================= */}
          <div className="flex justify-center mt-6">
            <button
              disabled={!checked}
              onClick={() => setOpenModal(true)}
              className="
                w-full sm:w-auto
                rounded-full
                bg-linear-to-r from-[#904BFF] to-[#C053C2]
                px-6 py-2.5
                text-sm font-medium
                text-white!
                hover:opacity-90
                transition
                disabled:opacity-40
              "
            >
              Go next
            </button>
          </div>
        </div>
      </div>

      {/* ================= STEP MODAL ================= */}
      <AssessmentStepModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        assessmentId={data.id}
      />
    </div>
  );
}

/* ================= HELPERS ================= */

function OverviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r last:border-r-0 border-gray-200 pr-3">
      <p className="text-[13px] text-slate-500 mb-1">{label}</p>
      <p className="font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function Rule({ text }: { text: string }) {
  return (
    <li className="flex gap-2 items-center">
      <span className="mt-1 text-gray-800">◆</span>
      <span>{text}</span>
    </li>
  );
}
