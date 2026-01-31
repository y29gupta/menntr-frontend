'use client';

import EmptyAssessmentState from './EmptyAssessmentState';
import CompletedAssessmentCard from './CompletedAssessmentCard';

type CompletedAssessmentItem = {
  id: number;
  title: string;
  type: string;
  submittedOn: string;
  status: 'UNDER_EVALUATION' | 'RESULT_PUBLISHED';
};

const completedAssessments: CompletedAssessmentItem[] = [
  {
    id: 1,
    title: 'Data Structures MCQ',
    type: 'MCQ',
    submittedOn: 'Aug 8, 2025',
    status: 'UNDER_EVALUATION',
  },
  {
    id: 2,
    title: 'Data Structures MCQ',
    type: 'MCQ',
    submittedOn: 'Aug 8, 2025',
    status: 'RESULT_PUBLISHED',
  },
  {
    id: 3,
    title: 'Data Structures MCQ',
    type: 'MCQ',
    submittedOn: 'Aug 8, 2025',
    status: 'UNDER_EVALUATION',
  },
];

export function useCompletedAssessments() {
  return {
    completedAssessments,
    isEmpty: completedAssessments.length === 0,
  };
}

const CompletedAssessment = () => {
  const { completedAssessments, isEmpty } = useCompletedAssessments();

  if (isEmpty) {
    return (
      <EmptyAssessmentState
        imageSrc="/assets/empty-ongoing-assessment.svg"
        title="No completed assessments"
        description="You haven’t completed any assessments yet."
      />
    );
  }

  return (
    <div className="space-y-4">
      {completedAssessments.map((assessment) => (
        <CompletedAssessmentCard
          key={assessment.id}
          title={assessment.title}
          type={assessment.type}
          submittedOn={assessment.submittedOn}
          status={assessment.status}
        />
      ))}
    </div>
  );
};

export default CompletedAssessment;
