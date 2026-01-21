'use client';

import { Controller, useForm } from 'react-hook-form';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';

import FormDropdown from '@/app/ui/FormDropdown';
import { CandidatePerformance } from '../performance-section/CandidatePerformance.columns';
import HighestAvgDepartmentCard from '../../../dashboard/HighestAvgDepartmentCard';
import PerformanceTabs from '../PerformanceTabs';
import Reponses from './Reponses';

const attemptOptions = [
  { label: 'Attempt 1', value: '1' },
  { label: 'Attempt 2', value: '2' },
];

type Props = {
  open: boolean;
  onClose: () => void;
  candidate: CandidatePerformance | null;
  onNext: () => void;
  onPrev: () => void;
};

type ReportTab = 'responses' | 'proctoring';

export default function ViewReportModal({ open, onClose, candidate, onNext, onPrev }: Props) {
  const { control } = useForm({
    defaultValues: { attempt: '1' },
  });

  const tabs = [
    { key: 'responses', label: 'Responses & Scores' },
    { key: 'proctoring', label: 'Proctoring Insights' },
  ] as const;

  const [activeTab, setActiveTab] = useState<ReportTab>('responses');

  if (!open || !candidate) return null;

  const [obtained, total] = candidate.score.split('/').map(Number);
  const percentage = candidate.percentage;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      {/* MODAL */}
      <div className="flex w-full max-w-4xl flex-col bg-white max-h-[85vh] rounded-xl">
        {/* ================= HEADER ================= */}
        <div
          className="
            flex flex-col gap-4 border-b border-[#E3E6EF] p-4
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          {/* LEFT */}
          <div>
            <h2 className="text-[18px] font-semibold text-[#101828]">{candidate.name}’s Report</h2>
            <p className="text-[14px] text-[#667085]">Assessment: {candidate.assessmentName}</p>
          </div>

          {/* CENTER */}
          <div className="w-full sm:w-[140px]">
            <Controller
              name="attempt"
              control={control}
              render={({ field }) => (
                <FormDropdown
                  value={field.value}
                  onChange={field.onChange}
                  options={attemptOptions}
                  placeholder="Attempt"
                />
              )}
            />
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-between sm:justify-end gap-2">
            <div className="flex gap-2">
              <button
                onClick={onPrev}
                className="flex items-center gap-2 rounded-full border border-[#7F56D9] px-3 py-2 text-[14px] font-medium text-[#7F56D9]!"
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </button>

              <button
                onClick={onNext}
                className="flex items-center gap-2 rounded-full border border-[#7F56D9] px-3 py-2 text-[14px] font-medium text-[#7F56D9]!"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <button onClick={onClose}>
              <X className="h-5 w-5 text-[#101828]" />
            </button>
          </div>
        </div>

        {/* ================= BODY (SCROLLABLE) ================= */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-4">
          <HighestAvgDepartmentCard
            label="Completion rate"
            valueText={
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold">{percentage}%</span>
                <span className="text-sm text-[#475569]">
                  {obtained}/{total}
                </span>
              </div>
            }
            percentage={percentage}
            barColor="linear-gradient(90deg, #DBA261 0%, #C16700 100%)"
            barBgColor="#FFEDD5"
          />

          <PerformanceTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

          {activeTab === 'responses' && <Reponses />}
        </div>
      </div>
    </div>
  );
}
