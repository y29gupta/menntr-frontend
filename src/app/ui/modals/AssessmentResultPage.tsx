'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, ArrowUpFromLine, MessageSquareMore } from 'lucide-react';
import QuestionWisePerformance from './QuestionWisePerformance';

export default function AssessmentResultPage() {
  const [activeTab, setActiveTab] = useState<'overall' | 'question'>('overall');

  const data = {
    title: 'Assessment Result',
    subtitle: 'Data Structures MCQ',
    submittedOn: '08/10/2025',

    score: 78,
    total: 100,

    correct: '25/30',
    accuracy: 84,
    timeTaken: '42 mins',
    difficulty: 'Medium',

    topics: [
      { label: 'Data Structures', value: 90, color: '#22C55E' },
      { label: 'Algorithms', value: 63, color: '#F59E0B' },
      { label: 'Time Complexity', value: 29, color: '#EF4444' },
    ],

    strengths: ['Arrays', 'Linked lists', 'Basic problem solving'],
    improvements: ['Recursion', 'Time complexity', 'Edge case handling'],
  };

  /* ================= CIRCLE GRAPH ================= */
  const size = 200;
  const radius = 70;
  const strokeWidth = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = (data.score / data.total) * circumference;

  const [dashOffset, setDashOffset] = useState(circumference);
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    requestAnimationFrame(() => {
      setDashOffset(circumference - progress);
    });

    setTimeout(() => {
      setBars(data.topics.map((t) => t.value));
    }, 250);
  }, []);

  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-[0_20px_40px_rgba(15,23,42,0.12)] overflow-hidden">
        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center px-8 py-5">
          <div className="flex flex-col">
            <h1 className="text-xl text-[#0F172A]">{data.title}</h1>
            <h2 className="text-sm text-gray-500">{data.subtitle}</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2 text-right text-sm mt-4">
              <p className="text-gray-600">Submitted On</p>
              <p className="font-medium text-gray-600">: {data.submittedOn}</p>
            </div>

            <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-purple-500 text-purple-600! text-sm font-medium">
              <ArrowUpFromLine size={16} />
              Export
            </button>
          </div>
        </div>

        <div className="h-px bg-gray-200 w-full" />

        {/* ================= TABS ================= */}
        <div className="flex gap-10 px-8 text-sm font-medium">
          <button
            onClick={() => setActiveTab('overall')}
            className={`py-3 border-b-2 ${
              activeTab === 'overall'
                ? 'border-purple-600 text-purple-600!'
                : 'border-transparent text-gray-500!'
            }`}
          >
            Overall Performance
          </button>

          <button
            onClick={() => setActiveTab('question')}
            className={`py-3 border-b-2 ${
              activeTab === 'question'
                ? 'border-purple-600 text-purple-600!'
                : 'border-transparent text-gray-500!'
            }`}
          >
            Question wise performance
          </button>
        </div>

        <div className="h-px bg-gray-200 w-full" />

        {/* ================= BODY ================= */}
        <div className="p-8 space-y-8">
          {activeTab === 'overall' ? (
            <>
              {/* SCORE + SNAPSHOT */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* OVERALL SCORE */}
                <div className="relative bg-gradient-to-b from-green-50 to-white rounded-2xl shadow-[0_12px_32px_rgba(34,197,94,0.25)] p-6 flex flex-col items-center gap-10">
                  <div className="flex items-center gap-2 text-[16px] font-bold mb-4">
                    <img src="/assets/group.svg" className="w-5 h-5" />
                    Overall Score
                  </div>

                  <div className="relative w-[200px] h-[200px]">
                    <svg
                      width={size}
                      height={size}
                      viewBox="0 0 200 200"
                      className="rotate-90 scale-x-[-1]"
                    >
                      <circle
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth={strokeWidth}
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        stroke="#22C55E"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        style={{
                          transition: 'stroke-dashoffset 1.3s cubic-bezier(0.4,0,0.2,1)',
                        }}
                      />
                    </svg>

                    {/* CENTER – EXACT ORIGINAL */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="absolute w-[140px] h-[140px] rounded-full"
                        style={{
                          background: 'linear-gradient(140deg, #F9FAFB 15%, #E5E7EB 85%)',
                        }}
                      />
                      <div
                        className="absolute w-[120px] h-[120px] rounded-full flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, #EEF2F7 15%, #E5E9EC 85%)',
                        }}
                      >
                        <span className="text-[28px] font-semibold">
                          {data.score}/{data.total}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-green-600 text-[16px] font-bold">
                    <CheckCircle size={20} />
                    Passed
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-green-500 rounded-b-2xl" />
                </div>

                {/* PERFORMANCE SNAPSHOT */}
                <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.1)] p-6 space-y-6">
                  <div className="flex items-center gap-2 font-bold">
                    <img src="/assets/vector.svg" className="w-5 h-5" />
                    Performance Snapshot
                  </div>

                  <SnapshotRow label="Correct answers" value={data.correct} percent={83} />
                  <SnapshotRow
                    label="Accuracy"
                    value={`${data.accuracy}%`}
                    percent={data.accuracy}
                  />

                  <div className="grid grid-cols-2 gap-5 pt-2">
                    <SnapshotPill label="Time taken" value={data.timeTaken} />
                    <SnapshotPill label="Difficulty level" value={data.difficulty} />
                  </div>
                </div>
              </div>

              {/* TOPIC PERFORMANCE */}
              <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.1)] p-6 space-y-7">
                <h3 className="flex items-center gap-2 font-bold!">
                  <img src="/assets/per.svg" className="w-5 h-5" />
                  Topic Performance
                </h3>

                {data.topics.map((t, i) => (
                  <div key={t.label}>
                    <div className="flex justify-between text-sm font-medium mb-2">
                      <span>{t.label}</span>
                      <span>{t.value}%</span>
                    </div>

                    <div className="h-[8px] bg-[#EEF2F7] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${bars[i] || 0}%`,
                          backgroundColor: t.color,
                          transition: 'width 1.2s ease',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* STRENGTHS / IMPROVEMENTS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InfoCard title="⭐ Strengths" subtitle="You did well in" items={data.strengths} />
                <InfoCard
                  title="⚠️ Needs Improvement"
                  subtitle="Work on these"
                  items={data.improvements}
                />
              </div>

              {/* FEEDBACK */}
              <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.1)] p-6">
                <div className="flex gap-2">
                  <MessageSquareMore size={18} />
                  <h3 className="font-bold!">Feedback</h3>
                </div>
                <p className="text-[15px] text-gray-600">
                  Good job! You're performing above average. Focus on weak topics to improve your
                  placement readiness.
                </p>
              </div>
            </>
          ) : (
            <QuestionWisePerformance />
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= HELPERS (UNCHANGED) ================= */

function SnapshotRow({ label, value, percent }: any) {
  return (
    <div className="bg-[#F8FAFC] rounded-xl px-5 py-4 shadow-inner space-y-3">
      <div className="flex justify-between">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="font-semibold">{value}</span>
      </div>
      <div className="h-[6px] bg-[#E5E7EB] rounded-full">
        <div
          className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-600"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function SnapshotPill({ label, value }: any) {
  return (
    <div className="bg-[#F8FAFC] rounded-xl px-5 py-4 shadow-inner">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}

function InfoCard({ title, subtitle, items }: any) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-green-50 to-white shadow-[0_10px_30px_rgba(15,23,42,0.1)] p-6">
      <h3 className="font-bold!">{title}</h3>
      <p className="text-sm text-gray-600 mb-5">{subtitle}</p>
      <ul className="space-y-3">
        {items.map((i: string) => (
          <li key={i} className="flex gap-2 text-sm">
            <span className="mt-1 text-gray-800">◆</span>
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
