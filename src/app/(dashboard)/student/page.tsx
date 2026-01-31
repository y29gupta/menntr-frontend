import SuperAdminIcon from '@/app/components/icons/SuperAdminIcon';
import TopProfileBar from '@/app/ui/TopProfileBar';
import React from 'react';

const page = () => {
  return (
    <>
      <TopProfileBar userRole="Student Portal" RoleIcon={<SuperAdminIcon />} />
    </>
  );
};

export default page;
