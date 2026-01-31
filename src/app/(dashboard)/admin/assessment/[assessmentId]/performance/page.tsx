'use client';

import AssessmentPerformance from '@/app/components/dashboards/institution-admin/assessment/performance/AssessmentPerformance';
import { useParams } from 'next/navigation';

export default function AssessmentPerformancePage() {
  const { assessmentId } = useParams();

  return <AssessmentPerformance assessmentId={assessmentId as string} />;
}
