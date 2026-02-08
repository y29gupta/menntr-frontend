'use client';

import StudentManagementPage from '@/app/components/dashboards/institution-admin/student-management/StudentManagementPage';
import ModuleRoute from '@/app/components/auth/ModuleRoute';
import { PERMISSIONS } from '@/app/constants/permissions';

const Page = () => {
  return (
    <ModuleRoute module={PERMISSIONS.STUDENT_MANAGEMENT.MODULE}>
      <div className="w-full h-full">
        <StudentManagementPage />
      </div>
    </ModuleRoute>
  );
};

export default Page;
