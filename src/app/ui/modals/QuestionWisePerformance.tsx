'use client';

import QuestionPerformance from '@/app/components/dashboards/institution-admin/assessment/performance/performance-section/QuestionPerformance';
import { CodingQuestionCard } from '@/app/components/dashboards/institution-admin/assessment/performance/student-performance/CodingQuestionCard';
import { MCQQuestionCard } from '@/app/components/dashboards/institution-admin/assessment/performance/student-performance/MCQQuestionCard';

/* ================= LOCAL TYPES ================= */

type Difficulty = 'Easy' | 'Medium' | 'Hard';
type QuestionType = 'MCQ' | 'CODING';

export interface QuestionReport {
  id: string;
  questionNo: string;
  title: string;
  type: QuestionType;
  difficulty: Difficulty;

  totalMarks: number;
  marksObtained: number;

  // MCQ
  options?: string[];
  selectedOption?: number;
  correctOption?: number;

  // Coding
  language?: string;
  code?: string;
  testPassed?: number;
  testTotal?: number;
}

/* ================= DUMMY DATA ================= */

const questionsData: QuestionReport[] = [
  {
    id: 'q1',
    questionNo: 'Q1',
    title:
      'If the ratio of boys to girls in a class is 3 : 2 and there are 15 boys, how many girls are there in the class?',
    type: 'MCQ',
    difficulty: 'Medium',
    totalMarks: 1,
    marksObtained: 0,
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    selectedOption: 1,
    correctOption: 0,
  },
  {
    id: 'q2',
    questionNo: 'Q2',
    title: 'What is the time complexity of binary search on a sorted array?',
    type: 'CODING',
    difficulty: 'Easy',
    totalMarks: 10,
    marksObtained: 10,
    language: 'Python',
    code: `def solution(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]`,
    testPassed: 10,
    testTotal: 10,
  },
  {
    id: 'q3',
    questionNo: 'Q3',
    title:
      'If the ratio of boys to girls in a class is 3 : 2 and there are 15 boys, how many girls are there in the class?',
    type: 'MCQ',
    difficulty: 'Hard',
    totalMarks: 1,
    marksObtained: 1,
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    selectedOption: 0,
    correctOption: 0,
  },
];

export default function QuestionWisePerformance() {
  return (
    <div className="flex flex-col gap-6">
      <QuestionPerformance
        data={questionsData.map((q) => ({
          question: q.questionNo,
          marksObtained: q.marksObtained,
          totalMarks: q.totalMarks,
          avgTime:
            q.type === 'CODING'
              ? Number((((q.testPassed ?? 0) / (q.testTotal ?? 1)) * 3 + 1).toFixed(1))
              : 0.5,
          difficulty: q.difficulty,
        }))}
        tooltipMode="marks"
      />

      <div className="flex flex-col gap-6">
        {questionsData.map((q) =>
          q.type === 'CODING' ? (
            <CodingQuestionCard key={q.id} q={q} />
          ) : (
            <MCQQuestionCard key={q.id} q={q} />
          )
        )}
      </div>
    </div>
  );
}
