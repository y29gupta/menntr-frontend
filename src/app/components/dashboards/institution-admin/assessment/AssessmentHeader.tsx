'use client';

import AssessmentIcon from '@/app/components/icons/AssessmentIcon';
// import AssessmentIcon from '../../icons/AssessmentIcon';
import Buttons from '@/app/ui/Button';

type Props = {
  activeTab: 'Active' | 'Drafts' | 'Completed';
  onTabChange: (tab: Props['activeTab']) => void;
  onCreate: () => void;
  tabCounts: Record<'Active' | 'Drafts' | 'Completed', number>;
};

const tabs: Props['activeTab'][] = ['Active', 'Drafts', 'Completed'];

export default function AssessmentHeader({ activeTab, onTabChange, onCreate, tabCounts }: Props) {
  return (
    <div className="w-full  flex flex-col gap-4">
      {/* Top row: title + CTA */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex gap-2 items-center">
            <AssessmentIcon />
            <h2 className="text-lg sm:text-[20px] font-semibold text-gray-900">Assessments</h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Create, manage and track institution assessments
          </p>
        </div>

        <button
          onClick={onCreate}
          className="w-full sm:w-auto whitespace-nowrap text-xs sm:text-sm !text-white bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] px-6 py-2.5 rounded-full flex items-center justify-center gap-2 font-medium"
        >
          <span>+</span> Create Assessment
        </button>
      </div>

      {/* Tabs – EXACT Organization style */}
      <div
        className="ml-2
        flex gap-4
        border-b border-[#616573]
        
        whitespace-nowrap
        scrollbar-hide"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`relative pb-2 px-3 text-sm font-medium transition-colors shrink-0
              ${activeTab === tab ? '!text-[#7C3AED]' : '!text-[#616570] hover:text-gray-700'}
            `}
          >
            {tab} <span className="pl-1">({tabCounts[tab]}) </span>
            {activeTab === tab && (
              <span className="absolute left-0 -bottom-[1px] h-[2px] w-full  rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
