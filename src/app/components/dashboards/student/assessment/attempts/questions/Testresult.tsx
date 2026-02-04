'use client';

import { useState } from 'react';

type TestCase = {
  name: string;
  input: string;
  expected: string; // ✅ string (from backend)
  output: string | null; // ✅ string (from backend)
  passed: boolean;
};

type Props = {
  status: 'passed' | 'failed';
  cases: TestCase[];
};

export default function TestResult({ status, cases }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const currentCase = cases[activeTab];

  if (!currentCase) return null;

  return (
    <div className="border border-[#C3CAD9] rounded-xl p-6 bg-white">
      {/* Header */}
      <div className="mb-4">
        <h3
          className={`text-[20px] font-semibold mb-1 ${
            status === 'passed' ? 'text-[#22C55E]' : 'text-[#EF4444]'
          }`}
        >
          {status === 'passed' ? 'Congratulations' : 'Wrong Answer'}
        </h3>
        <p className="text-[14px] text-[#6C768A]">
          {status === 'passed'
            ? 'You have passed the sample test cases.'
            : `You've failed ${cases.filter((c) => !c.passed).length}/${cases.length} test cases`}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-[#E5E7EB] mb-4">
        {cases.map((testCase, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`
              px-4 py-2 text-[14px] font-medium flex items-center gap-2 border-b-2 transition-colors
              ${
                activeTab === index
                  ? testCase.passed
                    ? 'border-[#22C55E] text-[#22C55E]!'
                    : 'border-[#EF4444] text-[#EF4444]!'
                  : 'border-transparent text-[#6C768A]'
              }
            `}
          >
            {testCase.passed ? '✔' : '✖'} {testCase.name}
          </button>
        ))}
      </div>

      {/* Details */}
      <div className="space-y-4">
        <div>
          <label className="text-[14px] font-medium text-[#6C768A] mb-2 block">Input</label>
          <pre className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-4 py-3 text-[14px] whitespace-pre-wrap">
            {currentCase.input}
          </pre>
        </div>

        <div>
          <label className="text-[14px] font-medium text-[#6C768A] mb-2 block">Your Output</label>
          <pre className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-4 py-3 text-[14px] whitespace-pre-wrap">
            {currentCase.output ?? 'No Output'}
          </pre>
        </div>

        <div>
          <label className="text-[14px] font-medium text-[#6C768A] mb-2 block">
            Expected Output
          </label>
          <pre className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-4 py-3 text-[14px] whitespace-pre-wrap">
            {currentCase.expected}
          </pre>
        </div>
      </div>
    </div>
  );
}
