'use client';

import ReusablePerformanceBarChart from '@/app/components/charts/PerformanceBarChart';

type PerformanceBarData = {
  label: string;
  score: number;
  attempt: number;
  rawScore: string;
};

type Props = {
  assessments: PerformanceBarData[];
};

export default function PerformanceChart({ assessments }: Props) {
  return (
    <div className="bg-white rounded-xl p-5 border border-[#DBE3E9] shadow-[0px_0px_8px_0px_#0F172A1F]">
      <h3 className="font-semibold mb-4">Assessment wise performance</h3>

      <ReusablePerformanceBarChart data={assessments} barColor="#4F46E5" />
    </div>
  );
}
