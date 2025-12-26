'use client';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const AreaSparkline = ({ data }: { data: number[] }) => {
  const chartData = data.map((v) => ({ v }));

  const isDown = data[data.length - 1] < data[data.length - 2];

  return (
    <div className="w-[140px] h-[90px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="greenFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22C55E" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#22C55E" stopOpacity={0.05} />
            </linearGradient>

            <linearGradient id="orangeFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C46800" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#C46800" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="v"
            stroke={isDown ? '#C46800' : '#16A34A'}
            strokeWidth={2}
            fill={isDown ? 'url(#orangeFill)' : 'url(#greenFill)'}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaSparkline;
