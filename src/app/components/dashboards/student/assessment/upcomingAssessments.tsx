'use client';

import { useMemo, useState } from 'react';
import UpcomingAssessmentCard from './UpcomingAssessmentCard';
import EmptyAssessmentState from './EmptyAssessmentState';
import SearchWithFilter from './SearchWithFilter';
import UpcomingAssessmentFilterModal from '@/app/ui/modals/UpcomingAssessmentFilterModal';

type UpcomingAssessment = {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  duration: string;
};

const upcomingAssessments: UpcomingAssessment[] = [
  {
    id: 1,
    title: 'Data Structures MCQ',
    type: 'MCQ',
    date: 'Tomorrow',
    time: '10:00 AM',
    duration: '60 mins',
  },
  {
    id: 2,
    title: 'Data Structures MCQ',
    type: 'MCQ',
    date: 'Tomorrow',
    time: '10:00 AM',
    duration: '60 mins',
  },
  {
    id: 3,
    title: 'Data Structures MCQ',
    type: 'MCQ',
    date: 'Tomorrow',
    time: '10:00 AM',
    duration: '60 mins',
  },
];

export default function UpcomingAssessments() {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredData = useMemo(() => {
    return upcomingAssessments.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  if (filteredData.length === 0) {
    return (
      <EmptyAssessmentState
        imageSrc="/assets/empty-ongoing-assessment.svg"
        title="No upcoming assessments"
        description="You don’t have any upcoming assessments scheduled."
      />
    );
  }

  return (
    <>
      <div className="w-130">
        <SearchWithFilter
          value={search}
          onSearchChange={(v) => {
            console.log('🔍 upcoming search:', v);
            setSearch(v);
          }}
          onToggleFilters={() => setShowFilters((p) => !p)}
          filterOpen={showFilters}
          filterModal={
            <UpcomingAssessmentFilterModal
              onApply={() => setShowFilters(false)}
              onClose={() => setShowFilters(false)}
            />
          }
        />
      </div>

      <div className="space-y-4">
        {filteredData.map((assessment) => (
          <UpcomingAssessmentCard key={assessment.id} {...assessment} />
        ))}
      </div>
    </>
  );
}
