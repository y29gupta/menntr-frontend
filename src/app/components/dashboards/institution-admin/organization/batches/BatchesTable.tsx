'use client';
import DataTable from '@/app/components/table/DataTable';
// import { Batch, BatchApiResponse, batchesColumns, mapApiBatchToBatch } from './batches.column';
import { useQuery } from '@tanstack/react-query';
// import { getBatches } from '@/app/lib/institutions.api';
import { Batch, BatchApiResponse, batchesColumns, mapApiBatchToBatch } from './batches.columns';
import { getBatches } from './batches.service';
import { useEffect } from 'react';

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
  const { data: batchResponse, isLoading } = useQuery<BatchApiResponse>({
    queryKey: ['batches'],
    queryFn: getBatches,
  });

  //   useEffect(() => {
  //     if (batchResponse?.total !== undefined) {
  //       onTotalChange(batchResponse.total ? batchResponse.total : dummyBatches.length);
  //     }
  //   }, [batchResponse?.total, onTotalChange]);
  useEffect(() => {
    onTotalChange(Array.isArray(batchResponse) ? batchResponse.length : 0);
  }, [batchResponse, onTotalChange]);
  
  const tableData: Batch[] = Array.isArray(batchResponse) 
    ? batchResponse.map(mapApiBatchToBatch) 
    : [];

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
