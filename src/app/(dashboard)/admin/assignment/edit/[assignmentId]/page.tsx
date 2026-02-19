'use client';

import ModuleRoute from '@/app/components/auth/ModuleRoute';
import { PERMISSIONS } from '@/app/constants/permissions';
import { useParams } from 'next/navigation';
import CreateAssignment from '@/app/components/dashboards/institution-admin/assignment/create/CreateAssignment';

export default function EditAssignmentPage() {
  const { assignmentId } = useParams();

  return (
    <ModuleRoute module={PERMISSIONS.ASSIGNMENTS.MODULE}>
      <CreateAssignment mode="edit" editAssignmentId={assignmentId as string} />
    </ModuleRoute>
  );
}
