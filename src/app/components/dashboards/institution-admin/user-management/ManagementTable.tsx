'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Trash2Icon } from 'lucide-react';

import DataTable from '@/app/components/table/DataTable';
import { Management, ManagementColumn } from './usermanagement.column';
import ConfirmModal from '@/app/ui/modals/ConfirmModal';

/* =========================================================
   DATE FORMATTER (UI ONLY)
========================================================= */

function formatLastLogin(date: string | null) {
  if (!date) return '—';

  const d = new Date(date);

  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/* =========================================================
   DEBOUNCE HOOK
========================================================= */

function useDebounce<T>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/* =========================================================
   TYPES
========================================================= */

type UsersApiResponse = {
  data: {
    id: string;
    name: string;
    email: string;
    role: string | null;
    status: string;
    lastLoginAt: string | null;
  }[];
  meta: {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    pageCount: number;
    totalCount: number;
    currentPageCount: number;
  };
};

type Props = {
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  showColumnFilters: boolean;
  onEdit: (row: Management) => void;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function ManagementTable({
  globalFilter,
  onGlobalFilterChange,
  showColumnFilters,
  onEdit,
}: Props) {
  /* ---------------- STATE ---------------- */

  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [limit] = useState(2);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [selectedUser, setSelectedUser] = useState<Management | null>(null);

  const debouncedSearch = useDebounce(globalFilter, 500);
  const debouncedColumnFilters = useDebounce(columnFilters, 500);

  /* ---------------- RESET PAGE ---------------- */

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, debouncedColumnFilters]);

  /* ---------------- FETCH USERS ---------------- */
  const FILTERABLE_COLUMNS = ['name', 'role', 'status'];
  const fetchUsers = async (): Promise<UsersApiResponse> => {
    const params = new URLSearchParams();

    params.set('page', String(page));
    params.set('limit', String(limit));

    if (debouncedSearch) {
      params.set('search', debouncedSearch);
    }

    Object.entries(debouncedColumnFilters).forEach(([key, value]) => {
      if (!value) return;

      if (!FILTERABLE_COLUMNS.includes(key)) return;

      params.set(key, value);
    });

    const res = await fetch(`/api/institutionsadmin/user-management/users?${params.toString()}`, {
      credentials: 'include',
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }

    return res.json();
  };

  const { data, isLoading } = useQuery<UsersApiResponse>({
    queryKey: ['users', page, debouncedSearch, debouncedColumnFilters],
    queryFn: fetchUsers,
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
  });

  /* ---------------- MAP DATA (DATE FIX HERE) ---------------- */

  const users: Management[] =
    data?.data.map((u) => ({
      id: Number(u.id),
      name: u.name || '-',
      role: u.role || '-',
      status: u.status === 'active' ? 'Active' : 'Suspended',
      lastLogin: formatLastLogin(u.lastLoginAt),
    })) ?? [];

  const meta = data?.meta;

  /* ---------------- COLUMN FILTER ---------------- */

  const onColumnFilterChange = (column: string, value: string) => {
    if (!FILTERABLE_COLUMNS.includes(column)) return;

    setColumnFilters((prev) => ({
      ...prev,
      [column]: value,
    }));
  };

  /* =========================================================
     CHANGE USER STATUS
  ========================================================= */

  const changeStatusMutation = useMutation({
    mutationFn: async ({ userId, status }: { userId: number; status: 'active' | 'suspended' }) => {
      const res = await fetch(`/api/users/status/${userId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error('Failed to update user status');
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  /* ---------------- DELETE FLOW ---------------- */

  const onSuspendUser = (row: Management) => {
    setSelectedUser(row);
  };

  const onConfirmSuspend = () => {
    if (!selectedUser) return;

    changeStatusMutation.mutate({
      userId: selectedUser.id,
      status: 'suspended',
    });

    setSelectedUser(null);
  };

  /* ---------------- RENDER ---------------- */

  return (
    <>
      <DataTable<Management>
        data={users}
        columns={ManagementColumn(
          (row) => onEdit(row),
          (row) => onSuspendUser(row)
        )}
        columnFilters={columnFilters}
        isLoading={isLoading}
        onColumnFilterChange={onColumnFilterChange}
        showColumnFilters={showColumnFilters}
        currentPage={meta?.currentPage ?? 1}
        pageCount={meta?.pageCount ?? 1}
        canPreviousPage={!meta?.isFirstPage}
        canNextPage={!meta?.isLastPage}
        onPreviousPage={() => setPage((p) => Math.max(p - 1, 1))}
        onNextPage={() => {
          if (meta?.nextPage) setPage(meta.nextPage);
        }}
      />

      {/* CONFIRM MODAL */}
      <ConfirmModal
        open={!!selectedUser}
        title="Suspend User"
        icon={<Trash2Icon color="#0F172A" />}
        description={
          <>
            Are you sure you want to suspend{' '}
            <span className="font-semibold">{selectedUser?.name}</span>?
          </>
        }
        warning="Suspended users will lose access immediately."
        confirmText={changeStatusMutation.isPending ? 'Suspending...' : 'Yes, Suspend'}
        cancelText="No, Cancel"
        onConfirm={onConfirmSuspend}
        onCancel={() => setSelectedUser(null)}
      />
    </>
  );
}
