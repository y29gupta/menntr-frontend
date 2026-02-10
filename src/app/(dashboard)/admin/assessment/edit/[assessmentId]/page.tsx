'use client';

import CreateAssessment from '@/app/components/dashboards/institution-admin/assessment/create/CreateAssessment';
import ModuleRoute from '@/app/components/auth/ModuleRoute';
import { PERMISSIONS } from '@/app/constants/permissions';
import { useParams } from 'next/navigation';

export default function EditAssessmentPage() {
  const { assessmentId } = useParams();

  return (
    <ModuleRoute module={PERMISSIONS.ASSESSMENT.MODULE}>
      <CreateAssessment mode="edit" editAssessmentId={assessmentId as string} />
    </ModuleRoute>
  );
}
