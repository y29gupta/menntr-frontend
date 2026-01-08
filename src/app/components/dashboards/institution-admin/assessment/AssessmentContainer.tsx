'use client';

import { useState } from 'react';
import AssessmentHeader from './AssessmentHeader';
import AssessmentFilters from './AssessmentFilters';
import ActiveAssessments from './active/ActiveAssessments';
import { assessmentDummyData } from './active/assessment.dummy';
import CreateAssessment from './create/CreateAssessment';

export default function AssessmentContainer() {
  const [activeTab, setActiveTab] = useState<'Active' | 'Drafts' | 'Completed'>('Active');

  const [globalFilter, setGlobalFilter] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const tabCounts = {
    Active: assessmentDummyData.length,
    Drafts: 0,
    Completed: 0,
  };

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
            tabCounts={tabCounts}
          />

          <AssessmentFilters value={globalFilter} onChange={setGlobalFilter} />

          {activeTab === 'Active' && <ActiveAssessments />}
        </>
      )}
    </div>
  );
}
