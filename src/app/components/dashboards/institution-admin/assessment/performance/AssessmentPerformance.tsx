'use client';

import { useEffect, useState } from 'react';
// import DashboardCard from '../../dashboard/DashboardCard';
// import HighestAvgDepartmentCard from '../../dashboard/HighestAvgDepartmentCard';
import AssessmentHeader from './AssessmentHeader';
import AssessmentInfoCard from './AssessmentInfoCard';
import { buildAssessmentMetricsUI } from './assessmentMetricsUI';
import ScoreDistributionCard from './ScoreDistributionCard';
import PerformanceTabs from './PerformanceTabs';
import PerformanceSection from './PerformanceSection';
import QuestionsSection from './QuestionsSection';
import SettingConfigForm from './settings/SettingConfigForm';
import { fetchAssessmentOverview } from './assessmentPerformance.api';
import ProgressBarCard from '@/app/components/ui/progressCard/ProgressBarCard';
import DashboardCard from '@/app/components/ui/progressCard/DashboardCard';

type AssessmentPerformanceProps = {
  assessmentId: string;
};

type TabKey = 'performance' | 'questions' | 'settings';

const AssessmentPerformance = ({ assessmentId }: AssessmentPerformanceProps) => {
  const tabs = [
    { key: 'performance', label: 'Performance' },
    { key: 'questions', label: 'Questions (25)' },
    { key: 'settings', label: 'Settings' },
  ] as const;

  const [activeTab, setActiveTab] = useState<TabKey>('performance');
  const [overview, setOverview] = useState<any>(null);
  const [questionData, setQuestionData] = useState<any[]>([]);
  const [attempts, setAttempts] = useState<number[]>([]);

  useEffect(() => {
    fetchAssessmentOverview(assessmentId).then((res) => {
      setOverview(res.data);
    });
  }, [assessmentId]);

  const metricsUI = buildAssessmentMetricsUI(overview);

  const scoreDistribution = overview?.scoreDistribution as Record<string, number> | undefined;
  const attemptedStudents = scoreDistribution
    ? Object.values(scoreDistribution).reduce<number>((sum, v) => sum + v, 0)
    : 0;

  const scoreRanges = scoreDistribution
    ? [
        {
          label: '0–30',
          count: scoreDistribution['0-30'] ?? 0,
          barBg: '#FEE2E2',
          barFill: 'linear-gradient(90deg, #F87171 0%, #EF4444 100%)',
        },
        {
          label: '31–60',
          count: scoreDistribution['31-60'] ?? 0,
          barBg: '#FFEDD5',
          barFill: 'linear-gradient(90deg, #FDBA74 0%, #F97316 100%)',
        },
        {
          label: '61–100',
          count: scoreDistribution['61-100'] ?? 0,
          barBg: '#DCFCE7',
          barFill: 'linear-gradient(90deg, #4ADE80 0%, #16A34A 100%)',
        },
      ].map((item) => ({
        ...item,
        percentage: attemptedStudents ? Math.round((item.count / attemptedStudents) * 100) : 0,
      }))
    : [];

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
        {metricsUI.map((item, i) => (
          <DashboardCard key={i} {...item} showComparisonText={false} graphClassName="w-[100px]" />
        ))}
      </div>

      <ProgressBarCard
        label="Completion rate"
        valueText={`${overview?.metrics.completionRate ?? 0}%`}
        percentage={overview?.metrics.completionRate ?? 0}
        barColor="linear-gradient(90deg, #DBA261 0%, #C16700 100%)"
        barBgColor="#FFEDD5"
      />

      <ScoreDistributionCard totalStudents={attemptedStudents} ranges={scoreRanges} />

      <div className="flex flex-col gap-4">
        <PerformanceTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        {activeTab === 'performance' && <PerformanceSection assessmentId={assessmentId} />}
        {activeTab === 'questions' && <QuestionsSection />}
        {activeTab === 'settings' && <SettingConfigForm />}
      </div>
    </div>
  );
};

export default AssessmentPerformance;
