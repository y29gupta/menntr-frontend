'use client';

import AssessmentCard, { AssessmentStatus } from './AssessmentCard';
import EmptyAssessmentState from './EmptyAssessmentState';

type Assessment = {
  id: number;
  title: string;
  type: string;
  duration: string;
  status: AssessmentStatus;
};

const assessments: Assessment[] = [
  {
    id: 1,
    title: 'Mid-Term test',
    type: 'Coding + MCQ',
    duration: '2 hours',
    status: { kind: 'pending' },
  },
  {
    id: 2,
    title: 'Mid-Term test',
    type: 'Coding + MCQ',
    duration: '2 hours',
    status: { kind: 'pending' },
  },
  {
    id: 3,
    title: 'Mid-Term test',
    type: 'Coding + MCQ',
    duration: '2 hours',
    status: { kind: 'ends', timeLeft: '47h 12m' },
  },
  {
    id: 4,
    title: 'Mid-Term test',
    type: 'Coding + MCQ',
    duration: '2 hours',
    status: { kind: 'ends', timeLeft: '23h 05m' },
  },
  {
    id: 5,
    title: 'Mid-Term test',
    type: 'Coding + MCQ',
    duration: '2 hours',
    status: { kind: 'ends', timeLeft: '12h 40m' },
  },
];

export function useOngoingAssessments() {
  return {
    assessments,
    isEmpty: assessments.length === 0,
  };
}

export default function OngoingAssessments() {
  const { assessments, isEmpty } = useOngoingAssessments();

  if (isEmpty) {
    return (
      <EmptyAssessmentState
        imageSrc="/assets/empty-ongoing-assessment.svg"
        title="No ongoing assessments"
        description="You’re all caught up for now. Check upcoming assessments to stay prepared."
      />
    );
  }

  return (
    <div className="space-y-4">
      {assessments.map((assessment) => (
        <AssessmentCard
          key={assessment.id}
          title={assessment.title}
          type={assessment.type}
          duration={assessment.duration}
          status={assessment.status}
        />
      ))}
    </div>
  );
}
