'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';

/* ---------------- types ---------------- */
export type PerformanceBarData = {
  label: string;
  score: number; // 0–100
  attempt: number;
  rawScore: string;
};

type Props = {
  data: PerformanceBarData[];
  barColor?: string; // single color support
  enableScoreGradient?: boolean; // multi color toggle
};

/* ---------------- figma-based color logic (GRADIENTS) ---------------- */
const getBarColor = (score: number) => {
  if (score >= 70) return 'url(#greenGradient)';
  if (score >= 40) return 'url(#orangeGradient)';
  return 'url(#redGradient)';
};

/* ---------------- figma tooltip ---------------- */
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  const d = payload[0].payload as PerformanceBarData;

  return (
    <div className="w-[220px] rounded-2xl bg-white p-4 shadow-lg">
      <p className="text-xs text-[#333846] mb-1">Assessment</p>
      <p className="text-sm font-semibold text-[#192B4F] mb-1">{d.label}</p>
      <div className="border-b-[#DBE3E9] border-b" />

      <div className="space-y-2 text-sm my-1">
        <div className="flex flex-col gap-1">
          <span className="text-[#333846]">Attempt</span>
          <span className="font-semibold text-[#192B4F]">{d.attempt}</span>
        </div>
        <div className="border-b-[#DBE3E9] border-b" />

        <div className="flex flex-col gap-1">
          <span className="text-[#333846]">Score</span>
          <span className="font-semibold text-[#192B4F]">{d.score}%</span>
        </div>
        <div className="border-b-[#DBE3E9] border-b" />

        <div className="flex flex-col gap-1">
          <span className="text-[#333846]">Raw Score</span>
          <span className="font-semibold text-[#192B4F]">{d.rawScore}</span>
        </div>
        <div className="border-b-[#DBE3E9] border-b" />
      </div>
    </div>
  );
};

/* ---------------- reusable bar chart ONLY ---------------- */
const ReusablePerformanceBarChart = ({ data = [], enableScoreGradient, barColor }: Props) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const chartMinWidth = isMobile ? '100%' : `${Math.max(data.length * 120, 600)}px`; // 👈 NEVER 0

  return (
    <div className=" ">
      <div className="h-[360px] " style={{ minWidth: chartMinWidth }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            style={{ outline: 'none' }}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            {/* ---------- SVG GRADIENT DEFINITIONS ---------- */}
            <defs>
              <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5BC376" />
                <stop offset="100%" stopColor="#149436" />
              </linearGradient>

              <linearGradient id="orangeGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#DBA261" />
                <stop offset="100%" stopColor="#C16700" />
              </linearGradient>

              <linearGradient id="redGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#D37B75" />
                <stop offset="100%" stopColor="#F44336" />
              </linearGradient>
            </defs>
            {/* ------------------------------------------------ */}

            <CartesianGrid stroke="#E5E7EB" vertical={false} />

            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: '#64748B' }}
              axisLine={false}
              tickLine={false}
              padding={{ left: 0, right: 0 }}
            />

            <YAxis
              domain={[0, 100]}
              tickCount={11}
              width={32}
              tick={{ fontSize: 12, fill: '#64748B' }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip content={<CustomTooltip />} cursor={false} />

            {/* <Bar dataKey="score" radius={[6, 6, 0, 0]} barSize={14}>
              {data.map((item, index) => (
                <Cell key={index} fill={getBarColor(item.score)} />
              ))}
            </Bar> */}
            <Bar
              dataKey="score"
              radius={[6, 6, 0, 0]}
              barSize={14}
              fill={!enableScoreGradient ? barColor || '#4F46E5' : undefined}
            >
              {enableScoreGradient &&
                data.map((item, index) => <Cell key={index} fill={getBarColor(item.score)} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReusablePerformanceBarChart;
