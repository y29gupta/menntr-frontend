import SuperAdminIcon from '@/app/components/icons/SuperAdminIcon';
import Profile from '@/app/ui/Profile';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col  gap-4  h-full">
      {/* header */}
      <div className="flex px-4 py-2 rounded-2xl items-center justify-between gap-4 min shadow-[0_0_16px_0_#1D2F5126] backdrop-blur-[40px]">
        <h1 className="flex items-center gap-2 font-semibold text-gray-800 text-base whitespace-nowrap overflow-hidden text-ellipsis">
          <SuperAdminIcon />
          <span className="truncate">Institution Admin Portal</span>
        </h1>

        <div className="shrink-0">
          <Profile />
        </div>
      </div>
      <div className="flex flex-1 ">{children}</div>
    </div>
  );
};

export default layout;
