'use client';

import CreateAssessment from '@/app/components/dashboards/institution-admin/assessment/create/CreateAssessment';
import ModuleRoute from '@/app/components/auth/ModuleRoute';
import { PERMISSIONS } from '@/app/constants/permissions';

export default function Page() {
  return (
    <ModuleRoute module={PERMISSIONS.ASSESSMENT.MODULE}>
      <CreateAssessment />
    </ModuleRoute>
  );
}
