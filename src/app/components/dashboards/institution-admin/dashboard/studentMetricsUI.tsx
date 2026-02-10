import { GraduationCap, Users, ClipboardList } from 'lucide-react';
import { DashboardCardUI } from './dashboardCard.types';
import { fetchDashboardData } from '@/app/lib/api/dashboardApi';

export async function getStudentMetricsUI(): Promise<DashboardCardUI[]> {
  const [students, faculty, assessments] = await Promise.all([
    fetchDashboardData<any>('/dashboard/students'),
    fetchDashboardData<any>('/dashboard/faculty'),
    fetchDashboardData<any>('/dashboard/assessments'),
  ]);

  return [
    {
      title: 'Total Students',
      total: students.total,
      percentage: students.percentageChange,
      trend: students.history ?? [],
      icon: GraduationCap,
      showComparisonText: true,
    },
    {
      title: 'Faculty Members',
      total: faculty.total,
      percentage: faculty.percentageChange,
      trend: faculty.history ?? [],
      icon: Users,
      showComparisonText: true,
    },
    {
      title: 'Assessments',
      total: assessments.total,
      percentage: assessments.percentageChange,
      trend: assessments.history ?? [], // ✅ now exists
      subText: `${assessments.dueToday} due today`,
      icon: ClipboardList,
      showComparisonText: true,
    },
  ];
}

