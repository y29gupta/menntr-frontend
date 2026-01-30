'use client';

import { useState } from 'react';
import Image from 'next/image';
import OngoingAssessments from './OngoingAssessments';
import UpcomingAssessments from './upcomingAssessments';
import CompletedAssessment from './completedAssessment';
import AssessmentHeaders from './assessmentHeaders';

type TabType = 'ongoing' | 'upcoming' | 'completed';

export default function AssessmentTab() {
  const [activeTab, setActiveTab] = useState<TabType>('ongoing');

  const tabs = [
    { id: 'ongoing', label: 'Ongoing' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Completed' },
  ] as const;

  return (
    <div className="min-h-screen w-full bg-white relative ">
      {/* Header */}
      <AssessmentHeaders />

      {/* Tabs */}
      <div className="relative mb-4 mt-3">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-200" />
        <div className="relative flex gap-6 text-gray-500">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-2 ${
                activeTab === tab.id ? 'text-gray-900' : 'hover:text-gray-700'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-purple-500 rounded-t-sm" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">
        {activeTab === 'ongoing' && <OngoingAssessments />}
        {activeTab === 'upcoming' && <UpcomingAssessments />}
        {activeTab === 'completed' && <CompletedAssessment />}
      </div>
    </div>
  );
}
