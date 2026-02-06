// 'use client';

// import { useEffect, useMemo, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useQueries } from '@tanstack/react-query';

// import AssessmentHeader from './AssessmentHeader';
// import AssessmentFilters from './AssessmentFilters';
// import ActiveAssessments from './active/ActiveAssessments';
// import DraftAssessments from './drafts/DraftAssessments';

// import { assessmentApi } from './assessment.service';
// import { AssessmentListResult, AssessmentRow } from './assessment.types';

// type UrlTab = 'active' | 'drafts' | 'completed';
// type UiTab = 'Active' | 'Drafts' | 'Completed';

// const urlToUiTab: Record<UrlTab, UiTab> = {
//   active: 'Active',
//   drafts: 'Drafts',
//   completed: 'Completed',
// };

// const uiToUrlTab: Record<UiTab, UrlTab> = {
//   Active: 'active',
//   Drafts: 'drafts',
//   Completed: 'completed',
// };

// export default function AssessmentContainer() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     if (!searchParams.get('tab')) {
//       router.replace('/admin/assessment?tab=active');
//     }
//   }, [searchParams, router]);

//   const tabFromUrl: UrlTab =
//     searchParams.get('tab') === 'drafts' || searchParams.get('tab') === 'completed'
//       ? (searchParams.get('tab') as UrlTab)
//       : 'active';

//   const activeTab: UiTab = urlToUiTab[tabFromUrl];

//   const [globalFilter, setGlobalFilter] = useState('');

//   const results = useQueries({
//     queries: [
//       {
//         queryKey: ['assessments', 'active'],
//         queryFn: (): Promise<AssessmentListResult> => assessmentApi.getAssessmentList('active'),
//       },
//       {
//         queryKey: ['assessments', 'drafts'],
//         queryFn: (): Promise<AssessmentListResult> => assessmentApi.getAssessmentList('draft'),
//       },
//       {
//         queryKey: ['assessments', 'completed'],
//         queryFn: (): Promise<AssessmentListResult> => assessmentApi.getAssessmentList('closed'),
//       },
//     ],
//   });

//   const [activeQuery, draftQuery, completedQuery] = results;
//   console.log(activeQuery, 'result');

//   // const activeData = activeQuery.data ?? [];
//   // const draftData = draftQuery.data ?? [];
//   // const completedData = completedQuery.data ?? [];

//   const activeData = activeQuery.data?.rows ?? [];
//   const draftData = draftQuery.data?.rows ?? [];
//   const completedData = completedQuery.data?.rows ?? [];

//   const tabsCount = useMemo(
//     () => ({
//       Active: activeData.length,
//       Drafts: draftData.length,
//       Completed: completedData.length,
//     }),
//     [activeData.length, draftData.length, completedData.length]
//   );

//   const handleTabChange = (tab: UiTab) => {
//     router.replace(`/admin/assessment?tab=${uiToUrlTab[tab]}`);
//   };

//   const handleCreate = () => {
//     router.push('/admin/assessment/create');
//   };

//   return (
//     <div className="flex  w-full h-full rounded-2xl p-4 shadow-[0_0_8px_0_rgba(15,23,42,0.12)] flex-col">
//       <AssessmentHeader
//         activeTab={activeTab}
//         onTabChange={handleTabChange}
//         onCreate={handleCreate}
//         tabCounts={tabsCount}
//       />

//       <AssessmentFilters value={globalFilter} onChange={setGlobalFilter} />

//       {activeTab === 'Active' && <ActiveAssessments data={activeData} />}
//       {activeTab === 'Drafts' && <DraftAssessments data={draftData} />}
//       {activeTab === 'Completed' && <ActiveAssessments data={completedData} />}
//     </div>
//   );
// }

'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { keepPreviousData, useQueries } from '@tanstack/react-query';

import AssessmentHeader from './AssessmentHeader';
import AssessmentFilters from './AssessmentFilters';
import ActiveAssessments from './active/ActiveAssessments';
import DraftAssessments from './drafts/DraftAssessments';

import { assessmentApi } from './assessment.service';
import { AssessmentListResult } from './assessment.types';

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

export default function AssessmentContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // -------------------- PAGE STATE --------------------
  const [activePage, setActivePage] = useState(1);
  const [draftPage, setDraftPage] = useState(1);
  const [completedPage, setCompletedPage] = useState(1);

  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [pendingFilters, setPendingFilters] = useState<Record<string, string>>({});
  const [filters, setFilters] = useState<Record<string, string>>({});

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
      router.replace('/admin/assessment?tab=active');
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
        queryKey: ['assessments', 'active', activePage, debouncedSearch, filters],
        queryFn: () =>
          assessmentApi.getAssessmentList('active', activePage, debouncedSearch, filters),
        placeholderData: keepPreviousData,
        // enabled: activeTab === 'Active',
      },
      {
        queryKey: ['assessments', 'drafts', draftPage, debouncedSearch, filters],
        queryFn: () =>
          assessmentApi.getAssessmentList('draft', draftPage, debouncedSearch, filters),
        placeholderData: keepPreviousData,
        // enabled: activeTab === 'Drafts',
      },
      {
        queryKey: ['assessments', 'completed', completedPage, debouncedSearch, filters],
        queryFn: () =>
          assessmentApi.getAssessmentList('completed', completedPage, debouncedSearch, filters),
        placeholderData: keepPreviousData,
        // enabled: activeTab === 'Completed',
      },
    ],
  });

  const [activeQuery, draftQuery, completedQuery] = results;

  // -------------------- DATA --------------------

  const activeData = activeQuery.data?.rows ?? [];
  const draftData = draftQuery.data?.rows ?? [];
  const completedData = completedQuery.data?.rows ?? [];

  const activeMeta = activeQuery.data?.meta;
  const draftMeta = draftQuery.data?.meta;
  const completedMeta = completedQuery.data?.meta;

  // -------------------- TAB COUNTS (FIXED) --------------------

  const tabsCount = useMemo(
    () => ({
      Active: activeMeta?.totalCount ?? 0,
      Drafts: draftMeta?.totalCount ?? 0,
      Completed: completedMeta?.totalCount ?? 0,
    }),
    [activeMeta, draftMeta, completedMeta]
  );

  const handleTabChange = (tab: UiTab) => {
    router.replace(`/admin/assessment?tab=${uiToUrlTab[tab]}`);
  };

  const handleCreate = () => {
    router.push('/admin/assessment/create');
  };

  return (
    <div className="flex w-full h-full rounded-2xl p-4 shadow-[0_0_8px_0_rgba(15,23,42,0.12)] flex-col">
      <AssessmentHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onCreate={handleCreate}
        tabCounts={tabsCount}
      />

      {/* <AssessmentFilters value="" onChange={() => {}} /> */}
      <AssessmentFilters value={searchInput} onChange={setSearchInput} />

      {activeTab === 'Active' && (
        <ActiveAssessments
          data={activeData}
          currentPage={activePage}
          pageCount={activeMeta?.pageCount ?? 1}
          onPageChange={setActivePage}
          pendingFilters={pendingFilters}
          setPendingFilters={setPendingFilters}
        />
      )}

      {activeTab === 'Drafts' && (
        <DraftAssessments
          data={draftData}
          currentPage={draftPage}
          pageCount={draftMeta?.pageCount ?? 1}
          onPageChange={setDraftPage}
          pendingFilters={pendingFilters}
          setPendingFilters={setPendingFilters}
        />
      )}

      {activeTab === 'Completed' && (
        <ActiveAssessments
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
