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

// type props = {
//   // setTabsCount: React.Dispatch<React.SetStateAction<TabsCount>>;
//   data: AssessmentRow[];
// };
type props = {
  data: AssessmentRow[];
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  pendingFilters: Record<string, string>;
  setPendingFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export default function ActiveAssessments({
  data,
  currentPage,
  pageCount,
  onPageChange,
  pendingFilters,
  setPendingFilters,
}: props) {
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
    // <ActiveAssessmentsTable
    //   data={data}
    //   isLoading={false}
    //   globalFilter={globalFilter}
    //   onGlobalFilterChange={setGlobalFilter}
    //   showColumnFilters={showColumnFilters}
    //   currentPage={currentPage}
    //   pageCount={pageCount}
    //   onPageChange={onPageChange}
    // />
    <ActiveAssessmentsTable
      data={data}
      isLoading={false}
      showColumnFilters={showColumnFilters}
      currentPage={currentPage}
      pageCount={pageCount}
      onPageChange={onPageChange}
      columnFilters={pendingFilters}
      onColumnFilterChange={(key: any, value: any) =>
        setPendingFilters((prev) => ({
          ...prev,
          [key]: value,
        }))
      }
    />
  );
}
