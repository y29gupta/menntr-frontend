'use client';

type Tab<T extends string> = {
  key: T;
  label: string;
};

type Props<T extends string> = {
  tabs: readonly Tab<T>[];
  activeTab: T;
  onChange: (tab: T) => void;
};

export default function PerformanceTabs<T extends string>({ tabs, activeTab, onChange }: Props<T>) {
  return (
    <div className="border-b border-gray-200">
      <div className="flex gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`pb-3 text-[16px] font-medium transition
              ${
                activeTab === tab.key
                  ? 'text-purple-600! border-b-2 border-purple-600'
                  : 'text-gray-500! hover:text-gray-700!'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
