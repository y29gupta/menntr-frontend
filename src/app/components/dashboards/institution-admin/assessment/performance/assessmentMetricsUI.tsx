import { Percent, Clock } from 'lucide-react';
import { DashboardCardUI } from '../../dashboard/dashboardCard.types';
import { buildAssessmentMetricsBackend } from './assessmentMetricsBackend';

export const buildAssessmentMetricsUI = (overview: any): DashboardCardUI[] =>
  buildAssessmentMetricsBackend(overview)
    .map((item): DashboardCardUI | null => {
      switch (item.label) {
        case 'ATTEMPT_RATE':
          return {
            title: 'Attempt Rate',
            total: `${Math.round(item.value * 100)}%`,
            percentage: item.delta,
            trend: item.history,
            subText: `${item.attempted} of ${item.totalStudents} students attempted`,
            icon: Percent,
            showComparisonText: false,
          };

        case 'AVG_SCORE':
          return {
            title: 'Average Score',
            total: `${Math.round(item.value * 100)}%`,
            percentage: item.delta,
            trend: item.history,
            icon: Percent,
            showComparisonText: false,
          };

        case 'AVG_TIME':
          return {
            title: 'Average Time Taken',
            total: `${item.value} min`,
            percentage: item.delta,
            trend: item.history,
            subText: `Out of ${item.maxTime} minutes`,
            icon: Clock,
            showComparisonText: false,
          };

        default:
          return null;
      }
    })
    .filter((item): item is DashboardCardUI => item !== null);
