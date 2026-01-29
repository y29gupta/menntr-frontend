'use client';

import { useRouter } from 'next/navigation';

import { useStudentBulkUpload } from '@/app/hooks/useStudentBulkUpload';
import BulkUpload from '@/app/components/bulkupload/BulkUpload';
import { studentsApi } from '@/app/lib/services/students.api';

export default function StudentBulkUploadPage() {
  const router = useRouter();
  const mutation = useStudentBulkUpload();

  const dropdowns = [
    {
      key: 'category',
      label: 'Select Category',
      options: [
        { label: 'Engineering', value: 'Engineering' },
        { label: 'Medical', value: 'Medical' },
        { label: 'Arts & Science', value: 'Arts & Science' },
        { label: 'Commerce', value: 'Commerce' },
        { label: 'Law', value: 'Law' },
      ],
    },
    {
      key: 'program',
      label: 'Select Program',
      options: [
        { label: 'B.Tech', value: 'B.Tech' },
        { label: 'M.Tech', value: 'M.Tech' },
        { label: 'B.Sc', value: 'B.Sc' },
        { label: 'M.Sc', value: 'M.Sc' },
        { label: 'MBA', value: 'MBA' },
      ],
    },
    {
      key: 'department',
      label: 'Select Department',
      options: [
        { label: 'Computer Science', value: 'Computer Science' },
        { label: 'Mechanical Engineering', value: 'Mechanical Engineering' },
        { label: 'Electrical Engineering', value: 'Electrical Engineering' },
        { label: 'Civil Engineering', value: 'Civil Engineering' },
        { label: 'Biotechnology', value: 'Biotechnology' },
      ],
    },
    {
      key: 'batch',
      label: 'Select Batch',
      options: [
        { label: '2024-25', value: '2024-25' },
        { label: '2023-24', value: '2023-24' },
        { label: '2022-23', value: '2022-23' },
        { label: '2021-22', value: '2021-22' },
        { label: '2020-21', value: '2020-21' },
      ],
      searchable: true,
      searchPlaceholder: 'Search for Batch',
    },
  ];

  return (
    <BulkUpload
      onBack={() => router.push('/admin/student-management')}
      onUpload={(formData) => studentsApi.getEnrollmentMeta()}
      dropdowns={dropdowns}
      //   isUploading={studentsApi.getEnrollmentMeta(}
    />
  );
}
