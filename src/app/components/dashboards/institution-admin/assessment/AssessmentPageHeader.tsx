'use client';

import AssessmentIcon from '@/app/components/icons/AssessmentIcon';

type Props = {
  activeTab: 'Active' | 'Drafts' | 'Completed';
  onTabChange: (tab: Props['activeTab']) => void;
};

const tabs: Props['activeTab'][] = ['Active', 'Drafts', 'Completed'];

export default function AssessmentHeader({ activeTab, onTabChange }: Props) {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full flex flex-col">
        {/* Title row */}
        <div className="flex gap-2">
          <span>
            <AssessmentIcon />
          </span>
          <div>
            <h2 className="text-[20px] font-semibold text-gray-900">Assessments</h2>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-sm text-gray-500">Create, manage and track institution assessments</p>

        {/* Tabs (EXACT COPY OF ORGANIZATION STYLE) */}
        <div
          className="mt-3 ml-2
          flex gap-4
          border-b border-[#616573]
          overflow-x-auto
          overflow-y-hidden
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
              {tab}

              {/* Active underline */}
              {activeTab === tab && (
                <span className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-indigo-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
