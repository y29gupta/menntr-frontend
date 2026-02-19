'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import ConfirmModal from '@/app/ui/modals/ConfirmModal';

import { message } from 'antd';
import { assessmentApi } from '../../assessment/assessment.service';
import { createEvaluationColumns } from '../../assessment/active/active.columns';
import ActiveAssessmentsTable from '../../assessment/active/ActiveAssessmentsTable';
import { assignmentApi } from '../assignment.service';

type Props = {
  data: any[];
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  pendingFilters: Record<string, string>;
  setPendingFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export default function DraftAssignments({
  data,
  currentPage,
  pageCount,
  onPageChange,
  pendingFilters,
  setPendingFilters,
}: Props) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => assignmentApi.deleteDraftAssignment(id),

    onSuccess: () => {
      message.success('Assignment deleted successfully');

      queryClient.invalidateQueries({
        queryKey: ['assignments', 'draft'],
      });

      setDeleteId(null);
    },

    onError: () => {
      message.error('Failed to delete assignment');
    },
  });

  const columns = createEvaluationColumns({
    entityBasePath: '/admin/assignment',
    entityLabel: 'Assignment',
    // queryKeyBase: 'assignments',
    mode: 'draft',
    onDelete: (id) => setDeleteId(id),
    onPublish: (id) => {
      console.log('Publish assignment', id);
      // later add publish mutation
    },
  });

  return (
    <>
      <ActiveAssessmentsTable
        columns={columns}
        data={data}
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={onPageChange}
        columnFilters={pendingFilters}
        onColumnFilterChange={(key: any, value: any) =>
          setPendingFilters((prev) => ({
            ...prev,
            [key]: value,
          }))
        }
        showColumnFilters={true}
      />

      <ConfirmModal
        open={!!deleteId}
        title="Delete Assignment"
        description="Are you sure you want to delete this assignment?"
        warning="This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          if (!deleteId) return;
          deleteMutation.mutate(deleteId);
        }}
      />
    </>
  );
}
