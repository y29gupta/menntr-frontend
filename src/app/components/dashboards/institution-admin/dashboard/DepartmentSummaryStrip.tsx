'use client';

import { DepartmentMetric } from '@/app/components/graphs/DepartmentBarGraph';

interface Props {
  data: DepartmentMetric[];
  minScore?: number;
}

const DepartmentSummaryStrip = ({ data, minScore = 70 }: Props) => {
  const total = data.length;
  const above = data.filter((d) => d.percentage >= minScore).length;
  const below = total - above;

  return (
    <div className="w-full border rounded-full bg-white px-4 py-3 text-center shadow-[0px_0px_12px_0px_#0F172A1F]">
      <span className="text-sm sm:text-base font-medium text-[#1E293B]">
        {total} departments
        <span className="mx-2 text-[#94A3B8]">|</span>
        {above} above requirement
        <span className="mx-2 text-[#94A3B8]">|</span>
        {below} below
      </span>
    </div>
  );
};

export default DepartmentSummaryStrip;
