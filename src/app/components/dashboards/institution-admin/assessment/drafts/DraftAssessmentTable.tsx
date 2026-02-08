'use client';

import DataTable from '@/app/components/table/DataTable';
// import { assessmentColumns } from '../active/active.columns';
import { DraftColumns } from './draft.columns';
import { useState } from 'react';
import ConfirmModal from '@/app/ui/modals/ConfirmModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assessmentApi } from '../assessment.service';
import { message } from 'antd';
import { AssessmentRow } from '../assessment.types';

export default function DraftAssessmentsTable({
  data,
  isLoading,
  globalFilter,
  onGlobalFilterChange,
  showColumnFilters,
}: {
  data: AssessmentRow[];
  isLoading: boolean;
  globalFilter: string;
  onGlobalFilterChange: (val: string) => void;
  showColumnFilters: boolean;
}) {
  const [deleteAssessmentId, setDeleteAssessmentId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  console.log(deleteAssessmentId, 'asesment id');
  const deleteAssessmentMutation = useMutation({
    mutationFn: (deleteAssessmentId: string) =>
      assessmentApi.deleteDraftAssessment(deleteAssessmentId),

    onSuccess: () => {
      message.success('Question deleted successfully');

      queryClient.invalidateQueries({
        queryKey: ['assessments', 'drafts'],
      });

      setDeleteModalOpen(false);
      setDeleteAssessmentId(null);
    },

    onError: () => {
      message.error('Failed to delete question');
    },
  });
  return (
    <>
      <DataTable<AssessmentRow>
        columns={DraftColumns(setDeleteAssessmentId, setDeleteModalOpen)}
        data={data}
        columnFilters={{}}
        onColumnFilterChange={() => {}}
        showColumnFilters={showColumnFilters}
        currentPage={1}
        pageCount={1}
        onPreviousPage={() => {}}
        onNextPage={() => {}}
        canPreviousPage={false}
        canNextPage={false}
      />
      <ConfirmModal
        open={deleteModalOpen}
        title="Delete Assessment "
        description="Are you sure you want to delete this Assessment?"
        warning="This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => {
          setDeleteModalOpen(false);
          setDeleteAssessmentId(null);
        }}
        onConfirm={() => {
          if (!deleteAssessmentId) return;
          deleteAssessmentMutation.mutate(deleteAssessmentId);
        }}
      />
    </>
  );
}
