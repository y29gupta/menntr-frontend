'use client';

import ModuleRoute from '@/app/components/auth/ModuleRoute';
import { PERMISSIONS } from '@/app/constants/permissions';
import CreateAssignment from '@/app/components/dashboards/institution-admin/assignment/create/CreateAssignment';

export default function Page() {
  return (
    <ModuleRoute module={PERMISSIONS.ASSIGNMENTS.MODULE}>
      <CreateAssignment />
    </ModuleRoute>
  );
}
