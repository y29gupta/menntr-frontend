'use client';

import ReusablePerformanceBarChart from '@/app/components/charts/PerformanceBarChart';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

type PerformanceBarData = {
  label: string;
  score: number;
  attempt: number;
  rawScore: string;
};

const data = [
  { name: 'Jan', score: 60 },
  { name: 'Feb', score: 75 },
  { name: 'Mar', score: 45 },
  { name: 'Apr', score: 82 },
  { name: 'May', score: 70 },
];

const performanceData: PerformanceBarData[] = [
  {
    label: 'Aptitude Mock - Jan 2025',
    score: 60,
    attempt: 1,
    rawScore: '18/30',
  },
  {
    label: 'Aptitude Mock - Feb 2025',
    score: 82,
    attempt: 1,
    rawScore: '25/30',
  },
  {
    label: 'Aptitude Mock - Mar 2025',
    score: 45,
    attempt: 2,
    rawScore: '14/30',
  },
  {
    label: 'Aptitude Mock - Apr 2025',
    score: 75,
    attempt: 1,
    rawScore: '23/30',
  },
];

export default function PerformanceChart() {
  return (
    <div className="bg-white rounded-xl p-5  border border-[#DBE3E9] shadow-[0px_0px_8px_0px_#0F172A1F] ">
      <h3 className="font-semibold mb-4">Assessment wise performance</h3>
      <ReusablePerformanceBarChart data={performanceData} barColor="#4F46E5" />

      {/* <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="score" />
        </BarChart>

      </ResponsiveContainer> */}
    </div>
  );
}
