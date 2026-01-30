import AssessmentAttempt from '@/app/components/dashboards/student/assessment/attempts/AssessmentAttempt';

type PageProps = {
  params: {
    assessmentId: string;
  };
};

export default function Page({ params }: PageProps) {
  return <AssessmentAttempt assessmentId={params.assessmentId} />;
}
