'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PrevSubmit from '@/app/components/dashboards/student/assessment/attempts/PrevSubmit';

export default function Page() {
  const router = useRouter();
  const [showPrevSubmit, setShowPrevSubmit] = useState(true);

  const submitAssessment = () => {
    router.replace('/student/assessment/35/submit');
  };

  return (
    <>
      {showPrevSubmit && (
        <PrevSubmit
          durationMinutes={30}
          onTimeUp={submitAssessment}
          onGoBack={() => {
            setShowPrevSubmit(false);
            router.push('/student/assessment/35');
          }}
          onSubmitNow={submitAssessment}
          stats={{
            attended: 25,
            answered: 17,
            unanswered: 8,
            timeTaken: '25 mins',
          }}
        />
      )}
    </>
  );
}
