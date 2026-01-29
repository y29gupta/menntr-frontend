import { useState } from 'react';
import CodeEditor from './CodeEditor';

type TestCase = {
  name: string;
  input: string;
  expected: boolean;
  output: boolean | null;
  passed: boolean;
};

export default function CodingQuestion() {
  const [code, setCode] = useState(
    `def isPalindrome(s):
    # write code here`
  );

  const [result, setResult] = useState<{
    status: 'passed' | 'failed' | null;
    cases: TestCase[];
  }>({ status: null, cases: [] });

  const runCode = () => {
    // 🔴 Fake judge (frontend simulation)
    const returnsSomething = code.includes('return');

    const cases: TestCase[] = [
      {
        name: 'Sample test case 1',
        input: 'A String S',
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
    ];

    setResult({
      status: returnsSomething ? 'passed' : 'failed',
      cases,
    });
  };

  return (
    <div className="grid grid-cols-2 gap-6 mt-4">
      {/* Problem */}
      <div className="text-sm space-y-3">
        <p>Write a function that checks whether a string is a palindrome.</p>

        <div>
          <p className="font-medium">Input:</p>
          <p>A string s</p>
        </div>

        <div>
          <p className="font-medium">Output:</p>
          <p>Return true if palindrome, else false</p>
        </div>

        <div>
          <p className="font-medium">Constraints:</p>
          <p>1 ≤ length of s ≤ 10⁵</p>
        </div>
      </div>

      {/* Editor + Result */}
      <div className="space-y-4">
        <CodeEditor code={code} setCode={setCode} onRun={runCode} />

        {result.status && (
          <div className="border rounded-xl p-4 text-sm">
            {result.status === 'passed' ? (
              <p className="text-green-600 font-medium">Congratulations</p>
            ) : (
              <p className="text-red-600 font-medium">Wrong Answer</p>
            )}

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
