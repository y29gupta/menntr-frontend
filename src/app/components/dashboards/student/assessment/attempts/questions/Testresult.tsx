'use client';

import { useState } from 'react';

type TestCase = {
  name: string;
  input: string;
  expected: boolean;
  output: boolean | null;
  passed: boolean;
};

type Props = {
  status: 'passed' | 'failed';
  cases: TestCase[];
};

export default function TestResult({ status, cases }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const currentCase = cases[activeTab];

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
            : `You've failed to answer ${cases.filter((c) => !c.passed).length}/${cases.length} test cases`}
        </p>
      </div>

      {/* Test Case Tabs */}
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
                  : 'border-transparent text-[#6C768A] hover:text-[#1A2C50]'
              }
            `}
          >
            {testCase.passed ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M5 8L7 10L11 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M6 6L10 10M10 6L6 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
            {testCase.name}
          </button>
        ))}
      </div>

      {/* Test Case Details */}
      <div className="space-y-4">
        {/* Input */}
        <div>
          <label className="text-[14px] font-medium text-[#6C768A] mb-2 block">Input</label>
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-4 py-3 text-[14px] text-[#1A2C50]">
            {currentCase.input}
          </div>
        </div>

        {/* Your Output */}
        <div>
          <label className="text-[14px] font-medium text-[#6C768A] mb-2 block">Your Output</label>
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-4 py-3 text-[14px] text-[#1A2C50]">
            {currentCase.output !== null ? String(currentCase.output) : 'Null'}
          </div>
        </div>

        {/* Expected Output */}
        <div>
          <label className="text-[14px] font-medium text-[#6C768A] mb-2 block">
            Expected Output
          </label>
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-4 py-3 text-[14px] text-[#1A2C50]">
            {String(currentCase.expected)}
          </div>
        </div>
      </div>
    </div>
  );
}
