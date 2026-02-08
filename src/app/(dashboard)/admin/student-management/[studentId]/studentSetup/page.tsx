'use client';

import StudentSetupForm from '@/app/components/dashboards/institution-admin/student-management/createStudent/StudentSetupForm';
import ModuleRoute from '@/app/components/auth/ModuleRoute';
import { PERMISSIONS } from '@/app/constants/permissions';

const Page = () => {
  return (
    <ModuleRoute module={PERMISSIONS.STUDENT_MANAGEMENT.MODULE}>
      <div className="w-full">
        <StudentSetupForm />
      </div>
    </ModuleRoute>
  );
};

export default Page;
