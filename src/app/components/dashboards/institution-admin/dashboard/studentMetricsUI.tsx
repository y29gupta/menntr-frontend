import { studentMetricBackend } from '@/app/constants/studentMetric';
import { DashboardCardUI } from './dashboardCard.types';
import { ClipboardList, GraduationCap, Users } from 'lucide-react';

export const studentMetricsUI: DashboardCardUI[] = studentMetricBackend
  .map((item): DashboardCardUI | null => {
    switch (item.label) {
      case 'STUDENTS':
        return {
          title: 'Total Students',
          total: item.count,
          percentage: item.delta,
          trend: item.history,
          icon: GraduationCap,
          showComparisonText: true,
        };

      case 'FACULTY':
        return {
          title: 'Faculty Members',
          total: item.count,
          percentage: item.delta,
          trend: item.history,
          icon: Users,
          showComparisonText: true,
        };

      case 'ASSESSMENTS':
        return {
          title: 'Assessments',
          total: item.count,
          percentage: item.delta,
          trend: item.history,
          subText: `${item.dueToday} due today`,
          icon: ClipboardList,
          showComparisonText: true,
        };

      default:
        return null;
    }
  })
  .filter((item): item is DashboardCardUI => item !== null);
