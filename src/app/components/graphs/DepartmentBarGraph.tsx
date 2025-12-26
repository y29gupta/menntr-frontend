'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, ReferenceLine } from 'recharts';

export interface DepartmentMetric {
  department: string;
  percentage: number;
}

interface Props {
  data: DepartmentMetric[];
  average?: number;
}

const DepartmentBarGraph = ({ data, average = 70 }: Props) => {
  return (
    <div className="h-[200px] sm:h-[220px] md:h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barSize={14} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
          <YAxis
            domain={[0, 100]}
            ticks={[0, 40, 60, 80, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fill: '#64748B', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <XAxis
            dataKey="department"
            tick={{ fill: '#64748B', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <defs>
            <linearGradient id="blueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4577F8" />
              <stop offset="100%" stopColor="#60AAF9" />
            </linearGradient>
          </defs>

          <ReferenceLine y={average} stroke="#94A3B8" strokeDasharray="6 6" />

          <Bar
            dataKey="percentage"
            fill="#D9E4FF"
            radius={[999, 999, 999, 999]}
            background={{ fill: '#D9E4FF', radius: 999 }}
          />

          <Bar
            dataKey="percentage"
            fill="url(#blueFill)"
            radius={[999, 999, 999, 999]}
            isAnimationActive
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepartmentBarGraph;
