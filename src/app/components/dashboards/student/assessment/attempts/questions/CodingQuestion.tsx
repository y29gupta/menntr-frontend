'use client';

import { useState } from 'react';
import CodeEditor from './CodeEditor';

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

    setResult({
      status: returnsSomething ? 'passed' : 'failed',
      cases: [
        {
          name: 'Sample test case 1',
          input: 'A String S',
          expected: true,
          output: returnsSomething ? true : null,
          passed: returnsSomething,
        },
      ],
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* LEFT : Problem */}
      <div className="flex flex-col gap-2 text-[16px] font-medium text-[#1A2C50]">
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

      {/* RIGHT : Editor + Result */}
      <div className="flex flex-col gap-4 lg:h-full lg:overflow-y-auto">
        <CodeEditor code={code} setCode={setCode} onRun={runCode} />

        {result.status && (
          <div className="border rounded-xl p-4 text-sm bg-white">
            <p
              className={`font-medium ${
                result.status === 'passed' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {result.status === 'passed' ? 'Congratulations' : 'Wrong Answer'}
            </p>

            <div className="mt-3 space-y-2">
              {result.cases.map((c) => (
                <div key={c.name} className="border-t pt-2">
                  <p className={c.passed ? 'text-green-600' : 'text-red-600'}>
                    {c.passed ? '✓' : '✗'} {c.name}
                  </p>
                  <p>Input: {c.input}</p>
                  <p>Your Output: {String(c.output)}</p>
                  <p>Expected Output: {String(c.expected)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
