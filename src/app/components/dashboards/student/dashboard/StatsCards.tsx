import { useQuery } from '@tanstack/react-query';
import { studentApi } from '../student.services';

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
    },
    {
      title: 'Completed assessment',
      value: `${data?.completed ?? 0}`,
      sub: 'Completed assessments',
    },
    {
      title: 'CGPA',
      value: `${data?.cgpa ?? 0}/10`,
      sub: 'Current cumulative grade',
    },
    {
      title: 'Current Rank',
      value: data?.currentRank ? `${data.currentRank}/${data.totalStudents}` : '-',
      sub: `Out of ${data?.totalStudents ?? 0} students`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((card) => (
        <div
          key={card.title}
          className="bg-white p-4 rounded-xl border border-[#DBE3E9] shadow-[0px_0px_8px_0px_#0F172A1F]"
        >
          <p className="text-sm text-gray-500">{card.title}</p>

          <h3 className="text-xl font-semibold mt-2">{card.value}</h3>

          <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}
