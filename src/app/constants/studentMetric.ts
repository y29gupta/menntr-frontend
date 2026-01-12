import { Users, GraduationCap, ClipboardList } from 'lucide-react';

export const studentMetric = [
  {
    title: 'Total Students',
    total: 110,
    percentage: 15,
    trend: [72, 180, 560, 940, 1020, 2083],
    icon: GraduationCap,
  },
  {
    title: 'Faculty Members',
    total: 15,
    percentage: -1,
    trend: [165, 162, 160, 158, 155, 50],
    icon: Users,
  },
  {
    title: 'Assessments',
    total: 12,
    percentage: -10,
    trend: [20, 18, 17, 55, 73, 120],
    subText: '3 due today',
    icon: ClipboardList,
  },
];
