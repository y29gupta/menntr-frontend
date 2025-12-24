import SuperAdminIcon from '@/app/components/icons/SuperAdminIcon';
import Profile from '@/app/ui/Profile';
import React from 'react';

const page = () => {
  return (
    <>
      <main className="h-screen px-4 sm:px-6 lg:px-8 xl:px-10 py-5 flex flex-col gap-6 text-[13px] sm:text-sm lg:text-base overflow-y-auto hide-scrollbar">
        <div className="flex items-center justify-between gap-4 min-w-0">
          <h1 className="flex items-center gap-2 font-semibold text-gray-800 text-base whitespace-nowrap overflow-hidden text-ellipsis">
            <SuperAdminIcon />
            <span className="truncate">
              Super Admin Portal –
              <span className="text-gray-500 ml-1 hidden sm:inline">System admin</span>
            </span>
          </h1>

          <div className="shrink-0">
            <Profile />
          </div>
        </div>
      </main>
    </>
  );
};

export default page;
