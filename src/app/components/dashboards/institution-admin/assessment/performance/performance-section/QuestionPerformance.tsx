'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

type QuestionPerformanceProps = {
  question: string; // "Q1"
  correctPercentage: number; // 42
  avgTime: number; // minutes
  difficulty: 'Easy' | 'Medium' | 'Hard';
};

type Props = {
  data: QuestionPerformanceProps[];
};

export const questionWiseData: QuestionPerformanceProps[] = [
  { question: 'Q1', correctPercentage: 48, avgTime: 2.1, difficulty: 'Medium' },
  { question: 'Q2', correctPercentage: 72, avgTime: 1.6, difficulty: 'Easy' },
  { question: 'Q3', correctPercentage: 35, avgTime: 3.2, difficulty: 'Hard' },
  { question: 'Q4', correctPercentage: 81, avgTime: 1.4, difficulty: 'Easy' },
  { question: 'Q5', correctPercentage: 42, avgTime: 2.8, difficulty: 'Medium' },
  { question: 'Q6', correctPercentage: 29, avgTime: 3.5, difficulty: 'Hard' },
  { question: 'Q7', correctPercentage: 55, avgTime: 2.4, difficulty: 'Medium' },
  { question: 'Q8', correctPercentage: 63, avgTime: 2.0, difficulty: 'Medium' },
  { question: 'Q9', correctPercentage: 41, avgTime: 2.9, difficulty: 'Hard' },
  { question: 'Q10', correctPercentage: 84, avgTime: 1.7, difficulty: 'Easy' },

  { question: 'Q11', correctPercentage: 97, avgTime: 1.3, difficulty: 'Easy' },
  { question: 'Q12', correctPercentage: 58, avgTime: 2.2, difficulty: 'Medium' },
  { question: 'Q13', correctPercentage: 46, avgTime: 2.6, difficulty: 'Medium' },
  { question: 'Q14', correctPercentage: 39, avgTime: 3.1, difficulty: 'Hard' },
  { question: 'Q15', correctPercentage: 62, avgTime: 2.0, difficulty: 'Medium' },
  { question: 'Q16', correctPercentage: 74, avgTime: 1.8, difficulty: 'Easy' },
  { question: 'Q17', correctPercentage: 33, avgTime: 3.4, difficulty: 'Hard' },
  { question: 'Q18', correctPercentage: 28, avgTime: 3.6, difficulty: 'Hard' },
  { question: 'Q19', correctPercentage: 41, avgTime: 2.7, difficulty: 'Medium' },
  { question: 'Q20', correctPercentage: 69, avgTime: 1.9, difficulty: 'Easy' },

  { question: 'Q21', correctPercentage: 76, avgTime: 1.6, difficulty: 'Easy' },
  { question: 'Q22', correctPercentage: 82, avgTime: 1.5, difficulty: 'Easy' },
  { question: 'Q23', correctPercentage: 57, avgTime: 2.3, difficulty: 'Medium' },
  { question: 'Q24', correctPercentage: 44, avgTime: 2.8, difficulty: 'Medium' },
  { question: 'Q25', correctPercentage: 49, avgTime: 2.5, difficulty: 'Medium' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  const d = payload[0].payload as QuestionPerformanceProps;

  return (
    <div className="rounded-xl bg-white p-4 shadow-lg border border-gray-100 w-[200px]">
      <p className="text-sm font-medium text-gray-900 mb-2">
        Question – {d.question.replace('Q', '')}
      </p>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Correct Responses</span>
          <span className="font-medium text-gray-900">{d.correctPercentage}%</span>
        </div>

        <div className="flex justify-between">
          <span>Average Time</span>
          <span className="font-medium text-gray-900">{d.avgTime} mins</span>
        </div>

        <div className="flex justify-between">
          <span>Difficulty</span>
          <span className="font-medium text-gray-900">{d.difficulty}</span>
        </div>
      </div>
    </div>
  );
};

const QuestionPerformance = ({ data }: Props) => {
  return (
    <div className="w-full rounded-2xl bg-white p-4 sm:p-6 shadow-[0px_0px_16px_0px_#0F172A1F]">
      <p className="text-sm font-medium text-[#0F172A] mb-4">Question wise performance</p>

      {/* Chart */}
      <div className="w-full overflow-x-auto lg:overflow-x-hidden no-scrollbar">
        <div
          className=" h-[260px] sm:h-[420px]"
          style={{
            minWidth: `${data.length * 44}px`,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="#E5E7EB" vertical={false} strokeDasharray="3 3" />

              <XAxis
                dataKey="question"
                tick={{ fontSize: 12, fill: '#64748B' }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                domain={[0, 100]}
                ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                tick={{ fontSize: 12, fill: '#64748B' }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip content={<CustomTooltip />} cursor={false} />

              <Bar dataKey="correctPercentage" radius={[6, 6, 0, 0]} fill="#4F7BFF" barSize={10} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default QuestionPerformance;
