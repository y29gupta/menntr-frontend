'use client';

import { useMemo, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import CompletedAssessmentCard from './CompletedAssessmentCard';
import EmptyAssessmentState from './EmptyAssessmentState';
import SearchWithFilter from './SearchWithFilter';
import CompletedAssessmentFilterModal from '@/app/ui/modals/CompletedAssessmentFilterModal';

/* ================= TYPES ================= */

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

type FilterState = {
  type?: 'mcq' | 'coding' | 'mcq+coding';
  evaluation?: 'published' | 'under_evaluation';
  search?: string;
};

type UiFilterState = {
  type: string[];
  evaluationStatus: string[];
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

function formatDate(date: string | null): string {
  if (!date) return '-';

  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/* ================= API ================= */

async function fetchCompletedAssessments(filters: FilterState): Promise<ApiAssessment[]> {
  const params = new URLSearchParams();
  params.set('status', 'completed');

  if (filters.type) params.set('type', filters.type);
  if (filters.evaluation) params.set('evaluation', filters.evaluation);
  if (filters.search) params.set('search', filters.search);

  const res = await fetch(`/api/student/assessments?${params.toString()}`, {
    credentials: 'include',
  });

  const data = await res.json();
  return data.assessments;
}

/* ================= COMPONENT ================= */

export default function CompletedAssessment() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<FilterState>({});

  const [uiFilters, setUiFilters] = useState<UiFilterState>({
    type: ['All'],
    evaluationStatus: ['All'],
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: debouncedSearch.trim() ? debouncedSearch.trim() : undefined,
    }));
  }, [debouncedSearch]);

  const { data, isLoading } = useQuery({
    queryKey: ['completed-assessments', filters],
    queryFn: () => fetchCompletedAssessments(filters),
  });

  const handleApplyFilters = (modalFilters: UiFilterState) => {
    setUiFilters(modalFilters);

    const newFilters: FilterState = {
      search: debouncedSearch.trim() || undefined,
    };

    if (modalFilters.type.includes('MCQ+Coding')) newFilters.type = 'mcq+coding';
    else if (modalFilters.type.includes('MCQ')) newFilters.type = 'mcq';
    else if (modalFilters.type.includes('Coding')) newFilters.type = 'coding';

    if (modalFilters.evaluationStatus.includes('Results published'))
      newFilters.evaluation = 'published';
    else if (modalFilters.evaluationStatus.includes('Under evaluation'))
      newFilters.evaluation = 'under_evaluation';

    setFilters(newFilters);
    setShowFilters(false);
  };

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

  const hasActiveFilters = filters.type || filters.evaluation || filters.search;

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
              initialValues={uiFilters}
              onApply={handleApplyFilters}
              onClose={() => setShowFilters(false)}
            />
          }
        />
      </div>

      <div className="space-y-4">
        {!isLoading && mappedAssessments.length === 0 && (
          <EmptyAssessmentState
            imageSrc="/assets/empty-ongoing-assessment.svg"
            title={
              hasActiveFilters
                ? 'No assessments match your search or filters'
                : 'No completed assessments'
            }
            description={
              hasActiveFilters
                ? 'Try changing or clearing your search and filters.'
                : 'You haven’t completed any assessments yet.'
            }
          />
        )}

        {mappedAssessments.map((assessment) => (
          <CompletedAssessmentCard key={assessment.id} {...assessment} />
        ))}
      </div>
    </>
  );
}
