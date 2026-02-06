'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import DataTable from '@/app/components/table/DataTable';
import { Management, ManagementColumn } from './usermanagement.column';

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
    department: string | null;
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

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});

  const debouncedSearch = useDebounce(globalFilter, 500);
  const debouncedColumnFilters = useDebounce(columnFilters, 500);

  /* ---------------- RESET PAGE ON FILTER CHANGE ---------------- */

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, debouncedColumnFilters]);

  /* ---------------- API CALL ---------------- */

  const fetchUsers = async (): Promise<UsersApiResponse> => {
    const params = new URLSearchParams();

    params.set('page', String(page));
    params.set('limit', String(limit));

    if (debouncedSearch) {
      params.set('search', debouncedSearch);
    }

    Object.entries(debouncedColumnFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    const res = await fetch(`/api/institutionsadmin/user-management/users?${params.toString()}`, {
      credentials: 'include',
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }

    return res.json();
  };

  /* ---------------- QUERY (FIXED FOR v5) ---------------- */

  const { data, isLoading } = useQuery<UsersApiResponse>({
    queryKey: ['users', page, debouncedSearch, debouncedColumnFilters],
    queryFn: fetchUsers,
    placeholderData: (prev) => prev, // ✅ v5 replacement
    refetchOnWindowFocus: false,
  });

  /* ---------------- MAP DATA ---------------- */

  const users: Management[] =
    data?.data.map((u) => ({
      id: Number(u.id),
      name: u.name || '-',
      role: u.role || '-',
      Department: u.department || '-',
      status: u.status === 'active' ? 'Active' : 'Suspended',
      lastLogin: u.lastLoginAt || '—',
    })) ?? [];

  const meta = data?.meta;

  /* ---------------- COLUMN FILTER HANDLER ---------------- */

  const onColumnFilterChange = (column: string, value: string) => {
    setColumnFilters((prev) => ({
      ...prev,
      [column]: value,
    }));
  };

  /* ---------------- LOADING ---------------- */

  if (isLoading) {
    return <div className="text-sm text-gray-500">Loading users…</div>;
  }

  /* ---------------- TABLE ---------------- */

  return (
    <DataTable<Management>
      data={users}
      columns={ManagementColumn(
        (row) => onEdit(row),
        () => {}
      )}
      columnFilters={columnFilters}
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
  );
}
