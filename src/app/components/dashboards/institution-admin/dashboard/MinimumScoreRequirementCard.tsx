'use client';

import { RequirementItem, Status } from '@/app/lib/departmentUtils';
import { MoreHorizontal } from 'lucide-react';

interface Props {
  items: RequirementItem[];
}

const STATUS_COLOR: Record<Status, string> = {
  critical: 'bg-[#FF6B5A]',
  warning: 'bg-[#FFD24D]',
  good: 'bg-[#7BE27B]',
};

const MinimumScoreRequirementCard = ({ items }: Props) => {
  return (
    <div className="w-full h-full rounded-2xl bg-white p-4 sm:p-6 shadow-[0px_0px_16px_0px_#0F172A1F]">
      <div className="flex items-center gap-2 font-semibold text-[#1E293B]">
        <MoreHorizontal className="text-gray-500" />
        Minimum Score Requirement line
      </div>

      <div className="my-4 h-px bg-[#E2E8F0]" />

      <div className="flex flex-col gap-4">
        {items.map((item, i) => (
          <div key={i}>
            <div className="flex gap-3">
              <span className={`mt-1 h-4 w-4 rounded-full ${STATUS_COLOR[item.status]}`} />
              <p className="text-sm sm:text-base text-[#334155]">{item.text}</p>
            </div>

            {i !== items.length - 1 && <div className="mt-4 h-px bg-[#E2E8F0]" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MinimumScoreRequirementCard;
