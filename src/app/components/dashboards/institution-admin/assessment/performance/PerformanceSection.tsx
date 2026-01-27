import React, { useState } from 'react';
import QuestionPerformance, { questionWiseData } from './performance-section/QuestionPerformance';
import CandidatePerformanceHeader from './performance-section/CandidatePerformanceHeader';
import { useForm } from 'react-hook-form';
import CandidatePerformanceTable from './performance-section/CandidatePerformanceTable';

function PerformanceSection() {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { control } = useForm({
    defaultValues: {
      attemptId: '',
    },
  });
  return (
    <div className="flex flex-col border gap-4">
      <QuestionPerformance data={questionWiseData} />
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
