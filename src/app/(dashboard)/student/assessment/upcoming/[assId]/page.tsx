'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import AssessmentHeaders from '@/app/components/dashboards/student/assessment/assessmentHeaders';

/* ================= API ================= */

async function fetchAssessment(assId: string) {
  const res = await fetch(`/api/student/assessments/${assId}`, {
    credentials: 'include',
  });

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

export default function AssessmentUpcomingPage() {
  const router = useRouter();
  const { assId } = useParams<{ assId: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['upcoming-assessment', assId],
    queryFn: () => fetchAssessment(assId),
    enabled: !!assId,
  });

  if (isLoading || isError || !data) return null;

  return (
    <div className="min-h-screen w-full">
      <AssessmentHeaders />

      <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_6px_24px_rgba(16,24,40,0.08)] p-4 sm:p-5 md:p-6">
        {/* TOP */}
        <div className="flex justify-between items-start flex-wrap gap-3">
          <div className="mt-2 sm:mt-4">
            <button
              onClick={() => router.push('/student/assessment')}
              className="text-sm flex items-center gap-2 font-medium text-gray-600"
            >
              <img src="/Go-back.svg" alt="goback" />
              Go back
            </button>
          </div>

          <div className="flex flex-col items-end gap-2 sm:gap-3">
            <div className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-lg font-medium">
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

        {/* TITLE */}
        <div className="flex flex-col mt-3">
          <p className="text-base sm:text-lg text-slate-800 font-medium">
            {data.title}
          </p>

          <p className="flex flex-wrap items-center text-[12px] text-slate-500 mt-1">
            <span>Data Structures</span>
            <span className="mx-2 text-slate-400">•</span>
            <span>3rd Year</span>
            <span className="mx-2 text-slate-400">•</span>
            <span>Section A</span>
          </p>
        </div>

        {/* OVERVIEW */}
        <div className="bg-[#FAFBFC] border border-gray-200 rounded-xl p-5 mt-5">
          <h3 className="text-sm font-semibold text-gray-800">
            Assessment Overview
          </h3>
          <div className="h-px bg-gray-200 mt-3 mb-4" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              ['Duration', `${data.overview.duration_minutes} minutes`],
              ['Assessment Type', data.overview.assessment_type],
              ['Total Questions', String(data.overview.total_questions)],
              ['MCQ Questions', String(data.overview.mcq_questions)],
              ['Coding Questions', String(data.overview.coding_questions)],
              ['Total Marks', String(data.overview.total_marks)],
            ].map(([label, value], i) => (
              <div
                key={i}
                className="border-r last:border-r-0 border-gray-200 pr-3"
              >
                <p className="text-[13px] text-slate-500 mb-1">{label}</p>
                <p className="font-semibold text-slate-800">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RULES */}
        <div className="bg-[#FAFBFC] border border-gray-200 rounded-xl p-5 mt-5">
          <h3 className="text-sm font-semibold text-gray-800">
            Assessment Rules
          </h3>
          <div className="h-px bg-gray-200 mt-3 mb-4" />

          <ul className="space-y-3 text-sm text-gray-700">
            {data.rules.map((rule: string, i: number) => (
              <li key={i} className="flex gap-2 items-center">
                <span className="mt-1 text-gray-800">◆</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* FOOTER */}
        <div className="bg-[#FAFBFC] border border-gray-200 rounded-xl p-5 mt-5">
          <h3 className="text-sm font-semibold text-gray-800">
            Evaluation & Results
          </h3>
          <div className="h-px bg-gray-200 mt-3 mb-4" />

          <p className="text-sm text-gray-600 mb-4">
            {data.evaluation.mcq}
          </p>

          <p className="text-sm text-gray-600 mb-4">
            {data.evaluation.coding}
          </p>

          <div className="flex justify-center">
            <p className="text-sm font-medium text-[#C46800]">
              {data.start_disabled_reason}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
