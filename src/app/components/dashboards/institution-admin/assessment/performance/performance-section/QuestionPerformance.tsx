'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import {
  QuestionPerformanceTooltip,
  TooltipMode,
} from '../student-performance/QuestionPerformanceTooltip';

export type QuestionPerformanceBase = {
  question: string;
  marksObtained: number;
  totalMarks: number;
  correctPercentage?: number;
  avgTime?: number;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
};

type Props<T extends QuestionPerformanceBase> = {
  data: T[];
  title?: string;
  barSize?: number;
  yDomain?: [number, number];
  yTicks?: number[];
  tooltipMode?: TooltipMode;
  onBarClick?: (questionNo: string) => void;
};

function QuestionPerformance<T extends QuestionPerformanceBase>({
  data,
  title = 'Question wise performance',
  barSize = 10,
  yDomain = [0, 10],
  yTicks = [0, 2, 4, 6, 8, 10],
  tooltipMode = 'marks',
  onBarClick,
}: Props<T>) {
  return (
    <div className="w-full rounded-2xl bg-white p-4 sm:p-6 shadow-[0px_0px_16px_0px_#0F172A1F]">
      <p className="mb-4 text-sm font-medium text-[#0F172A]">{title}</p>

      <svg width="0" height="0">
        <defs>
          <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4577F8" />
            <stop offset="100%" stopColor="#60AAF9" />
          </linearGradient>
        </defs>
      </svg>

      <div className="w-full overflow-x-auto no-scrollbar">
        <div className="h-[260px] sm:h-[420px]" style={{ minWidth: `${data.length * 44}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid stroke="#E5E7EB" vertical={false} strokeDasharray="3 3" />

              <XAxis
                dataKey="question"
                tick={{ fontSize: 12, fill: '#64748B' }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                domain={yDomain}
                ticks={yTicks}
                tick={{ fontSize: 12, fill: '#64748B' }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip cursor={false} content={<QuestionPerformanceTooltip mode={tooltipMode} />} />

              <Bar
                dataKey={tooltipMode === 'percentage' ? 'correctPercentage' : 'marksObtained'}
                fill="url(#scoreGradient)"
                radius={[6, 6, 0, 0]}
                barSize={barSize}
                onClick={(d) => onBarClick?.(d.payload.question)}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default QuestionPerformance;
