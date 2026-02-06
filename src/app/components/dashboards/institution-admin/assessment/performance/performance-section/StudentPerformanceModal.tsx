'use client';

import { useState } from 'react';
import PerformanceTabs from '../PerformanceTabs';

/* ================= TYPES ================= */

type TabKey = 'summary' | 'section' | 'integrity';

type SectionPerformance = {
  section: string;
  score: string;
  accuracy: string;
};

type StudentPerformance = {
  name: string;
  email: string;
  attemptLabel: string;
  summary: {
    status: string;
    startTime: string;
    endTime: string;
    duration: string;
    score: string;
    percentage: string;
  };
  sections: SectionPerformance[];
  integrity: {
    violations: number;
    interruptions: number;
  };
};

/* ================= COMPONENT ================= */

export default function StudentPerformanceModal({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: StudentPerformance | null;
}) {
  const tabs = [
    { key: 'summary', label: 'Overall Summary' },
    { key: 'section', label: 'Section-wise Performance' },
    { key: 'integrity', label: 'Integrity & Monitoring' },
  ] as const;

  const [activeTab, setActiveTab] = useState<TabKey>('summary');

  if (!open || !data) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="w-full md:max-w-4xl bg-white rounded-t-2xl md:rounded-2xl p-5 max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-sm font-semibold">
              Student Performance Details (Aptitude Mock – Jan 2025)
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-500 text-lg">
            ✕
          </button>
        </div>
        <hr className="my-3 border border-[#C3CAD9]" />

        {/* STUDENT */}
        <div className="mt-3 flex justify-between items-center text-sm">
          <div>
            <span className="font-medium">{data.name}</span>
            <p className="text-xs text-gray-500">{data.email}</p>
          </div>
          <span className="text-xs text-gray-500">{data.attemptLabel}</span>
        </div>

        {/* TABS */}
        <PerformanceTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {/* CONTENT — ALL TABS RENDER */}
        <div className="mt-4">
          {activeTab === 'summary' && <OverallSummary summary={data.summary} />}
          {activeTab === 'section' && <SectionWise sections={data.sections} />}
          {activeTab === 'integrity' && <Integrity integrity={data.integrity} />}
        </div>
      </div>
    </div>
  );
}

/* ================= SUMMARY TAB ================= */

const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

const OverallSummary = ({ summary }: { summary: StudentPerformance['summary'] }) => (
  <div className="flex flex-col gap-6 text-sm">
    <div>
      <p className="mb-2 text-xs font-medium text-gray-600">Attempt Summary</p>
      <InfoCard>
        <InfoItem label="Completion Status" value={summary.status} showDivider />
        <InfoItem label="Start Date & Time" value={formatDateTime(summary.startTime)} showDivider />
        <InfoItem label="End Date & Time" value={formatDateTime(summary.endTime)} showDivider />
        <InfoItem label="Duration" value={summary.duration} />
      </InfoCard>
    </div>

    <div>
      <p className="mb-2 text-xs font-medium text-gray-600">Overall Performance</p>
      <InfoCard>
        <InfoItem label="Overall Score" value={summary.score} showDivider />
        <InfoItem label="Overall Percentage" value={summary.percentage} />
      </InfoCard>
    </div>
  </div>
);

/* ================= SECTION TAB ================= */

const SectionWise = ({ sections }: { sections: SectionPerformance[] }) => (
  <div className="border border-[#C3CAD9] rounded-xl overflow-hidden text-sm">
    <div className="grid grid-cols-3 bg-gray-50 font-medium text-gray-700">
      <div className="p-3">Section</div>
      <div className="p-3">Score</div>
      <div className="p-3">Accuracy</div>
    </div>

    {sections.map((s, i) => (
      <div key={i} className="grid grid-cols-3 border-t border-[#C3CAD9] ">
        <div className="p-3">{s.section}</div>
        <div className="p-3">{s.score}</div>
        <div className="p-3">{s.accuracy}</div>
      </div>
    ))}
  </div>
);

/* ================= INTEGRITY TAB ================= */

const Integrity = ({ integrity }: { integrity: StudentPerformance['integrity'] }) => (
  <InfoCard>
    <InfoItem label="Violations" value={integrity.violations} showDivider />
    <InfoItem label="Interruptions" value={integrity.interruptions} />
  </InfoCard>
);

/* ================= SHARED CARD STYLE ================= */

const InfoCard = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
      {children}
    </div>
  </div>
);

const InfoItem = ({
  label,
  value,
  showDivider = false,
}: {
  label: string;
  value?: React.ReactNode;
  showDivider?: boolean;
}) => (
  <div className="relative flex flex-col px-4">
    {showDivider && (
      <span className="absolute right-[-0.75rem] top-1/2 h-12 w-px -translate-y-1/2 bg-gray-300" />
    )}
    <span className="text-xs text-gray-500">{label}</span>
    <span className="font-medium text-gray-900">{value}</span>
  </div>
);
