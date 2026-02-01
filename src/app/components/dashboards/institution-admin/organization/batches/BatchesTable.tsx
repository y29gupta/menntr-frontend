'use client';
import DataTable from '@/app/components/table/DataTable';
// import { Batch, BatchApiResponse, batchesColumns, mapApiBatchToBatch } from './batches.column';
import { useQuery } from '@tanstack/react-query';
// import { getBatches } from '@/app/lib/institutions.api';
import { Batch, BatchApiResponse, batchesColumns, mapApiBatchToBatch } from './batches.columns';
import { getBatches } from './batches.service';
import { useEffect, useState } from 'react';
import { BatchListResponse } from './batches.types';

type Props = {
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  showColumnFilters: boolean;
  onEdit: (row: Batch) => void;
  onDelete: (row: Batch) => void;
  onTotalChange: (total: number) => void;
};

export default function BatchesTable({
  globalFilter,
  onGlobalFilterChange,
  showColumnFilters,
  onEdit,
  onDelete,
  onTotalChange,
}: Props) {
  // const { data: batchResponse, isLoading } = useQuery<BatchApiResponse>({
  //   queryKey: ['batches'],
  //   queryFn: getBatches,
  // });

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery<BatchListResponse>({
    queryKey: ['batches', page, globalFilter],
    queryFn: () =>
      getBatches(page, limit, {
        search: globalFilter,
      }),
    placeholderData: (previousData) => previousData,
  });

  // useEffect(() => {
  //   onTotalChange(batchResponse?.length ?? 0);
  // }, [batchResponse, onTotalChange]);

  // const tableData: Batch[] = batchResponse ? batchResponse.map(mapApiBatchToBatch) : [];

  const tableData: Batch[] = data?.data?.map(mapApiBatchToBatch) ?? [];

  useEffect(() => {
    if (data?.meta?.totalCount !== undefined) {
      onTotalChange(data.meta.totalCount);
    }
  }, [data?.meta?.totalCount, onTotalChange]);

  if (isLoading) return null;

  return (
    <DataTable<Batch>
      data={tableData}
      columns={batchesColumns(
        (row) => onEdit(row),
        (row) => onDelete(row)
      )}
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
  );
}
