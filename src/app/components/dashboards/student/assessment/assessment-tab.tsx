'use client';

import { useState } from 'react';
import Image from 'next/image';
import OngoingAssessments from './OngoingAssessments';
import UpcomingAssessments from './upcomingAssessments';
import CompletedAssessment from './completedAssessment';

type TabType = 'ongoing' | 'upcoming' | 'completed';

export default function AssessmentTab() {
  const [activeTab, setActiveTab] = useState<TabType>('ongoing');

  const tabs = [
    { id: 'ongoing', label: 'Ongoing' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Completed' },
  ] as const;

  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div className="mx-3">
          <h1 className="text-2xl font-bold text-gray-900">My Assessments</h1>
          <p className="mt-1 text-sm text-gray-500">Track, attempt, and review your assessments</p>
        </div>

        <div className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100">
          <Image src="/assets/notification.svg" alt="Notifications" width={22} height={22} />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
        </div>
      </div>

      {/* Tabs */}
      <div className="relative mb-4">
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
