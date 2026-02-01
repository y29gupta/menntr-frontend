'use client';

import { useMemo, useState } from 'react';
import AssessmentCard, { AssessmentStatus } from './AssessmentCard';
import EmptyAssessmentState from './EmptyAssessmentState';
import SearchWithFilter from './SearchWithFilter';
import OngoingAssessmentFilterModal from '@/app/ui/modals/OngoingAssessmentFilterModal';

type Assessment = {
  id: number;
  title: string;
  type: string;
  duration: string;
  status: AssessmentStatus;
};

const assessments: Assessment[] = [
  {
    id: 1,
    title: 'Mid-Term test',
    type: 'Coding + MCQ',
    duration: '2 hours',
    status: { kind: 'pending' },
  },
  {
    id: 2,
    title: 'Mid-Term test',
    type: 'Coding + MCQ',
    duration: '2 hours',
    status: { kind: 'pending' },
  },
  {
    id: 3,
    title: 'Mid-Term test',
    type: 'Coding + MCQ',
    duration: '2 hours',
    status: { kind: 'ends', timeLeft: '47h 12m' },
  },
  {
    id: 4,
    title: 'Mid-Term test',
    type: 'Coding + MCQ',
    duration: '2 hours',
    status: { kind: 'ends', timeLeft: '23h 05m' },
  },
  {
    id: 5,
    title: 'Mid-Term test',
    type: 'Coding + MCQ',
    duration: '2 hours',
    status: { kind: 'ends', timeLeft: '12h 40m' },
  },
];

export default function OngoingAssessments() {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredData = useMemo(() => {
    return assessments.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  if (filteredData.length === 0) {
    return (
      <EmptyAssessmentState
        imageSrc="/assets/empty-ongoing-assessment.svg"
        title="No ongoing assessments"
        description="You’re all caught up for now. Check upcoming assessments to stay prepared."
      />
    );
  }

  return (
    <>
      <div className="w-130">
        <SearchWithFilter
          value={search}
          onSearchChange={(v) => {
            console.log('🔍 Ongoing search:', v);
            setSearch(v);
          }}
          onToggleFilters={() => setShowFilters((p) => !p)}
          filterOpen={showFilters}
          filterModal={
            <OngoingAssessmentFilterModal
              onApply={() => setShowFilters(false)}
              onClose={() => setShowFilters(false)}
            />
          }
        />
      </div>

      <div className="space-y-4">
        {filteredData.map((assessment) => (
          <AssessmentCard key={assessment.id} {...assessment} />
        ))}
      </div>
    </>
  );
}
