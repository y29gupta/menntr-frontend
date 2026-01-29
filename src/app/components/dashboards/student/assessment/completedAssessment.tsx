'use client';

import { useMemo, useState } from 'react';
import CompletedAssessmentCard from './CompletedAssessmentCard';
import EmptyAssessmentState from './EmptyAssessmentState';
import SearchWithFilter from './SearchWithFilter';
import CompletedAssessmentFilterModal from '@/app/ui/modals/CompletedAssessmentFilterModal';

type CompletedAssessmentItem = {
  id: number;
  title: string;
  type: string;
  submittedOn: string;
  status: 'UNDER_EVALUATION' | 'RESULT_PUBLISHED';
};

const completedAssessments: CompletedAssessmentItem[] = [
  {
    id: 1,
    title: 'Data Structures MCQ',
    type: 'MCQ',
    submittedOn: 'Aug 8, 2025',
    status: 'UNDER_EVALUATION',
  },
  {
    id: 2,
    title: 'Data Structures MCQ',
    type: 'MCQ',
    submittedOn: 'Aug 8, 2025',
    status: 'RESULT_PUBLISHED',
  },
  {
    id: 3,
    title: 'Data Structures MCQ',
    type: 'MCQ',
    submittedOn: 'Aug 8, 2025',
    status: 'UNDER_EVALUATION',
  },
];

export default function CompletedAssessment() {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredData = useMemo(() => {
    return completedAssessments.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  if (filteredData.length === 0) {
    return (
      <EmptyAssessmentState
        imageSrc="/assets/empty-ongoing-assessment.svg"
        title="No completed assessments"
        description="You haven’t completed any assessments yet."
      />
    );
  }

  return (
    <>
      <div className="w-130">
        <SearchWithFilter
          value={search}
          onSearchChange={(v) => {
            console.log('🔍 Compled search:', v);
            setSearch(v);
          }}
          onToggleFilters={() => setShowFilters((p) => !p)}
          filterOpen={showFilters}
          filterModal={
            <CompletedAssessmentFilterModal
              onApply={() => setShowFilters(false)}
              onClose={() => setShowFilters(false)}
            />
          }
        />
      </div>

      <div className="space-y-4">
        {filteredData.map((assessment) => (
          <CompletedAssessmentCard key={assessment.id} {...assessment} />
        ))}
      </div>
    </>
  );
}
