import { LucideIcon } from 'lucide-react';

export type DashboardCardUI = {
  title: string;
  total: number | string;
  percentage: number;
  trend: number[];
  icon: LucideIcon;
  subText?: string;
  showComparisonText?: boolean;
  className?: string;
  graphClassName?: string;
};
