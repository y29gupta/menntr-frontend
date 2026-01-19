// import AssessmentContainer from '@/app/components/dashboards/institution-admin/assessment/AssessmentContainer';
import AssessmentContainer from '@/app/components/dashboards/institution-admin/assessment/AssessmentContainer';
import { SearchParams } from 'next/dist/server/request/search-params';
import { redirect } from 'next/navigation';
import React from 'react';

const page = ({ searchParams }: { searchParams: { tab?: string } }) => {
  // if (!searchParams.tab) {
  //   redirect('/admin/assessment?tab=active');
  // }

  return (
    <>
      <AssessmentContainer />
    </>
  );
};

export default page;
