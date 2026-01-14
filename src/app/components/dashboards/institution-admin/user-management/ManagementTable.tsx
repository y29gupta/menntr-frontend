'use client';

import { useQuery } from '@tanstack/react-query';
import DataTable from '@/app/components/table/DataTable';
import { Management, ManagementColumn } from './usermanagement.column';

type Props = {
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  showColumnFilters: boolean;
  onEdit: (row: Management) => void;
};

async function fetchUsers(): Promise<Management[]> {
  const token = localStorage.getItem('auth_token');

  const res = await fetch(
    `/api/institutionsadmin/user-management/users`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        // Authorization: `Bearer ${token ?? ''}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const result = await res.json();

  return (result?.data || []).map((u: any) => ({
    id: Number(u.id),
    name: u.name || '-',
    role: u.role || '-',
    Department: u.department || '-',
    status: u.status === 'active' ? 'Active' : 'Inactive',
    lastLogin: u.lastLoginAt ? u.lastLoginAt : '—',
  }));
}

export default function ManagementTable({
  globalFilter,
  onGlobalFilterChange,
  showColumnFilters,
  onEdit,
}: Props) {
  const { data = [] } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    refetchOnWindowFocus: false,
  });

  const columnFilters: Record<string, string> = globalFilter
    ? {
        name: globalFilter,
        role: globalFilter,
        Department: globalFilter,
        status: globalFilter,
      }
    : {};

  const onColumnFilterChange = (_columnName: string, value: string) => {
    onGlobalFilterChange(value);
  };

  return (
    <DataTable<Management>
      data={data}
      columns={ManagementColumn(
        (row) => onEdit(row),
        (row) => console.log('Delete', row)
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
