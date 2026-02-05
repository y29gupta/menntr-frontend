import React, { useEffect, useState } from 'react';
import QuestionPerformance from './performance-section/QuestionPerformance';
import CandidatePerformanceHeader from './performance-section/CandidatePerformanceHeader';
import { useForm } from 'react-hook-form';
import CandidatePerformanceTable from './performance-section/CandidatePerformanceTable';
import { fetchAttempts, fetchQuestionPerformance } from './assessmentPerformance.api';

type Props = {
  assessmentId: string;
};

function PerformanceSection({ assessmentId }: Props) {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [questionData, setQuestionData] = useState<any[]>([]);
  const [attemptOptions, setAttemptOptions] = useState<{ label: string; value: string }[]>([]);

  const { control } = useForm({
    defaultValues: {
      attemptId: '',
    },
  });

  useEffect(() => {
    fetchQuestionPerformance(assessmentId).then((res) => {
      setQuestionData(
        res.data.map((q: any) => ({
          question: `Q${q.questionNo}`,
          marksObtained: q.accuracy,
          totalMarks: 100,
          avgTime: Math.round(q.avgTimeSeconds / 60),
          difficulty: q.difficulty,
        }))
      );
    });
  }, [assessmentId]);

  useEffect(() => {
    fetchAttempts(assessmentId).then((res) => {
      setAttemptOptions(
        res.data.attempts.map((a: number) => ({
          label: `Attempt ${a}`,
          value: String(a),
        }))
      );
    });
  }, [assessmentId]);

  return (
    <div className="flex flex-col gap-4">
      <QuestionPerformance
        data={questionData}
        title="Average time per question"
        tooltipMode="percentage"
        yDomain={[0, 100]}
        yTicks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
      />

      <CandidatePerformanceHeader
        search={search}
        onSearchChange={setSearch}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters((p) => !p)}
        control={control}
        attemptOptions={attemptOptions}
      />

      <CandidatePerformanceTable
        assessmentId={assessmentId}
        search={search}
        showColumnFilters={showFilters}
      />
    </div>
  );
}

export default PerformanceSection;
