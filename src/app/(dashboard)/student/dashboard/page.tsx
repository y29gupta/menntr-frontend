'use client';

import DashboardHeader from '@/app/components/dashboards/student/dashboard/DashboardHeader';
import OngoingAssessment from '@/app/components/dashboards/student/dashboard/OngoingAssessment';
import PerformanceChart from '@/app/components/dashboards/student/dashboard/PerformanceChart';
import PlacementReadiness from '@/app/components/dashboards/student/dashboard/PlacementReadiness';
import SkillGapOverview from '@/app/components/dashboards/student/dashboard/SkillGapOverview';
import StatsCards from '@/app/components/dashboards/student/dashboard/StatsCards';
import UpcomingAssessment from '@/app/components/dashboards/student/dashboard/UpcomingAssessment';

export default function StudentDashboardPage() {
  return (
    <div className="px-1 space-y-4 w-full bg-[#F8F9FB] min-h-screen">
      <DashboardHeader />
      <StatsCards />
      <OngoingAssessment />
      <UpcomingAssessment />
      <PlacementReadiness />
      <SkillGapOverview />
      <PerformanceChart />
    </div>
  );
}

// import React from 'react';

// const page = () => {
//   return <div>Dashboard</div>;
// };

// export default page;
