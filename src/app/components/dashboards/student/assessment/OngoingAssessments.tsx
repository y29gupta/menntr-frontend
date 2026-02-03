'use client';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import AssessmentCard, { AssessmentStatus } from './AssessmentCard';
import EmptyAssessmentState from './EmptyAssessmentState';
import SearchWithFilter from './SearchWithFilter';
import OngoingAssessmentFilterModal from '@/app/ui/modals/OngoingAssessmentFilterModal';

type ApiAssessment = {
  id: string;
  title: string;
  type: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  pending: boolean;
};

type Assessment = {
  assId: string;
  title: string;
  type: string;
  duration: string;
  status: AssessmentStatus;
};

function getTimeLeft(endTime: string): string {
  const now = Date.now();
  const end = new Date(endTime).getTime();

  const diffMs = end - now;
  if (diffMs <= 0) return 'Ended';

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  if (totalDays > 2) {
    return `${totalDays}d`;
  }

  if (totalHours >= 1) {
    return `${totalHours}h ${totalMinutes % 60}m`;
  }

  return `${totalMinutes}m`;
}

async function fetchOngoingAssessments(): Promise<ApiAssessment[]> {
  const res = await fetch('/api/student/assessments?status=ongoing', {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch assessments');
  }

  const data = await res.json();
  return data.assessments;
}

export default function OngoingAssessments() {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['ongoing-assessments'],
    queryFn: fetchOngoingAssessments,
    staleTime: 60_000,
    refetchInterval: 60_000,
  });

  const mappedAssessments: Assessment[] = useMemo(() => {
    if (!data) return [];

    return data.map((a) => ({
      assId: a.id,
      title: a.title,
      type: a.type,
      duration: `${a.duration_minutes} min`,
      status: a.pending
        ? { kind: 'pending' }
        : {
            kind: 'ends',
            timeLeft: getTimeLeft(a.end_time),
          },
    }));
  }, [data]);

  const filteredData = useMemo(() => {
    return mappedAssessments.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()));
  }, [search, mappedAssessments]);

  if (!isLoading && filteredData.length === 0) {
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
          onSearchChange={setSearch}
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
        {isLoading &&
          [...Array(3)].map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-gray-100 animate-pulse" />
          ))}

        {filteredData.map((assessment) => (
          <AssessmentCard key={assessment.assId} {...assessment} />
        ))}

        {isError && <p className="text-sm text-red-500">Failed to load assessments</p>}
      </div>
    </>
  );
}
