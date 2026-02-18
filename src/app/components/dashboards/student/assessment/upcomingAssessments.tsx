'use client';

import { useMemo, useState, useEffect } from 'react';
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

type FilterState = {
  type?: 'mcq' | 'coding' | 'mcq+coding';
  scheduled?: 'tomorrow' | 'this_week' | 'next_week';
  search?: string;
};

type UiFilterState = {
  type: string[];
  scheduled: string[];
};

/* ================= DEBOUNCE HOOK ================= */

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

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

async function fetchUpcomingAssessments(filters: FilterState): Promise<ApiAssessment[]> {
  const params = new URLSearchParams();
  params.set('status', 'upcoming');

  if (filters.type) params.set('type', filters.type);
  if (filters.scheduled) params.set('scheduled', filters.scheduled);
  if (filters.search) params.set('search', filters.search);

  const res = await fetch(`/api/student/assessments?${params.toString()}`, {
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to fetch upcoming assessments');

  const data = await res.json();
  return data.assessments;
}

/* ================= COMPONENT ================= */

export default function UpcomingAssessments() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<FilterState>({});

  const [uiFilters, setUiFilters] = useState<UiFilterState>({
    type: ['All'],
    scheduled: ['All'],
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: debouncedSearch.trim() ? debouncedSearch.trim() : undefined,
    }));
  }, [debouncedSearch]);

  const { data, isLoading } = useQuery({
    queryKey: ['upcoming-assessments', filters],
    queryFn: () => fetchUpcomingAssessments(filters),
  });

  const handleApplyFilters = (modalFilters: UiFilterState) => {
    setUiFilters(modalFilters);

    const newFilters: FilterState = {
      search: debouncedSearch.trim() || undefined,
    };

    if (modalFilters.type.includes('MCQ+Coding')) newFilters.type = 'mcq+coding';
    else if (modalFilters.type.includes('MCQ')) newFilters.type = 'mcq';
    else if (modalFilters.type.includes('Coding')) newFilters.type = 'coding';

    if (modalFilters.scheduled.includes('Tomorrow')) newFilters.scheduled = 'tomorrow';
    else if (modalFilters.scheduled.includes('This Week')) newFilters.scheduled = 'this_week';
    else if (modalFilters.scheduled.includes('Next Week')) newFilters.scheduled = 'next_week';

    setFilters(newFilters);
    setShowFilters(false);
  };

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

  const hasActiveFilters = filters.type || filters.scheduled || filters.search;

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
              initialValues={uiFilters}
              onApply={handleApplyFilters}
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

        {!isLoading && mappedAssessments.length === 0 && (
          <EmptyAssessmentState
            imageSrc="/assets/empty-ongoing-assessment.svg"
            title={
              hasActiveFilters
                ? 'No assessments match your search or filters'
                : 'No upcoming assessments'
            }
            description={
              hasActiveFilters
                ? 'Try changing or clearing your search and filters.'
                : 'You don’t have any upcoming assessments scheduled.'
            }
          />
        )}

        {mappedAssessments.map((assessment) => (
          <UpcomingAssessmentCard key={assessment.id} {...assessment} />
        ))}
      </div>
    </>
  );
}
