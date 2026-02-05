'use client';

import { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import TestResult from './Testresult';
import { assessmentApi } from '../assessment.service';
import { useQueryClient } from '@tanstack/react-query';

type TestCase = {
  name: string;
  input: string;
  expected: string;
  output: string | null;
  passed: boolean;
};

type CodingQuestionData = {
  assessment_question_id: string;
  question_id: string;
  title: string;
  description: string;
  constraints: string;
  examples: {
    input: string;
    output: string;
  }[];
  supported_languages: string[];
  previous_code: string | null;
};

type Props = {
  question: CodingQuestionData;
  onSubmitSuccess: () => void;
};

export default function CodingQuestion({ question, onSubmitSuccess }: Props) {
  const [code, setCode] = useState(question.previous_code ?? '');

  const queryClient = useQueryClient();

  useEffect(() => {
    setCode(question.previous_code ?? '');
  }, [question.question_id]);

  const [result, setResult] = useState<{
    status: 'passed' | 'failed' | null;
    cases: TestCase[];
  }>({ status: null, cases: [] });

  const runCode = async () => {
    const res = await assessmentApi.runCodingAnswer('91', {
      question_id: Number(question.question_id),
      language: 'python',
      source_code: code,
    });

    const data = res.data;

    setResult({
      status: data.status === 'accepted' ? 'passed' : 'failed',
      cases: question.examples.map((ex, idx) => ({
        name: `Sample test case ${idx + 1}`,
        input: ex.input,
        expected: ex.output,
        output: data.outputs?.[idx] ?? null,
        passed: data.outputs?.[idx] === ex.output,
      })),
    });
  };

  const submitCode = async () => {
    await assessmentApi.saveCodingAnswer('91', {
      question_id: Number(question.question_id),
      language: 'python',
      source_code: code,
    });

    queryClient.invalidateQueries({
      queryKey: ['assessment-question'],
    });

    onSubmitSuccess();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full min-h-0">
      {/* LEFT */}
      <div className="flex flex-col gap-2 text-[16px] font-medium text-[#1A2C50] overflow-y-auto pr-2">
        <p>{question.description}</p>

        <div>
          <p className="text-[#6C768A]">Input:</p>
          {question.examples.map((ex, idx) => (
            <pre key={idx} className="mt-1 text-sm bg-[#F7F9FC] p-2 rounded whitespace-pre-wrap">
              {ex.input}
            </pre>
          ))}
        </div>

        <div>
          <p className="text-[#6C768A]">Output:</p>
          {question.examples.map((ex, idx) => (
            <pre key={idx} className="mt-1 text-sm bg-[#F7F9FC] p-2 rounded whitespace-pre-wrap">
              {ex.output}
            </pre>
          ))}
        </div>

        <div>
          <p className="text-[#6C768A]">Constraints:</p>
          <pre className="whitespace-pre-wrap">{question.constraints}</pre>
        </div>
      </div>

      {/* RIGHT */}
      <div className="h-full min-h-0 overflow-y-auto pr-2">
        <div className="flex flex-col gap-4">
          <div className="h-[300px] flex-shrink-0">
            <CodeEditor
              code={code}
              setCode={setCode}
              onRun={runCode}
              onSubmit={submitCode}
              supportedLanguages={question.supported_languages}
            />
          </div>

          {result.status && <TestResult status={result.status} cases={result.cases} />}
        </div>
      </div>
    </div>
  );
}
