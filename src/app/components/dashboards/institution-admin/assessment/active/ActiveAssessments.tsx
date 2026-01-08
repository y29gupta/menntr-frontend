'use client';

import { useState } from 'react';
import ActiveAssessmentsTable from './ActiveAssessmentsTable';
import { assessmentDummyData } from './assessment.dummy';

export default function ActiveAssessments() {
  const [globalFilter, setGlobalFilter] = useState('');

  return (
    <ActiveAssessmentsTable
      data={assessmentDummyData}
      isLoading={false}
      globalFilter={globalFilter}
      onGlobalFilterChange={setGlobalFilter}
    />
  );
}
