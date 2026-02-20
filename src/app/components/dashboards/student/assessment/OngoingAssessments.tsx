'use client';
import { useMemo, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import AssessmentCard, { AssessmentStatus } from './AssessmentCard';
import EmptyAssessmentState from './EmptyAssessmentState';
import SearchWithFilter from './SearchWithFilter';
import OngoingAssessmentFilterModal from '@/app/ui/modals/OngoingAssessmentFilterModal';

/* ================= TYPES ================= */

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

type FilterState = {
  type?: 'mcq' | 'coding' | 'mcq+coding';
  ending?: 'today' | 'this_week';
  search?: string;
};

type UiFilterState = {
  type: string[];
  ending: string[];
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

/* ================= HELPERS ================= */

function getTimeLeft(endTime: string): string {
  const now = Date.now();
  const end = new Date(endTime).getTime();

  const diffMs = end - now;
  if (diffMs <= 0) return 'Ended';

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  if (totalDays > 2) return `${totalDays}d`;
  if (totalHours >= 1) return `${totalHours}h ${totalMinutes % 60}m`;
  return `${totalMinutes}m`;
}

/* ================= API ================= */

async function fetchOngoingAssessments(filters: FilterState): Promise<ApiAssessment[]> {
  const params = new URLSearchParams();
  params.set('status', 'ongoing');

  if (filters.type) params.set('type', filters.type);
  if (filters.ending) params.set('ending', filters.ending);
  if (filters.search) params.set('search', filters.search);

  const res = await fetch(`/api/student/assessments?${params.toString()}`, {
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to fetch assessments');

  const data = await res.json();
  return data.assessments;
}

/* ================= COMPONENT ================= */

export default function OngoingAssessments() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<FilterState>({});

  const [uiFilters, setUiFilters] = useState<UiFilterState>({
    type: ['All'],
    ending: ['All'],
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: debouncedSearch.trim() ? debouncedSearch.trim() : undefined,
    }));
  }, [debouncedSearch]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['ongoing-assessments', filters],
    queryFn: () => fetchOngoingAssessments(filters),
  });

  const handleApplyFilters = (modalFilters: UiFilterState) => {
    setUiFilters(modalFilters);

    const newFilters: FilterState = {
      search: debouncedSearch.trim() || undefined,
    };

    if (modalFilters.type.includes('MCQ+Coding')) newFilters.type = 'mcq+coding';
    else if (modalFilters.type.includes('MCQ')) newFilters.type = 'mcq';
    else if (modalFilters.type.includes('Coding')) newFilters.type = 'coding';

    if (modalFilters.ending.includes('Today')) newFilters.ending = 'today';
    else if (modalFilters.ending.includes('This Week')) newFilters.ending = 'this_week';

    setFilters(newFilters);
    setShowFilters(false);
  };

  const mappedAssessments: Assessment[] = useMemo(() => {
    if (!data) return [];

    return data.map((a) => ({
      assId: a.id,
      title: a.title,
      type: a.type,
      duration: `${a.duration_minutes} min`,
      status: a.pending ? { kind: 'pending' } : { kind: 'ends', timeLeft: getTimeLeft(a.end_time) },
    }));
  }, [data]);

  const hasActiveFilters = filters.type || filters.ending || filters.search;

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
                : 'No ongoing assessments'
            }
            description={
              hasActiveFilters
                ? 'Try changing or clearing your search and filters.'
                : 'You’re all caught up for now. Check upcoming assessments to stay prepared.'
            }
          />
        )}

        {mappedAssessments.map((assessment) => (
          <AssessmentCard key={assessment.assId} {...assessment} />
        ))}

        {isError && <p className="text-sm text-red-500">Failed to load assessments</p>}
      </div>
    </>
  );
}
