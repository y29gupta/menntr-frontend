'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import CompletedAssessmentCard from './CompletedAssessmentCard';
import EmptyAssessmentState from './EmptyAssessmentState';
import SearchWithFilter from './SearchWithFilter';
import CompletedAssessmentFilterModal from '@/app/ui/modals/CompletedAssessmentFilterModal';

type ApiAssessment = {
  id: string;
  title: string;
  type: string;
  end_time: string | null;
  attempt_status: 'submitted' | 'evaluated' | 'not_started';
};

type CompletedAssessmentItem = {
  id: string;
  title: string;
  type: string;
  submittedOn: string;
  attemptStatus: 'submitted' | 'evaluated' | 'not_started';
};

function formatDate(date: string | null): string {
  if (!date) return '-';

  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

async function fetchCompletedAssessments(): Promise<ApiAssessment[]> {
  const res = await fetch('/api/student/assessments?status=completed', {
    credentials: 'include',
  });

  const data = await res.json();
  return data.assessments;
}

export default function CompletedAssessment() {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['completed-assessments'],
    queryFn: fetchCompletedAssessments,
  });

  const mappedAssessments: CompletedAssessmentItem[] = useMemo(() => {
    if (!data) return [];

    return data.map((a) => ({
      id: a.id,
      title: a.title,
      type: a.type,
      submittedOn: formatDate(a.end_time),
      attemptStatus: a.attempt_status,
    }));
  }, [data]);

  const filteredData = useMemo(() => {
    return mappedAssessments.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()));
  }, [search, mappedAssessments]);

  if (!isLoading && filteredData.length === 0) {
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
          onSearchChange={setSearch}
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
