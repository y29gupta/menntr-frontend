'use client';

import { useState } from 'react';
import DashboardCard from '../../dashboard/DashboardCard';
import HighestAvgDepartmentCard from '../../dashboard/HighestAvgDepartmentCard';
import AssessmentHeader from './AssessmentHeader';
import AssessmentInfoCard from './AssessmentInfoCard';
import { assessmentMetricsUI } from './assessmentMetricsUI';
import ScoreDistributionCard from './ScoreDistributionCard';
import PerformanceTabs from './PerformanceTabs';
import PerformanceSection from './PerformanceSection';
import QuestionsSection from './QuestionsSection';
import SettingConfigForm from './settings/SettingConfigForm';

type AssessmentPerformanceProps = {
  assessmentId: string;
};

const AssessmentPerformance = ({ assessmentId }: AssessmentPerformanceProps) => {
  const [activeTab, setActiveTab] = useState<'performance' | 'questions' | 'settings'>(
    'performance'
  );

  return (
    <div className="w-full min-h-screen flex flex-col gap-4 rounded-2xl bg-gradient-to-b from-white/90 to-white/70 p-4 shadow-[0_0_8px_0_rgba(15,23,42,0.12)]">
      <AssessmentHeader
        title="Assessment Performance"
        subtitle="Manage assessment performance by student wise, question wise."
      />
      <div className="w-full border-t border-gray-200" />
      <AssessmentInfoCard
        title="Aptitude Mock - Jan 2025"
        category="Aptitude"
        type="Assessment"
        department="Computer Science"
        batch="2016 - 2020"
        totalScore={100}
        duration="45 mins"
        publishedOn="23-Dec-2025, 15:45"
        expiresOn="23-Dec-2025, 17:00"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {assessmentMetricsUI.map((item, i) => (
          <DashboardCard key={i} {...item} showComparisonText={false} graphClassName="w-[100px]" />
        ))}
      </div>

      <HighestAvgDepartmentCard
        label="Completion rate"
        valueText="54%"
        percentage={54}
        barColor="linear-gradient(90deg, #DBA261 0%, #C16700 100%)"
        barBgColor="#FFEDD5"
      />

      <ScoreDistributionCard
        totalStudents={35}
        ranges={[
          {
            label: '0–30',
            count: 8,
            percentage: 23,
            barBg: '#FEE2E2',
            barFill: 'linear-gradient(90deg, #F87171 0%, #EF4444 100%)',
          },
          {
            label: '31–60',
            count: 15,
            percentage: 43,
            barBg: '#FFEDD5',
            barFill: 'linear-gradient(90deg, #FDBA74 0%, #F97316 100%)',
          },
          {
            label: '61–100',
            count: 12,
            percentage: 34,
            barBg: '#DCFCE7',
            barFill: 'linear-gradient(90deg, #4ADE80 0%, #16A34A 100%)',
          },
        ]}
      />

      <div className="flex flex-col gap-4">
        <PerformanceTabs activeTab={activeTab} onChange={setActiveTab} questionCount={25} />
        {activeTab === 'performance' && <PerformanceSection />}
        {activeTab === 'questions' && <QuestionsSection />}
        {activeTab === 'settings' && <SettingConfigForm />}
      </div>
    </div>
  );
};

export default AssessmentPerformance;
