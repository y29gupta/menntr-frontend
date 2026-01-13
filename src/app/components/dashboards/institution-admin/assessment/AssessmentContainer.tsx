'use client';

import { useEffect, useState } from 'react';
import AssessmentHeader from './AssessmentHeader';
import AssessmentFilters from './AssessmentFilters';
import ActiveAssessments from './active/ActiveAssessments';
import CreateAssessment from './create/CreateAssessment';
import DraftAssessments from './drafts/DraftAssessments';
import { useQueries } from '@tanstack/react-query';
import { assessmentApi } from './assessment.service';
import { AssessmentRow } from './active/active.columns';

export default function AssessmentContainer() {
  const [activeTab, setActiveTab] = useState<'Active' | 'Drafts' | 'Completed'>('Active');

  const [globalFilter, setGlobalFilter] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [tabsCount, setTabsCount] = useState({
    Active: 0,
    Drafts: 0,
    Completed: 0,
  });

  const results = useQueries({
    queries: [
      {
        queryKey: ['assessments', 'active'],
        queryFn: (): Promise<AssessmentRow[]> => assessmentApi.getAssessmentList('active'),
      },
      {
        queryKey: ['assessments', 'draft'],
        queryFn: () => assessmentApi.getAssessmentList('draft'),
      },
      {
        queryKey: ['assessments', 'completed'],
        queryFn: () => assessmentApi.getAssessmentList('closed'),
      },
    ],
  });

  const [activeQuery, draftQuery, completedQuery] = results;

  const activeData: AssessmentRow[] = activeQuery.data ?? [];
  const draftData: AssessmentRow[] = draftQuery.data ?? [];
  const completedData = completedQuery.data ?? [];

  useEffect(() => {
    setTabsCount({
      Active: activeData.length,
      Drafts: draftData.length,
      Completed: completedData.length,
    });
  }, [activeData.length, draftData.length, completedData.length]);

  return (
    <div
      className="flex w-full rounded-2xl p-4  backdrop-blur-[100px] shadow-[0_0_8px_0_rgba(15,23,42,0.12)]
 flex-col"
    >
      {isCreating ? (
        <CreateAssessment onCancel={() => setIsCreating(false)} />
      ) : (
        <>
          <AssessmentHeader
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onCreate={() => setIsCreating(true)}
            tabCounts={tabsCount}
          />

          <AssessmentFilters value={globalFilter} onChange={setGlobalFilter} />

          {/* {activeTab === 'Active' && <ActiveAssessments setTabsCount={setTabsCount} />}

          {activeTab === 'Drafts' && <DraftAssessments setTabsCount={setTabsCount} />} */}

          {activeTab === 'Active' && <ActiveAssessments data={activeData} />}

          {activeTab === 'Drafts' && <DraftAssessments data={draftData} />}

          {/* {activeTab === 'Completed' && <CompletedAssessments setTabsCount={setTabsCount} />} */}
        </>
      )}
    </div>
  );
}
