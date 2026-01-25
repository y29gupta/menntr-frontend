'use client';

import { useEffect, useState } from 'react';
import ActiveAssessmentsTable from './ActiveAssessmentsTable';
import { useQuery } from '@tanstack/react-query';
import { assessmentApi } from '../assessment.service';
import { AssessmentRow } from '../assessment.types';

// type TabsCount = {
//   Active: number;
//   Drafts: number;
//   Completed: number;
// };

type props = {
  // setTabsCount: React.Dispatch<React.SetStateAction<TabsCount>>;
  data: AssessmentRow[];
};
export default function ActiveAssessments({ data }: props) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [showColumnFilters, setShowColumnFilters] = useState(false);

  // const { data = [], isLoading } = useQuery<AssessmentRow[]>({
  //   queryKey: ['getAssessment'],
  //   queryFn: () => assessmentApi.getAssessmentList('active'),
  // });

  // useEffect(() => {
  //   setTabsCount((prev) => ({
  //     ...prev,
  //     Active: data.length,
  //   }));
  // }, [data.length, setTabsCount]);

  return (
    <ActiveAssessmentsTable
      data={data}
      isLoading={false}
      globalFilter={globalFilter}
      onGlobalFilterChange={setGlobalFilter}
      showColumnFilters={showColumnFilters}
    />
  );
}
