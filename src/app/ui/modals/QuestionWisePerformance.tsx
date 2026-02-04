'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import FormDropdown from '@/app/ui/FormDropdown';
import { CandidatePerformance } from '@/app/components/dashboards/institution-admin/assessment/performance/performance-section/CandidatePerformance.columns';
import HighestAvgDepartmentCard from '@/app/components/dashboards/institution-admin/dashboard/HighestAvgDepartmentCard';
import PerformanceTabs from '@/app/components/dashboards/institution-admin/assessment/performance/PerformanceTabs';
import Reponses from '@/app/components/dashboards/institution-admin/assessment/performance/student-performance/Reponses';
import ProctoringInsights from '@/app/components/dashboards/institution-admin/assessment/performance/student-performance/Insights';

type ReportTab = 'responses' | 'proctoring';

const attemptOptions = [
  { label: 'Attempt 1', value: '1' },
  { label: 'Attempt 2', value: '2' },
];

export default function QuestionWisePerformance() {
  /* ================= FRESH STATE (RESET ON TAB SWITCH) ================= */
  const { control } = useForm({
    defaultValues: { attempt: '1' },
  });

  const [activeTab, setActiveTab] = useState<ReportTab>('responses');

  /* ================= MOCK DATA (REPLACE WITH API) ================= */
  const candidate: CandidatePerformance = {
    name: 'John Doe',
    assessmentName: 'Data Structures MCQ',
    score: '25/30',
    percentage: 83,
  } as CandidatePerformance;

  const [obtained, total] = candidate.score.split('/').map(Number);
  const percentage = candidate.percentage;

  const tabs = [
    { key: 'responses', label: 'Responses & Scores' },
    { key: 'proctoring', label: 'Proctoring Insights' },
  ] as const;

  return (
    <div className="flex flex-col gap-4">
      {/* ================= TOP SUMMARY CARD ================= */}
      {/* <HighestAvgDepartmentCard
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
      /> */}

      {/* ================= ATTEMPT DROPDOWN ================= */}
      {/* <div className="w-[160px]">
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
      </div> */}

      {/* ================= INNER REPORT TABS ================= */}
      {/* <PerformanceTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} /> */}

      {/* ================= TAB CONTENT ================= */}
      {activeTab === 'responses' && <Reponses />}

      {activeTab === 'proctoring' && (
        <ProctoringInsights
          screenshots={Array.from({ length: 13 }).map(
            (_, i) => `https://placehold.co/160x120?text=${i + 1}`
          )}
          cameraOff={false}
          tabChanged={false}
          interruptions={[
            {
              id: 1,
              title: 'Interruption 1',
              events: [
                { time: '19:03', description: 'Test Interrupted at question 1' },
                { time: '19:05', description: 'Test continued from Question 1' },
              ],
            },
            {
              id: 2,
              title: 'Interruption 2',
              events: [
                { time: '19:15', description: 'Test Interrupted at question 3' },
                { time: '19:16', description: 'Test continued from Question 3' },
              ],
            },
          ]}
        />
      )}
    </div>
  );
}
