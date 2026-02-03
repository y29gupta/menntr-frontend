'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PrevSubmit from '@/app/components/dashboards/student/assessment/attempts/PrevSubmit';
import { useMutation, useQuery } from '@tanstack/react-query';
import { assessmentApi } from '@/app/components/dashboards/student/assessment/attempts/assessment.service';

export default function Page() {
  const router = useRouter();
  const [showPrevSubmit, setShowPrevSubmit] = useState(true);
  const params = useParams();

  const assessmentId = typeof params.assessmentId === 'string' ? params.assessmentId : '';

  const { data, isLoading } = useQuery({
    queryKey: ['submit-preview', assessmentId],
    queryFn: () => assessmentApi.getSubmitPreview(assessmentId),
    enabled: !!assessmentId,
  });

  const submitMutation = useMutation({
    mutationFn: () => assessmentApi.submitAssessment(assessmentId),

    onSuccess: (res) => {
      // store submit response for submit screen
      sessionStorage.setItem('assessment-submit-response', JSON.stringify(res));

      // redirect to submit screen
      router.replace(`/student/assessment/${assessmentId}/submit`);
    },
  });

  if (isLoading || !data) return null;

  const submitAssessment = () => {
    submitMutation.mutate();
  };

  return (
    <>
      {showPrevSubmit && (
        <PrevSubmit
          durationMinutes={30}
          onTimeUp={submitAssessment}
          onGoBack={() => {
            setShowPrevSubmit(false);
            router.push(`/student/assessment/${assessmentId}`);
          }}
          onSubmitNow={submitAssessment}
          stats={{
            attended: 25,
            answered: data.attended,
            unanswered: data.unanswered,
            timeTaken: `${data.time_taken_minutes} mins`,
          }}
        />
      )}
    </>
  );
}
