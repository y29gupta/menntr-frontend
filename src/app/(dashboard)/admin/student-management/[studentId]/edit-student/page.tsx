'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import AddStudentLayout from '@/app/components/dashboards/institution-admin/student-management/AddStudentLayout';
import { studentsApi } from '@/app/lib/services/students.api';
import { mapStudentApiToFormValues } from '@/app/components/dashboards/institution-admin/student-management/student.utils';

export default function EditStudentPage() {
  const { studentId } = useParams<{ studentId: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => studentsApi.getStudentById(studentId),
    enabled: !!studentId,
  });

  if (isLoading || !data) return null;

  const defaultValues = mapStudentApiToFormValues(data);
  console.log(studentId, 'page');

  return <AddStudentLayout mode="edit" studentId={studentId} defaultValues={defaultValues} />;
}
