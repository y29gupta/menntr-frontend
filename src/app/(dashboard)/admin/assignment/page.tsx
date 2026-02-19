'use client';

import ModuleRoute from '@/app/components/auth/ModuleRoute';
import { PERMISSIONS } from '@/app/constants/permissions';
import AssignmentContainer from '@/app/components/dashboards/institution-admin/assignment/AssignmentContainer';

const Page = () => {
  return (
    <ModuleRoute module={PERMISSIONS.ASSIGNMENTS.MODULE}>
      <AssignmentContainer />
    </ModuleRoute>
  );
};

export default Page;
