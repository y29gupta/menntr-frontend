'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { keepPreviousData, useQueries } from '@tanstack/react-query';
import { assessmentApi } from '../assessment/assessment.service';
import AssessmentHeader from '../assessment/AssessmentHeader';
import AssessmentFilters from '../assessment/AssessmentFilters';
import ActiveAssessments from '../assessment/active/ActiveAssessments';
import DraftAssessments from '../assessment/drafts/DraftAssessments';

type UrlTab = 'active' | 'drafts' | 'completed';
type UiTab = 'Active' | 'Drafts' | 'Completed';

const urlToUiTab: Record<UrlTab, UiTab> = {
  active: 'Active',
  drafts: 'Drafts',
  completed: 'Completed',
};

const uiToUrlTab: Record<UiTab, UrlTab> = {
  Active: 'active',
  Drafts: 'drafts',
  Completed: 'completed',
};
interface EvaluationContainerProps<TStatus extends string> {
  basePath: string;
  queryKeyBase: string;
  api: {
    getList: (
      status: TStatus,
      page: number,
      search: string,
      filters: Record<string, string>,
      limit?: number
    ) => Promise<any>;
  };

  statuses: {
    active: TStatus;
    draft: TStatus;
    completed: TStatus;
  };
  Header: React.ComponentType<any>;
  Filters: React.ComponentType<any>;
  ActiveComponent: React.ComponentType<any>;
  DraftComponent: React.ComponentType<any>;
  CompletedComponent: React.ComponentType<any>; // ADD THIS
}

export default function EvaluationContainer<TStatus extends string>({
  basePath,
  queryKeyBase,
  api,
  statuses,
  Header,
  Filters,
  ActiveComponent,
  DraftComponent,
  CompletedComponent,
}: EvaluationContainerProps<TStatus>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // -------------------- PAGE STATE --------------------
  const PAGE_SIZE = 10; // 🔥 single source of truth

  const [activePage, setActivePage] = useState(1);
  const [draftPage, setDraftPage] = useState(1);
  const [completedPage, setCompletedPage] = useState(1);

  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [pendingFilters, setPendingFilters] = useState<Record<string, string>>({});
  const [filters, setFilters] = useState<Record<string, string>>({});

  const [hasInitialized, setHasInitialized] = useState(false);

  const [tabCountsState, setTabCountsState] = useState({
    Active: 0,
    Drafts: 0,
    Completed: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setActivePage(1);
      setDraftPage(1);
      setCompletedPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(pendingFilters);
      setActivePage(1);
      setDraftPage(1);
      setCompletedPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [pendingFilters]);

  useEffect(() => {
    if (!searchParams.get('tab')) {
      router.replace(`${basePath}?tab=active`);
    }
  }, [searchParams, router]);

  const tabFromUrl: UrlTab =
    searchParams.get('tab') === 'drafts' || searchParams.get('tab') === 'completed'
      ? (searchParams.get('tab') as UrlTab)
      : 'active';

  const activeTab: UiTab = urlToUiTab[tabFromUrl];

  // -------------------- QUERIES --------------------

  const results = useQueries({
    queries: [
      {
        queryKey: [queryKeyBase, 'active', activePage, debouncedSearch, filters],
        // queryFn: () => api.getList(statuses.active, activePage, debouncedSearch, filters),
        queryFn: () =>
          api.getList(statuses.active, activePage, debouncedSearch, filters, PAGE_SIZE),

        placeholderData: keepPreviousData,
        enabled: !hasInitialized || activeTab === 'Active',
      },
      {
        queryKey: [queryKeyBase, 'drafts', draftPage, debouncedSearch, filters],
        queryFn: () => api.getList(statuses.draft, draftPage, debouncedSearch, filters, PAGE_SIZE),

        placeholderData: keepPreviousData,
        enabled: !hasInitialized || activeTab === 'Drafts',
      },
      {
        queryKey: [queryKeyBase, 'completed', completedPage, debouncedSearch, filters],
        queryFn: () =>
          api.getList(statuses.completed, completedPage, debouncedSearch, filters, PAGE_SIZE),

        placeholderData: keepPreviousData,
        enabled: !hasInitialized || activeTab === 'Completed',
      },
    ],
  });

  const [activeQuery, draftQuery, completedQuery] = results;

  useEffect(() => {
    if (!hasInitialized) {
      if (activeQuery.data || draftQuery.data || completedQuery.data) {
        setHasInitialized(true);
      }
    }
  }, [activeQuery.data, draftQuery.data, completedQuery.data, hasInitialized]);

  // -------------------- DATA --------------------

  const activeData = activeQuery.data?.rows ?? [];
  const draftData = draftQuery.data?.rows ?? [];
  const completedData = completedQuery.data?.rows ?? [];

  const activeMeta = activeQuery.data?.meta;
  const draftMeta = draftQuery.data?.meta;
  const completedMeta = completedQuery.data?.meta;

  useEffect(() => {
    setTabCountsState((prev) => ({
      Active: activeMeta?.totalCount ?? prev.Active,
      Drafts: draftMeta?.totalCount ?? prev.Drafts,
      Completed: completedMeta?.totalCount ?? prev.Completed,
    }));
  }, [activeMeta, draftMeta, completedMeta]);

  // -------------------- TAB COUNTS (FIXED) --------------------

  // const tabsCount = useMemo(
  //   () => ({
  //     Active: activeMeta?.totalCount ?? 0,
  //     Drafts: draftMeta?.totalCount ?? 0,
  //     Completed: completedMeta?.totalCount ?? 0,
  //   }),
  //   [activeMeta, draftMeta, completedMeta]
  // );
  const handleTabChange = (tab: UiTab) => {
    router.replace(`${basePath}?tab=${uiToUrlTab[tab]}`);
  };

  const handleCreate = () => {
    router.push(`${basePath}/create`);
  };

  return (
    <div className="flex w-full h-full rounded-2xl p-4 shadow-[0_0_8px_0_rgba(15,23,42,0.12)] flex-col">
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onCreate={handleCreate}
        tabCounts={tabCountsState}
      />

      {/* <AssessmentFilters value="" onChange={() => {}} /> */}
      <Filters value={searchInput} onChange={setSearchInput} />

      {activeTab === 'Active' && (
        <ActiveComponent
          data={activeData}
          currentPage={activePage}
          pageCount={activeMeta?.pageCount ?? 1}
          onPageChange={setActivePage}
          pendingFilters={pendingFilters}
          setPendingFilters={setPendingFilters}
        />
      )}

      {activeTab === 'Drafts' && (
        <DraftComponent
          data={draftData}
          currentPage={draftPage}
          pageCount={draftMeta?.pageCount ?? 1}
          onPageChange={setDraftPage}
          pendingFilters={pendingFilters}
          setPendingFilters={setPendingFilters}
        />
      )}

      {activeTab === 'Completed' && (
        <CompletedComponent
          data={completedData}
          currentPage={completedPage}
          pageCount={completedMeta?.pageCount ?? 1}
          onPageChange={setCompletedPage}
          pendingFilters={pendingFilters}
          setPendingFilters={setPendingFilters}
        />
      )}
    </div>
  );
}
