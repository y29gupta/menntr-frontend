'use client';

import { useState } from 'react';
import CodeEditor from './CodeEditor';
import TestResult from './Testresult';

/* 🔹 Dynamic types */
type TestCase = {
  name: string;
  input: string;
  expected: boolean;
  output: boolean | null;
  passed: boolean;
};

type CodingQuestionData = {
  id: number;
  description: string;
  input: string;
  output: string;
  constraints: string;
  starterCode: string;
};

export default function CodingQuestion() {
  /* 🔹 This will later come from API */
  const question: CodingQuestionData = {
    id: 3,
    description: 'Write a function that checks whether a string is a palindrome.',
    input: 'A string s',
    output: 'Return true if palindrome, else false',
    constraints: '1 ≤ length of s ≤ 10⁵',
    starterCode: `def isPalindrome(s):
    # write code here`,
  };

  const [code, setCode] = useState(question.starterCode);

  const [result, setResult] = useState<{
    status: 'passed' | 'failed' | null;
    cases: TestCase[];
  }>({ status: null, cases: [] });

  /* 🔹 Fake judge (replace with backend later) */
  const runCode = () => {
    const returnsSomething = code.includes('return');

    // Simulate multiple test cases
    setResult({
      status: returnsSomething ? 'passed' : 'failed',
      cases: [
        {
          name: 'Sample test case 1',
          input:
            'This is a very long input string used to aggressively test UI wrapping, overflow, scrolling, and height expansion across different breakpoints, including long file paths like src/app/components/dashboards/student/assessment/attempts/question and repeated descriptive text to increase length.',
          expected: true,
          output: returnsSomething ? true : null,
          passed: returnsSomething,
        },
        {
          name: 'Sample test case 2',
          input: 'racecar',
          expected: true,
          output: returnsSomething ? true : null,
          passed: returnsSomething,
        },
      ],
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full min-h-0">
      {/* LEFT : Problem (static - no scroll) */}
      <div className="flex flex-col gap-2 text-[16px] font-medium text-[#1A2C50] overflow-hidden">
        <p>{question.description}</p>

        <div>
          <p className="text-[#6C768A]">Input:</p>
          <p>{question.input}</p>
        </div>

        <div>
          <p className="text-[#6C768A]">Output:</p>
          <p>{question.output}</p>
        </div>

        <div>
          <p className="text-[#6C768A]">Constraints:</p>
          <p>{question.constraints}</p>
        </div>
      </div>

      {/* RIGHT : Editor + Result (SCROLLABLE) */}
      <div className="h-full min-h-0 overflow-y-auto pr-2">
        <div className="flex flex-col gap-4 pb-6">
          <div className="h-[250px]">
            <CodeEditor code={code} setCode={setCode} onRun={runCode} />
          </div>

          {/* Result section */}
          {result.status && <TestResult status={result.status} cases={result.cases} />}
        </div>
      </div>
    </div>
  );
}
