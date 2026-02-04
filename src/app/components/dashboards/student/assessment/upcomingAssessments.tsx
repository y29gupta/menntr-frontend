'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import UpcomingAssessmentCard from './UpcomingAssessmentCard';
import EmptyAssessmentState from './EmptyAssessmentState';
import SearchWithFilter from './SearchWithFilter';
import UpcomingAssessmentFilterModal from '@/app/ui/modals/UpcomingAssessmentFilterModal';

/* ================= TYPES ================= */

type ApiAssessment = {
  id: string;
  title: string;
  type: string;
  start_time: string;
  duration_minutes: number;
};

type UpcomingAssessment = {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  duration: string;
};

/* ================= DATE HELPERS ================= */

function formatDateLabel(startTime: string): string {
  const start = new Date(startTime);
  const today = new Date();
  const tomorrow = new Date();

  today.setHours(0, 0, 0, 0);
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const startDate = new Date(start);
  startDate.setHours(0, 0, 0, 0);

  if (startDate.getTime() === today.getTime()) return 'Today';
  if (startDate.getTime() === tomorrow.getTime()) return 'Tomorrow';

  return start.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatTime(startTime: string): string {
  return new Date(startTime).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

/* ================= API ================= */

async function fetchUpcomingAssessments(): Promise<ApiAssessment[]> {
  const res = await fetch('/api/student/assessments?status=upcoming', {
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to fetch upcoming assessments');

  const data = await res.json();
  return data.assessments;
}

/* ================= COMPONENT ================= */

export default function UpcomingAssessments() {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['upcoming-assessments'],
    queryFn: fetchUpcomingAssessments,
    staleTime: 60_000,
  });

  const mappedAssessments: UpcomingAssessment[] = useMemo(() => {
    if (!data) return [];

    return data.map((a) => ({
      id: a.id,
      title: a.title,
      type: a.type,
      date: formatDateLabel(a.start_time),
      time: formatTime(a.start_time),
      duration: `${a.duration_minutes} mins`,
    }));
  }, [data]);

  const filteredData = useMemo(() => {
    return mappedAssessments.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()));
  }, [search, mappedAssessments]);

  if (!isLoading && filteredData.length === 0) {
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
          onSearchChange={setSearch}
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
        {isLoading &&
          [...Array(3)].map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-gray-100 animate-pulse" />
          ))}

        {filteredData.map((assessment) => (
          <UpcomingAssessmentCard key={assessment.id} {...assessment} />
        ))}
      </div>
    </>
  );
}
