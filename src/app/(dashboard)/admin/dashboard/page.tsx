'use client';

import { useEffect, useState } from 'react';
import { DepartmentMetric } from '@/app/components/graphs/DepartmentBarGraph';
import { buildRequirementItems } from '@/app/lib/departmentUtils';
import AcademicPerformanceCard from '@/app/components/dashboards/institution-admin/dashboard/AcademicPerformanceCard';
// import DashboardCard from '@/app/components/dashboards/institution-admin/dashboard/DashboardCard';
import DepartmentAnalyticsCard from '@/app/components/dashboards/institution-admin/dashboard/DepartmentAnalyticsCard';
import MinimumScoreRequirementCard from '@/app/components/dashboards/institution-admin/dashboard/MinimumScoreRequirementCard';
import PlacementReadinessCard from '@/app/components/dashboards/institution-admin/dashboard/PlacementReadinessCard';
import DepartmentSummaryStrip from '@/app/components/dashboards/institution-admin/dashboard/DepartmentSummaryStrip';
// import HighestAvgDepartmentCard from '@/app/components/dashboards/institution-admin/dashboard/HighestAvgDepartmentCard';
import DashboardWelcomeHeader from '@/app/components/dashboards/institution-admin/dashboard/DashboardWelcomeHeader';
import { getStudentMetricsUI } from '@/app/components/dashboards/institution-admin/dashboard/studentMetricsUI';
import { fetchDashboardData } from '@/app/lib/api/dashboardApi';
import ModuleRoute from '@/app/components/auth/ModuleRoute';
import { PERMISSIONS } from '@/app/constants/permissions';
import ProgressBarCard from '@/app/components/ui/progressCard/ProgressBarCard';
import DashboardCard from '@/app/components/ui/progressCard/DashboardCard';

const DashboardContent = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [departmentData, setDepartmentData] = useState<DepartmentMetric[]>([]);
  const [deptAnalytics, setDeptAnalytics] = useState<any>(null);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    async function loadDashboard() {
      const [metrics, deptData, meContext] = await Promise.all([
        getStudentMetricsUI(),
        fetchDashboardData<any>('/dashboard/academic-performance/departments'),
        fetchDashboardData<any>('/auth/me/context'),
      ]);

      setCards(metrics);
      const displayName = meContext.user.first_name?.trim() || meContext.institution.name;
      setUserName(displayName);
      setDepartmentData(
        deptData.departments.map((d: any) => ({
          department: d.department,
          percentage: d.averagePercentage,
        }))
      );

      setDeptAnalytics(deptData);
    }

    loadDashboard();
  }, []);

  if (!deptAnalytics) return null;

  return (
    <div className="flex flex-col gap-4 w-full">
      <DashboardWelcomeHeader userName={userName} />
      <div className="grid border grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {cards.map((item, i) => (
          <DashboardCard key={i} {...item} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <AcademicPerformanceCard />
        <PlacementReadinessCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 w-full items-stretch">
        <div className="lg:col-span-3">
          <DepartmentAnalyticsCard data={departmentData} />
        </div>

        <div className="lg:col-span-2">
          <MinimumScoreRequirementCard
            items={buildRequirementItems(departmentData, deptAnalytics.minimumScore)}
          />
        </div>
      </div>

      <DepartmentSummaryStrip data={departmentData} />

      {deptAnalytics.highestDepartment && (
        <ProgressBarCard
          label="Dept. With Highest Avg"
          valueText={`${deptAnalytics.highestDepartment.name} (${deptAnalytics.highestDepartment.averagePercentage}%)`}
          percentage={deptAnalytics.highestDepartment.averagePercentage}
          barColor="linear-gradient(90deg, #5BC376 0%, #149436 100%)"
          barBgColor="#DCFCE7"
          footerText="Showing best performance this month"
        />
      )}
    </div>
  );
};

const Page = () => {
  return (
    <ModuleRoute module={PERMISSIONS.DASHBOARD.MODULE}>
      <DashboardContent />
    </ModuleRoute>
  );
};

export default Page;
