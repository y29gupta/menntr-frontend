'use client';
import { DepartmentMetric } from '@/app/components/graphs/DepartmentBarGraph';
import { studentMetric } from '@/app/constants/studentMetric';
import { buildRequirementItems } from '@/app/lib/departmentUtils';
import AcademicPerformanceCard from '@/app/components/dashboards/institution-admin/dashboard/AcademicPerformanceCard';
import DashboardCard from '@/app/components/dashboards/institution-admin/dashboard/DashboardCard';
import DepartmentAnalyticsCard from '@/app/components/dashboards/institution-admin/dashboard/DepartmentAnalyticsCard';
import MinimumScoreRequirementCard from '@/app/components/dashboards/institution-admin/dashboard/MinimumScoreRequirementCard';
import PlacementReadinessCard from '@/app/components/dashboards/institution-admin/dashboard/PlacementReadinessCard';
import DepartmentSummaryStrip from '@/app/components/dashboards/institution-admin/dashboard/DepartmentSummaryStrip';
import HighestAvgDepartmentCard from '@/app/components/dashboards/institution-admin/dashboard/HighestAvgDepartmentCard';
import DashboardWelcomeHeader from '@/app/components/dashboards/institution-admin/dashboard/DashboardWelcomeHeader';

const Page = () => {
  const departmentData: DepartmentMetric[] = [
    { department: 'CSE', percentage: 85 },
    { department: 'EEE', percentage: 55 },
    { department: 'MECH', percentage: 79 },
    { department: 'ECE', percentage: 55 },
    { department: 'CHEM', percentage: 55 },
  ];
  return (
    <div className=" flex flex-col gap-4 w-full">
      <DashboardWelcomeHeader userName="Javed" showAlert />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
        {studentMetric.map((item, i) => (
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
          <MinimumScoreRequirementCard items={buildRequirementItems(departmentData, 70)} />
        </div>
      </div>
      <DepartmentSummaryStrip data={departmentData} />

      <HighestAvgDepartmentCard data={departmentData} />
    </div>
  );
};

export default Page;
