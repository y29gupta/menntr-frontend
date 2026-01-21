'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { assessmentApi } from '../assessment.service';
// import DraftAssessmentCard from './DraftAssessmentsCard';
import DraftAssessmentsTable from './DraftAssessmentTable';
import { AssessmentRow } from '../active/active.columns';

type props = {
  // setTabsCount: React.Dispatch<React.SetStateAction<TabsCount>>;
  data: AssessmentRow[];
};

export default function DraftAssessments({ data }: props) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [showColumnFilters, setShowColumnFilters] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <DraftAssessmentsTable
        data={data}
        isLoading={false}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        showColumnFilters={showColumnFilters}
      />
    </div>
  );
}
