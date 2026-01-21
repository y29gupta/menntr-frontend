'use client';

import QuestionPerformance from '../performance-section/QuestionPerformance';
import { CodingQuestionCard } from './CodingQuestionCard';
import { MCQQuestionCard } from './MCQQuestionCard';
import { questionsData } from './Responses.data';

export default function Reponses() {
  return (
    <div className="flex flex-col gap-6">
      {/* BAR GRAPH (READ-ONLY) */}
      <QuestionPerformance
        data={questionsData.map((q) => ({
          question: q.questionNo,
          marksObtained: q.marksObtained,
          totalMarks: q.totalMarks,
          avgTime:
            q.type === 'CODING'
              ? Number((((q.testPassed ?? 0) / (q.testTotal ?? 1)) * 3 + 1).toFixed(1)) // 1–4 mins
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
