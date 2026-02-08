'use client';

import { useEffect, useState } from 'react';
import BulkUpload from '@/app/components/bulkupload/BulkUpload';
import { BulkUploadDropdown } from '@/app/components/bulkupload/bulkUpload.types';
import { fetchDashboardData } from '@/app/lib/api/dashboardApi';
import { useRouter } from 'next/navigation';

export default function StudentBulkUploadPage() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [departmentId, setDepartmentId] = useState<string | null>(null);

  const [dropdowns, setDropdowns] = useState<BulkUploadDropdown[]>([
    { key: 'category_role_id', label: 'Select Category', options: [] },
    { key: 'program_role_id', label: 'Select Program', options: [] }, // optional
    {
      key: 'department_role_id',
      label: 'Select Department',
      options: [],
      searchable: true,
      searchPlaceholder: 'Search department',
    },
    {
      key: 'batch_id',
      label: 'Select Batch',
      options: [],
      searchable: true,
      searchPlaceholder: 'Search batch',
    },
  ]);

  /* ---------------- CATEGORY ---------------- */

  useEffect(() => {
    async function loadCategories() {
      const res = await fetchDashboardData<any>('/students/academic/meta');

      setDropdowns((prev) => [
        {
          ...prev[0],
          options: res.programs.map((p: any) => ({
            label: p.name,
            value: String(p.id),
          })),
        },
        prev[1],
        prev[2],
        prev[3],
      ]);
    }

    loadCategories();
  }, []);

  /* ---------------- DEPARTMENTS ---------------- */

  useEffect(() => {
    if (!categoryId) return;

    async function loadDepartments() {
      const res = await fetchDashboardData<any>(
        `/students/academic/meta/departments?category_role_id=${categoryId}`
      );

      setDropdowns((prev) => [
        prev[0],
        prev[1],
        {
          ...prev[2],
          options: res.departments.map((d: any) => ({
            label: d.name,
            value: String(d.id),
          })),
        },
        { ...prev[3], options: [] },
      ]);
    }

    loadDepartments();
  }, [categoryId]);

  /* ---------------- BATCHES ---------------- */

  useEffect(() => {
    if (!departmentId) return;

    async function loadBatches() {
      const res = await fetchDashboardData<any>(
        `/students/academic/meta/batches?department_role_id=${departmentId}`
      );

      setDropdowns((prev) => [
        prev[0],
        prev[1],
        prev[2],
        {
          ...prev[3],
          options: res.batches.map((b: any) => ({
            label: `${b.name} (${b.academic_year})`,
            value: String(b.id),
          })),
        },
      ]);
    }

    loadBatches();
  }, [departmentId]);

  /* ---------------- UPLOAD ---------------- */

  const handleUpload = async (formData: FormData) => {
    setIsUploading(true);
    try {
      await fetchDashboardData('/students/bulk-upload', {
        method: 'POST',
        body: formData,
      });

      alert('Students uploaded successfully');
      router.back();
    } finally {
      setIsUploading(false);
    }
  };

  /* ---------------- SELECTION SYNC ---------------- */

  const syncSelection = (key: string, value: string) => {
    if (key === 'category_role_id') {
      setCategoryId(value);
      setDepartmentId(null);
    }

    if (key === 'department_role_id') {
      setDepartmentId(value);
    }
  };

  return (
    <BulkUpload
      onBack={() => router.back()}
      isUploading={isUploading}
      onUpload={handleUpload}
      dropdowns={dropdowns.map((d) => ({
        ...d,
        onChangeCapture: (v: string) => syncSelection(d.key, v),
      }))}
    />
  );
}
