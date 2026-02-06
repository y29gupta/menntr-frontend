const stats = [
  {
    title: 'Pending assessment',
    value: '2/16',
    sub: 'Due this week',
  },
  {
    title: 'Completed assessment',
    value: '14/16',
    sub: 'Last completed: Python assessment',
  },
  {
    title: 'CGPA',
    value: '7.5/10',
    sub: 'Current cumulative grade',
  },
  {
    title: 'Current Rank',
    value: '8/58',
    sub: 'Out of 58 students',
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((card) => (
        <div key={card.title} className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500">{card.title}</p>

          <h3 className="text-xl font-semibold mt-2">{card.value}</h3>

          <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}
