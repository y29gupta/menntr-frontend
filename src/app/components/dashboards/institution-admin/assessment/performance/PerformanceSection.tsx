import React, { useState } from 'react';
import QuestionPerformance from './performance-section/QuestionPerformance';
import CandidatePerformanceHeader from './performance-section/CandidatePerformanceHeader';
import { useForm } from 'react-hook-form';
import CandidatePerformanceTable from './performance-section/CandidatePerformanceTable';
import { questionWiseData } from './performance-section/QuestionPerformance.data';

function PerformanceSection() {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { control } = useForm({
    defaultValues: {
      attemptId: '',
    },
  });
  return (
    <div className="flex flex-col gap-4">
      <QuestionPerformance
        data={questionWiseData}
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
        attemptOptions={[
          { label: 'Attempt 1', value: '1' },
          { label: 'Attempt 2', value: '2' },
        ]}
      />
      <CandidatePerformanceTable showColumnFilters={showFilters} />
    </div>
  );
}

export default PerformanceSection;
