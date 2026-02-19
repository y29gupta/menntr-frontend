// 'use client';

// import { useEffect, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { assessmentApi } from '../assessment.service';
// // import DraftAssessmentCard from './DraftAssessmentsCard';
// import DraftAssessmentsTable from './DraftAssessmentTable';
// import { AssessmentRow } from '../assessment.types';
// type props = {
//   data: AssessmentRow[];
//   currentPage: number;
//   pageCount: number;
//   onPageChange: (page: number) => void;
//   pendingFilters: Record<string, string>;
//   setPendingFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
// };

// export default function DraftAssessments({ data }: props) {
//   const [globalFilter, setGlobalFilter] = useState('');
//   const [showColumnFilters, setShowColumnFilters] = useState(false);

//   return (
//     <div className="flex flex-col gap-4">
//       <DraftAssessmentsTable
//         data={data}
//         isLoading={false}
//         globalFilter={globalFilter}
//         onGlobalFilterChange={setGlobalFilter}
//         showColumnFilters={showColumnFilters}
//       />
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import ActiveAssessmentsTable from '../active/ActiveAssessmentsTable';

import { assessmentApi } from '../assessment.service';
import { AssessmentRow } from '../assessment.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEvaluationColumns } from '../active/active.columns';

type Props = {
  data: AssessmentRow[];
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  pendingFilters: Record<string, string>;
  setPendingFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export default function DraftAssessments({
  data,
  currentPage,
  pageCount,
  onPageChange,
  pendingFilters,
  setPendingFilters,
}: Props) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => assessmentApi.deleteDraftAssessment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['assessments'],
      });
    },
  });

  const columns = createEvaluationColumns({
    entityBasePath: '/admin/assessment',
    entityLabel: 'Assessment',
    mode: 'draft',
    showExpiryOn: true,
    onDelete: (id) => deleteMutation.mutate(id),
  });

  return (
    <ActiveAssessmentsTable<AssessmentRow>
      data={data}
      columns={columns}
      currentPage={currentPage}
      pageCount={pageCount}
      onPageChange={onPageChange}
      columnFilters={pendingFilters}
      onColumnFilterChange={(key, value) =>
        setPendingFilters((prev) => ({
          ...prev,
          [key]: value,
        }))
      }
      showColumnFilters={true}
    />
  );
}
