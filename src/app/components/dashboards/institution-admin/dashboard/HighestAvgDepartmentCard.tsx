'use client';

import { DepartmentMetric } from "@/app/components/graphs/DepartmentBarGraph";

interface Props {
  data: DepartmentMetric[];
}

const HighestAvgDepartmentCard = ({ data }: Props) => {
  if (!data.length) return null;

  const topDept = [...data].sort((a, b) => b.percentage - a.percentage)[0];

  return (
    <div className="w-full rounded-2xl bg-white p-4 sm:p-6 shadow-[0px_0px_16px_0px_#0F172A1F]">
      <p className="text-sm text-[#64748B] mb-1">Dept. With Highest Avg</p>

      <p className="text-xl sm:text-2xl font-semibold text-[#0F172A] mb-4">
        {topDept.department} ({topDept.percentage}%)
      </p>

      {/* Progress bar */}
      <div className="h-3 w-full rounded-full bg-[#DCFCE7] overflow-hidden">
        <div
          className="h-full rounded-full bg-[#16A34A] transition-all"
          style={{ width: `${topDept.percentage}%` }}
        />
      </div>

      <p className="mt-3 text-sm text-[#16A34A] font-medium">Showing best performance this month</p>
    </div>
  );
};

export default HighestAvgDepartmentCard;
