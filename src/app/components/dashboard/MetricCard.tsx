interface MetricCardProps {
  title: string;
  value: string;
  bg: string;
}

export function MetricCard({ title, value, bg }: MetricCardProps) {
  return (
    <div className={`rounded-xl p-6 ${bg}`}>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-semibold mt-2 text-gray-900">{value}</p>
    </div>
  );
}
