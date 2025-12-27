import SuperAdminIcon from '@/app/components/icons/SuperAdminIcon';
import Profile from '@/app/ui/Profile';
import TopProfileBar from '@/app/ui/TopProfileBar';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full  flex-col   gap-4  ">
      {/* header */}
      <TopProfileBar userRole="Institution Admin Portal" RoleIcon={<SuperAdminIcon />} />

      <div className="flex flex-1 h-full">{children}</div>
    </div>
  );
};

export default layout;
