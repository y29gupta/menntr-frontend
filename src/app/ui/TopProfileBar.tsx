import React from 'react';
import SuperAdminIcon from '../components/icons/SuperAdminIcon';
import Profile from './Profile';

type topBarSchema = {
  userRole: string;
  RoleIcon: React.ReactNode;
};

const TopProfileBar = ({ userRole, RoleIcon }: topBarSchema) => {
  return (
    <>
      {/* header */}
      <div className="flex relative px-4 py-2 rounded-2xl items-center justify-between gap-4 min shadow-[0_0_16px_0_#1D2F5126] backdrop-blur-[40px]">
        <h1 className="flex items-center gap-2 text-xl font-semibold text-[#1A2C50] text-base whitespace-nowrap overflow-hidden text-ellipsis">
          {RoleIcon}
          <span className="truncate">{userRole}</span>
        </h1>

        <div className="shrink-0">
          <Profile />
        </div>
      </div>
    </>
  );
};

export default TopProfileBar;
