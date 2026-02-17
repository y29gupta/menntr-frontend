'use client';

import DashboardHeader from '@/app/components/dashboards/student/dashboard/DashboardHeader';
import OngoingAssessment from '@/app/components/dashboards/student/dashboard/OngoingAssessment';
import PendingAssessment from '@/app/components/dashboards/student/dashboard/PendingAssessment';
import PerformanceChart from '@/app/components/dashboards/student/dashboard/PerformanceChart';
import PlacementReadiness from '@/app/components/dashboards/student/dashboard/PlacementReadiness';
import SkillGapOverview from '@/app/components/dashboards/student/dashboard/SkillGapOverview';
import StatsCards from '@/app/components/dashboards/student/dashboard/StatsCards';
import UpcomingAssessment from '@/app/components/dashboards/student/dashboard/UpcomingAssessment';
import { studentApi } from '@/app/components/dashboards/student/student.services';
import { useQuery } from '@tanstack/react-query';

export default function StudentDashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-assessments'],
    queryFn: studentApi.getDashboardAssessments,
  });

  const { data: readinessData } = useQuery({
    queryKey: ['placement-readiness'],
    queryFn: studentApi.getPlacementReadiness,
  });
  if (isLoading) return null; //replace with skeleton

  const readinessScore = Math.round(readinessData?.readinessScore ?? 0);
  const targetReadiness = readinessData?.targetReadiness ?? 0;

  const strengths = readinessData?.strengths ?? [];
  const needsImprovement = readinessData?.needsImprovement ?? [];
  const criticalGaps = readinessData?.criticalGaps ?? [];

  const assessments =
    readinessData?.assessments?.map((assessment) => ({
      label: assessment.assessmentName,
      score: Math.round(assessment.score),
      attempt: assessment.attempts,
      rawScore: `${assessment.score}%`,
    })) ?? [];

  return (
    <div className="px-1 space-y-4 w-full bg-[#F8F9FB] min-h-screen">
      <DashboardHeader />
      <StatsCards />
      {data?.pending?.length ? <PendingAssessment assessments={data.pending} /> : null}
      {data?.ongoing?.length ? <OngoingAssessment assessments={data.ongoing} /> : null}

      {data?.upcoming?.length ? <UpcomingAssessment assessments={data.upcoming} /> : null}
      <PlacementReadiness score={readinessScore} target={targetReadiness} />
      <SkillGapOverview
        strengths={strengths}
        needsImprovement={needsImprovement}
        criticalGaps={criticalGaps}
      />
      <PerformanceChart assessments={assessments} />
    </div>
  );
}

// import React from 'react';

// const page = () => {
//   return <div>Dashboard</div>;
// };

// export default page;
