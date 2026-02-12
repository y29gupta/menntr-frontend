'use client';

import AssessmentCard from '../assessment/AssessmentCard';
import { DashboardAssessment } from '../student.services';

type Props = {
  assessments: DashboardAssessment[];
};

export default function PendingAssessment({ assessments }: Props) {
  return (
    <div className="bg-white">
      <h3 className="font-semibold mb-4">Pending Assessments</h3>

      <div className="flex flex-col gap-4">
        {assessments.map((a) => (
          <AssessmentCard
            key={a.id}
            assId={a.id}
            title={a.title}
            type={a.type}
            duration={`${a.durationMinutes} mins`}
            status={{ kind: 'pending' }}
          />
        ))}
      </div>
    </div>
  );
}
