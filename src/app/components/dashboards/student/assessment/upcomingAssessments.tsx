'use client';

import UpcomingAssessmentCard from './UpcomingAssessmentCard';
import EmptyAssessmentState from './EmptyAssessmentState';

type UpcomingAssessment = {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  duration: string;
};

const upcomingAssessments: UpcomingAssessment[] = [
  {
    id: 1,
    title: 'Data Structures MCQ',
    type: 'MCQ',
    date: 'Tomorrow',
    time: '10:00 AM',
    duration: '60 mins',
  },
  {
    id: 2,
    title: 'Data Structures MCQ',
    type: 'MCQ',
    date: 'Tomorrow',
    time: '10:00 AM',
    duration: '60 mins',
  },
  {
    id: 3,
    title: 'Data Structures MCQ',
    type: 'MCQ',
    date: 'Tomorrow',
    time: '10:00 AM',
    duration: '60 mins',
  },
];

export function useUpcomingAssessments() {
  return {
    upcomingAssessments,
    isEmpty: upcomingAssessments.length === 0,
  };
}

export default function UpcomingAssessments() {
  const { upcomingAssessments, isEmpty } = useUpcomingAssessments();

  if (isEmpty) {
    return (
      <EmptyAssessmentState
        imageSrc="/assets/empty-ongoing-assessment.svg"
        title="No upcoming assessments"
        description="You don’t have any upcoming assessments scheduled."
      />
    );
  }

  return (
    <div className="space-y-4">
      {upcomingAssessments.map((assessment) => (
        <UpcomingAssessmentCard
          key={assessment.id}
          title={assessment.title}
          type={assessment.type}
          date={assessment.date}
          time={assessment.time}
          duration={assessment.duration}
        />
      ))}
    </div>
  );
}
