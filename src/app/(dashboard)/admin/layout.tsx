import SuperAdminIcon from '@/app/components/icons/SuperAdminIcon';
import Profile from '@/app/ui/Profile';
import TopProfileBar from '@/app/ui/TopProfileBar';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex h-full  flex-1 flex-col   gap-4 

w-full
    
    "
    >
      {/* header */}
      <TopProfileBar userRole="Institution Admin Portal" RoleIcon={<SuperAdminIcon />} />

      <div className="flex    h-full sm:pb-0">{children}</div>
    </div>
  );
};

export default layout;
