'use client';

import { useEffect, useState } from 'react';
import DataTable from '@/app/components/table/DataTable';
import { studentColumns } from './student.columns';
import { useStudents } from '@/app/hooks/useStudents';
import StudentIcon from '@/app/components/icons/StudentIcon';
import { Plus, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ConfirmModal from '@/app/ui/modals/ConfirmModal';
import { studentsApi } from '@/app/lib/services/students.api';
import { useQueryClient } from '@tanstack/react-query';
import PermissionGate from '@/app/components/auth/PermissionGate';
import { PERMISSIONS } from '@/app/constants/permissions';

export default function StudentManagementPage() {
  const [page, setPageState] = useState(1);

  const setPage = (page: number) => {
    setPageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showFilters, setShowFilters] = useState(true);

  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [pendingFilters, setPendingFilters] = useState<Record<string, string>>(
    {}
  );

  const [deleteStudentId, setDeleteStudentId] = useState<string | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { data, isLoading } = useStudents(page, debouncedSearch, filters);

  const queryClient = useQueryClient();
  const router = useRouter();

  const meta = data?.meta ?? {
    totalCount: 0,
    currentPage: 1,
    pageCount: 1,
    isFirstPage: true,
    isLastPage: true,
    previousPage: null,
    nextPage: null,
  };

  const students = data?.data ?? [];

  /* ---------------- SEARCH DEBOUNCE ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  /* ---------------- FILTER DEBOUNCE ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(pendingFilters);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [pendingFilters]);

  const redirectToPerformancePage = (student: { id: string }) => {
    router.push(`/admin/student-management/${student.id}/performance`);
  };

  return (
    <>
      <div className="w-full space-y-4 p-4 rounded-2xl">
        {/* HEADER */}
        <div>
          <div className="flex gap-2">
            <StudentIcon />
            <h2 className="text-[#1A2C50] text-[20px]">Student Management</h2>
          </div>
          <p className="text-[14px] text-[#636771]">
            Manage users, roles, access level and department assignments
          </p>
        </div>

        {/* TITLE + ACTIONS */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg font-semibold text-[#1A2C50]">
            Total Students ({meta.totalCount})
          </h2>

          <div className="flex gap-2">
            <PermissionGate
              permission={PERMISSIONS.STUDENT_MANAGEMENT.STUDENTS.BULK_UPLOAD}
            >
              <button
                onClick={() =>
                  router.push('/admin/student-management/bulk-upload')
                }
                className="px-4 flex items-center gap-2 py-2 text-sm rounded-[64px] border border-[#904BFF] !text-[#904BFF] hover:bg-gray-50"
              >
                <Upload size={16} /> Bulk Upload
              </button>
            </PermissionGate>

            <PermissionGate
              permission={PERMISSIONS.STUDENT_MANAGEMENT.STUDENTS.CREATE}
            >
              <button
                onClick={() =>
                  router.push('/admin/student-management/add-student')
                }
                className="px-4 py-2 flex items-center gap-1 text-sm rounded-[64px]
              bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
              !text-white hover:bg-[#6D28D9]"
              >
                <Plus size={15} /> Add Student
              </button>
            </PermissionGate>
          </div>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            className="w-full sm:max-w-80 px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="Search for students"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <button
            className="px-4 py-2 text-sm border border-gray-300 rounded-md"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            Filter
          </button>
        </div>

        {/* TABLE */}
        <div className="relative -mx-4 sm:mx-0 sm:overflow-visible overflow-x-auto">
          <DataTable
            columns={studentColumns}
            data={students}
            showColumnFilters={showFilters}
            isLoading={isLoading}
            columnFilters={pendingFilters}
            currentPage={meta.currentPage}
            pageCount={meta.pageCount}
            canPreviousPage={!meta.isFirstPage}
            canNextPage={!meta.isLastPage}
            onPreviousPage={() => meta.previousPage && setPage(meta.previousPage)}
            onNextPage={() => meta.nextPage && setPage(meta.nextPage)}
            onColumnFilterChange={(key, value) => {
              setPendingFilters((prev) => ({ ...prev, [key]: value }));
            }}
            meta={{
              onRowClick: redirectToPerformancePage,
              onDeleteClick: (studentId: string) => {
                setDeleteStudentId(studentId);
                setOpenDeleteModal(true);
              },
              setPage, // ✅ REQUIRED FOR FIRST / LAST / PAGE CLICK
            }}
          />
        </div>
      </div>

      {/* DELETE MODAL */}
      <ConfirmModal
        open={openDeleteModal}
        title="Delete Student"
        description="Are you sure you want to delete this student?"
        warning="This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => {
          setOpenDeleteModal(false);
          setDeleteStudentId(null);
        }}
        onConfirm={async () => {
          if (!deleteStudentId) return;

          try {
            await studentsApi.deleteStudent(deleteStudentId);
            queryClient.invalidateQueries({ queryKey: ['students'] });

            setOpenDeleteModal(false);
            setDeleteStudentId(null);
          } catch (error) {
            console.error(error);
          }
        }}
      />
    </>
  );
}
