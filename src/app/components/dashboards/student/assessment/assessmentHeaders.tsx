import React from 'react';
import Image from 'next/image';
import Profile from '@/app/ui/Profile';

const AssessmentHeaders = () => {
  return (
    <div className="flex items-start justify-between">
      <div className="">
        <h1 className="text-xl font-bold text-gray-900">My Assessments</h1>
        <p className="text-sm text-gray-500">Track, attempt, and review your assessments</p>
      </div>

      <div className="relative gap-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100">
        <Image src="/assets/notification.svg" alt="Notifications" width={30} height={30} />
        <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
        <Profile />
      </div>
    </div>
  );
};

export default AssessmentHeaders;
