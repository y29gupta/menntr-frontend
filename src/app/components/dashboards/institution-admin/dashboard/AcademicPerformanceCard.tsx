'use client';
import { BarChart3 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchDashboardData } from '@/app/lib/api/dashboardApi';

type AcademicPerformanceResponse = {
  averagePercentage: number;
  minimumRequired: number;
  highPerformers: number;
  atRiskStudents: number;
};

const STUDENT_GROUP_COLORS: Record<string, string> = {
  'High performers': '#008E2D',
  'At-risk students': '#E09642',
};

export default function AcademicPerformanceCard() {
  // ─────────────────────────────
  // Hooks (order NEVER changes)
  // ─────────────────────────────
  const [data, setData] = useState<AcademicPerformanceResponse | null>(null);

  const radius = 80;
  const strokeWidth = 32;
  const circumference = 2 * Math.PI * radius;

  const [dashOffset, setDashOffset] = useState(circumference);

  // ─────────────────────────────
  // Fetch backend data
  // ─────────────────────────────
  useEffect(() => {
    async function load() {
      const res = await fetchDashboardData<AcademicPerformanceResponse>(
        '/dashboard/academic-performance'
      );
      setData(res);
    }
    load();
  }, []);

  // ─────────────────────────────
  // Animate donut when data arrives
  // ─────────────────────────────
  useEffect(() => {
    if (!data) return;

    const progress = (data.averagePercentage / 100) * circumference;
    setDashOffset(circumference - progress);
  }, [data, circumference]);

  // ─────────────────────────────
  // Render guard (AFTER hooks)
  // ─────────────────────────────
  if (!data) return null;

  const { averagePercentage, minimumRequired, highPerformers, atRiskStudents } = data;

  const studentBreakdown = [
    { label: 'High performers', count: highPerformers },
    { label: 'At-risk students', count: atRiskStudents },
  ];

  return (
    <div
      className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm min-w-fit"
      style={{ boxShadow: '0px 0px 8px 0px #0F172A1F' }}
    >
      <div className="flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-2">
        <div className="flex gap-2">
          <BarChart3 className="text-gray-500" />
          <div>
            <h3 className="text-sm sm:text-[16px] font-semibold text-gray-900">
              Avg Academic Performance
            </h3>
            <p className="text-xs text-gray-500">Minimum requirement: {minimumRequired}%</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
        {/* Donut */}
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 lg:w-48 lg:h-48 flex-shrink-0">
          <svg className="w-full h-full rotate-90 scale-x-[-1]" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="grad" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#7B3AEC" />
                <stop offset="50%" stopColor="#A23AEC" />
                <stop offset="100%" stopColor="#AE3AEC" />
              </linearGradient>
            </defs>

            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth={strokeWidth}
            />

            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="url(#grad)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
            />
          </svg>

          {/* Center (UNCHANGED) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="absolute w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full"
              style={{
                background: 'linear-gradient(140.36deg, #FCFDFF 14.03%, #D6DCE1 86.47%)',
              }}
            />
            <div
              className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135.66deg, #EDEFF1 13.37%, #E5E9EC 85.76%)',
              }}
            >
              <span className="text-[36px] font-semibold text-[#1A2C50]">{averagePercentage}%</span>
            </div>
          </div>
        </div>

        {/* Student Breakdown */}
        <div className="space-y-4 sm:space-y-6 pl-2">
          {studentBreakdown.map((item, i) => {
            const color = STUDENT_GROUP_COLORS[item.label] ?? '#64748B';

            return (
              <div key={i}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-xs sm:text-sm text-gray-900">{item.label}</span>
                </div>

                <p className="text-xl sm:text-2xl font-semibold ml-4" style={{ color }}>
                  {item.count} students
                </p>

                {/* Divider ONLY between items */}
                {i === 0 && (
                  <div className="h-px bg-slate-100 my-4 w-fit">
                    <span className="block w-[160px]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
