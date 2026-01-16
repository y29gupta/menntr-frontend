'use client';

type TabKey = 'performance' | 'questions' | 'settings';

type Props = {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
  questionCount: number;
};

const PerformanceTabs = ({ activeTab, onChange, questionCount }: Props) => {
  const tabs = [
    { key: 'performance', label: 'Performance' },
    { key: 'questions', label: `Questions (${questionCount})` },
    { key: 'settings', label: 'Settings' },
  ] as const;

  return (
    <div className="border-b mb-4 border-gray-200">
      <div className="flex gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`pb-2 text-sm font-medium transition
              ${
                activeTab === tab.key
                  ? 'text-purple-600! border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PerformanceTabs;
