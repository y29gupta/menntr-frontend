'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

type Props = {
  value: number;
  total: number;
  gradientId: string;
  trackColor: string;
};

export default function ProgressGraph({ value, total, gradientId, trackColor }: Props) {
  const percent = Math.min((value / total) * 100, 100);

  return (
    <div className="w-full h-5">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={[{ name: 'progress', value: percent }]} layout="vertical">
          <defs>
            <linearGradient id="readyGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5BC376" />
              <stop offset="100%" stopColor="#149436" />
            </linearGradient>

            <linearGradient id="notReadyGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#EEB87A" />
              <stop offset="100%" stopColor="#E09642" />
            </linearGradient>
          </defs>

          <XAxis hide type="number" domain={[0, 100]} />
          <YAxis hide type="category" dataKey="name" />

          <Bar
            dataKey="value"
            fill={`url(#${gradientId})`}
            barSize={12}
            radius={[999, 999, 999, 999]}
            background={{
              fill: trackColor,
              radius: 999,
            }}
            isAnimationActive
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
