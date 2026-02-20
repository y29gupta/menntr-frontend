'use client';

import { calculateTimeLeft } from '@/app/utils/calculateTimeLeft';
import AssessmentCard from '../assessment/AssessmentCard';
import { DashboardAssessment } from '../student.services';

type Props = {
  assessments: DashboardAssessment[];
};

export default function OngoingAssessment({ assessments }: Props) {
  // const ongoingAssessments = [
  //   {
  //     assId: '1',
  //     title: 'Mid-Term Test',
  //     type: 'Coding + MCQ',
  //     duration: '2 hours',
  //     status: { kind: 'ends', timeLeft: '1h 20m' } as const,
  //   },
  // ];

  return (
    <div className="bg-white  ">
      <h3 className="font-semibold mb-4">Ongoing Assessment</h3>

      <div className="flex flex-col gap-4">
        {assessments.map((a) => (
          <AssessmentCard
            key={a.id}
            assId={a.id}
            title={a.title}
            type={a.type}
            duration={`${a.durationMinutes} mins`}
            status={{
              kind: 'ends',
              timeLeft: calculateTimeLeft(a.endTime),
            }}
          />
        ))}
      </div>
    </div>
  );
}
