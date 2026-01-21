'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DataTable from '@/app/components/table/DataTable';
import { Management, ManagementColumn } from './usermanagement.column';

type Props = {
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  showColumnFilters: boolean;
  onEdit: (row: Management) => void;
};

async function fetchUsers(): Promise<Management[]> {
  const res = await fetch(`/api/institutionsadmin/user-management/users`, {
    method: 'GET',
    credentials: 'include',
  });

  const result = await res.json();

  return (result?.data || []).map((u: any) => ({
    id: Number(u.id),
    name: u.name || '-',
    role: u.role || '-',
    Department: u.department || '-',
    status: u.status === 'active' ? 'Active' : 'Suspended',
    lastLogin: u.lastLoginAt || '—',
  }));
}

export default function ManagementTable({
  globalFilter,
  onGlobalFilterChange,
  showColumnFilters,
  onEdit,
}: Props) {
  const queryClient = useQueryClient();

  /* ---------------- FETCH USERS ---------------- */

  const { data = [] } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    refetchOnWindowFocus: false,
  });

  /* ---------------- SOFT DELETE (SUSPEND) ---------------- */

  const suspendUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/status/${userId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'suspended' }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to suspend user');
      }

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },

    onError: (err: any) => {
      alert(err.message || 'Failed to suspend user');
    },
  });

  /* ---------------- FILTER ---------------- */

  const columnFilters: Record<string, string> = globalFilter
    ? {
        name: globalFilter,
        role: globalFilter,
        Department: globalFilter,
        status: globalFilter,
      }
    : {};

  const onColumnFilterChange = (_: string, value: string) => {
    onGlobalFilterChange(value);
  };

  return (
    <DataTable<Management>
      data={data}
      columns={ManagementColumn(
        (row) => onEdit(row),
        (row) => {
          if (row.status === 'Suspended') return;

          if (confirm(`Are you sure you want to suspend ${row.name}?`)) {
            suspendUserMutation.mutate(row.id);
          }
        }
      )}
      columnFilters={columnFilters}
      onColumnFilterChange={onColumnFilterChange}
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
