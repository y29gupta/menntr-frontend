import CreateAssessment from '@/app/components/dashboards/institution-admin/assessment/create/CreateAssessment';

type Props = {
  params: Promise<{
    assessmentId: string;
  }>;
};

export default async function EditAssessmentPage({ params }: Props) {
  const { assessmentId } = await params;

  

  return <CreateAssessment mode="edit" editAssessmentId={assessmentId} />;
}
