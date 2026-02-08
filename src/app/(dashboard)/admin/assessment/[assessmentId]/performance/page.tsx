'use client';

import AssessmentPerformance from '@/app/components/dashboards/institution-admin/assessment/performance/AssessmentPerformance';
import ModuleRoute from '@/app/components/auth/ModuleRoute';
import { PERMISSIONS } from '@/app/constants/permissions';
import { useParams } from 'next/navigation';

export default function AssessmentPerformancePage() {
  const { assessmentId } = useParams();

  return (
    <ModuleRoute module={PERMISSIONS.ASSESSMENT.MODULE}>
      <AssessmentPerformance assessmentId={assessmentId as string} />
    </ModuleRoute>
  );
}
