'use client';

import { TrendingUp } from 'lucide-react';
import DepartmentBarGraph, { DepartmentMetric } from '../../../graphs/DepartmentBarGraph';

interface Props {
  data: DepartmentMetric[];
}

const DepartmentAnalyticsCard = ({ data }: Props) => {
  return (
    <div className="w-full rounded-2xl bg-[#F8FAFC] p-4 sm:p-6 shadow-[0px_0px_16px_0px_#0F172A1F]">
      <div className="mb-4 flex items-center gap-2 text-[#1E293B] font-semibold text-sm sm:text-base">
        <TrendingUp className="text-gray-500" />
        Academic Performance by department
      </div>

      <DepartmentBarGraph data={data} average={70} />
    </div>
  );
};

export default DepartmentAnalyticsCard;
