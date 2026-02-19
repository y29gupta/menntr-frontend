'use client';

import AssessmentContainer from '@/app/components/dashboards/institution-admin/assessment/AssessmentContainer';
import ModuleRoute from '@/app/components/auth/ModuleRoute';
import { PERMISSIONS } from '@/app/constants/permissions';
import AssignmentContainer from '@/app/components/dashboards/institution-admin/assignment/AssignmentContainer';

const Page = () => {
  return (
    <ModuleRoute module={PERMISSIONS.ASSESSMENT.MODULE}>
      <AssessmentContainer />
    </ModuleRoute>
  );
};

export default Page;
