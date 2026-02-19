'use client';

import { useEffect, useState } from 'react';
import { Search, Filter, Trash2Icon } from 'lucide-react';
import BatchesTable from './BatchesTable';
import BatchForm from './BatchForm';
import { Batch } from './batches.columns';
import ConfirmModal from '@/app/ui/modals/ConfirmModal';

type Props = {
  setBatchView: (view: 'list' | 'form') => void;
};

const Batches = ({ setBatchView }: Props) => {
  const [search, setSearch] = useState('');
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const [view, setView] = useState<'list' | 'form'>('list');
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const [deleteBatch, setDeleteBatch] = useState<Batch | null>(null);
  const [totalBatches, setTotalBatches] = useState(0);

  useEffect(() => {
    setBatchView(view === 'list' ? 'list' : 'form');
    return () => setBatchView('list');
  }, [view, setBatchView]);

  return (
    <>
      {view === 'list' && (
        <>
          {/* HEADER */}
          <div className="flex items-center justify-between mb-4 px-4">
            <h2 className="font-semibold text-gray-800 text-sm sm:text-base lg:text-lg">
              Batches <span>({totalBatches})</span>
            </h2>

            {/* ADD BATCH */}
            <button
              onClick={() => {
                setSelectedBatch(null);
                setView('form');
              }}
              className="px-6 py-2.5 rounded-full text-sm font-medium !text-white
              bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]"
            >
              + Add Batch
            </button>
          </div>

          {/* SEARCH + FILTER */}
          <div className="flex gap-3 px-4 mb-4">
            <div className="relative max-w-[400px] w-full">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for batch"
                className="w-full pl-9 pr-4 py-2 border border-gray-300
                rounded-lg text-xs sm:text-sm"
              />
            </div>

            <button
              onClick={() => setShowColumnFilters((p) => !p)}
              className="flex items-center gap-2 px-4 py-2 border
              border-gray-300 rounded-lg text-xs sm:text-sm"
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          {/* TABLE */}
          <div className="px-4">
            <BatchesTable
              globalFilter={search}
              onGlobalFilterChange={setSearch}
              showColumnFilters={showColumnFilters}
              onTotalChange={setTotalBatches}
              onEdit={(batch) => {
                setSelectedBatch(batch);
                setView('form');
              }}
              onDelete={(batch) => setDeleteBatch(batch)}
            />
          </div>
        </>
      )}

      {view === 'form' && (
        <BatchForm
          mode={selectedBatch ? 'edit' : 'create'}
          batchId={selectedBatch?.id}
          editRow={selectedBatch}
          onBack={() => {
            setView('list');
            setSelectedBatch(null);
          }}
        />
      )}

      {/* DELETE MODAL */}
      <ConfirmModal
        open={!!deleteBatch}
        title="Delete Batch"
        icon={<Trash2Icon color="#0F172A" />}
        description={
          <>
            Are you sure you want to delete{' '}
            <span className="font-semibold">{deleteBatch?.name}</span> from batch list?
          </>
        }
        warning="Deleted batch can’t be reverted back."
        confirmText="Yes, Delete"
        cancelText="No, Cancel"
        onConfirm={() => {
          setDeleteBatch(null);
        }}
        onCancel={() => setDeleteBatch(null)}
      />
    </>
  );
};

export default Batches;
