import { useQuery } from '@tanstack/react-query';
import { studentApi } from '../student.services';
import { CalendarCheck, ChartNoAxesCombined, Clock, GraduationCap } from 'lucide-react';

export default function StatsCards() {
  const { data, isLoading } = useQuery({
    queryKey: ['student-dashboard-stats'],
    queryFn: studentApi.getDashboardStats,
  });

  if (isLoading) {
    return <div>Loading...</div>; // Replace with skeleton later if needed
  }
  const stats = [
    {
      title: 'Pending assessment',
      value: `${data?.pending ?? 0}`,
      sub: 'Due this week',
      icon: <Clock size={20} className="text-[#192B4F]" />,
    },
    {
      title: 'Completed assessment',
      value: `${data?.completed ?? 0}`,
      sub: 'Completed assessments',
      icon: <CalendarCheck size={20} className="text-[#192B4F]" />,
    },
    {
      title: 'CGPA',
      value: `${data?.cgpa ?? 0}/10`,
      sub: 'Current cumulative grade',
      icon: <GraduationCap size={20} className="text-[#192B4F]" />,
    },
    {
      title: 'Current Rank',
      value: data?.currentRank ? `${data.currentRank}/${data.totalStudents}` : '-',
      sub: `Out of ${data?.totalStudents ?? 0} students`,
      icon: <ChartNoAxesCombined size={20} className="text-[#192B4F]" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((card) => (
        <div
          key={card.title}
          className="bg-white p-4 rounded-xl border border-[#DBE3E9] shadow-[0px_0px_8px_0px_#0F172A1F]"
        >
          <div className="flex gap-2 items-start">
            <span>{card.icon}</span>
            <p className="text-sm text-[#192B4F] ">{card.title}</p>
          </div>

          <h3 className="text-3xl font-semibold text-[#1A2C50] mt-2">{card.value}</h3>

          <p className="text-xs text-[#707A8E] mt-1">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}
