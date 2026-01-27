'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQueries } from '@tanstack/react-query';

import AssessmentHeader from './AssessmentHeader';
import AssessmentFilters from './AssessmentFilters';
import ActiveAssessments from './active/ActiveAssessments';
import DraftAssessments from './drafts/DraftAssessments';

import { assessmentApi } from './assessment.service';
import { AssessmentListResult, AssessmentRow } from './assessment.types';

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

  const [globalFilter, setGlobalFilter] = useState('');

  const results = useQueries({
    queries: [
      {
        queryKey: ['assessments', 'active'],
        queryFn: (): Promise<AssessmentListResult> => assessmentApi.getAssessmentList('active'),
      },
      {
        queryKey: ['assessments', 'drafts'],
        queryFn: (): Promise<AssessmentListResult> => assessmentApi.getAssessmentList('draft'),
      },
      {
        queryKey: ['assessments', 'completed'],
        queryFn: (): Promise<AssessmentListResult> => assessmentApi.getAssessmentList('closed'),
      },
    ],
  });

  const [activeQuery, draftQuery, completedQuery] = results;
  console.log(activeQuery, 'result');

  // const activeData = activeQuery.data ?? [];
  // const draftData = draftQuery.data ?? [];
  // const completedData = completedQuery.data ?? [];

  const activeData = activeQuery.data?.rows ?? [];
  const draftData = draftQuery.data?.rows ?? [];
  const completedData = completedQuery.data?.rows ?? [];

  const tabsCount = useMemo(
    () => ({
      Active: activeData.length,
      Drafts: draftData.length,
      Completed: completedData.length,
    }),
    [activeData.length, draftData.length, completedData.length]
  );

  const handleTabChange = (tab: UiTab) => {
    router.replace(`/admin/assessment?tab=${uiToUrlTab[tab]}`);
  };

  const handleCreate = () => {
    router.push('/admin/assessment/create');
  };

  return (
    <div className="flex  w-full h-full rounded-2xl p-4 shadow-[0_0_8px_0_rgba(15,23,42,0.12)] flex-col">
      <AssessmentHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onCreate={handleCreate}
        tabCounts={tabsCount}
      />

      <AssessmentFilters value={globalFilter} onChange={setGlobalFilter} />

      {activeTab === 'Active' && <ActiveAssessments data={activeData} />}
      {activeTab === 'Drafts' && <DraftAssessments data={draftData} />}
      {activeTab === 'Completed' && <ActiveAssessments data={completedData} />}
    </div>
  );
}
