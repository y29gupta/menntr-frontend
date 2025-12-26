'use client';
import { DepartmentMetric } from '@/app/components/graphs/DepartmentBarGraph';
import { studentMetric } from '@/app/constants/studentMetric';
import { buildRequirementItems } from '@/app/lib/departmentUtils';
import AcademicPerformanceCard from '@/app/ui/AcademicPerformanceCard';
import DashboardCard from '@/app/ui/DashboardCard';
import DepartmentAnalyticsCard from '@/app/ui/DepartmentAnalyticsCard';
import DepartmentSummaryStrip from '@/app/ui/DepartmentSummaryStrip';
import HighestAvgDepartmentCard from '@/app/ui/HighestAvgDepartmentCard';
import MinimumScoreRequirementCard from '@/app/ui/MinimumScoreRequirementCard';
import PlacementReadinessCard from '@/app/ui/PlacementReadinessCard';

const Page = () => {
  const departmentData: DepartmentMetric[] = [
    { department: 'CSE', percentage: 95 },
    { department: 'EEE', percentage: 55 },
    { department: 'MECH', percentage: 69 },
    { department: 'ECE', percentage: 85 },
    { department: 'CHEM', percentage: 55 },
  ];
  return (
    <div className=" flex flex-col gap-4 w-full">
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
