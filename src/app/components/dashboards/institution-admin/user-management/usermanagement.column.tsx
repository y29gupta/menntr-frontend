import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type Management = {
  id: number;
  name: string;
  role: string;
  // Department: string;
  status: 'Active' | 'Suspended';
  lastLogin: string;
  avatar?: string;
};

export const ManagementColumn = (
  onEditManagement: (row: Management) => void,
  onSuspendManagement: (row: Management) => void
): ColumnDef<Management>[] => [
  {
    accessorKey: 'name',
    header: 'User name',
    cell: ({ row }) => (
      <div className="flex items-center gap-3 max-w-[260px]">
        {row.original.avatar ? (
          <img
            src={row.original.avatar}
            alt={row.original.name}
            className="h-8 w-8 rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 shrink-0">
            {row.original.name.charAt(0)}
          </div>
        )}

        <p className="font-medium text-gray-900 truncate">{row.original.name}</p>
      </div>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ getValue }) => (
      <span className="rounded-md border border-indigo-200 bg-indigo-50 px-2 py-1 text-xs text-indigo-700">
        {getValue() as string}
      </span>
    ),
  },
  // {
  //   accessorKey: 'Department',
  //   header: 'Department',
  //   cell: ({ getValue }) => <span className="text-gray-700">{getValue() as string}</span>,
  // },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as 'Active' | 'Suspended';
      const isActive = status === 'Active';

      return (
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium
            ${isActive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}
          `}
        >
          <span
            className={`h-2 w-2 rounded-full
              ${isActive ? 'bg-green-500' : 'bg-red-500'}
            `}
          />
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: 'lastLogin',
    header: 'Last login',
    cell: ({ getValue }) => <span className="text-gray-600">{getValue() as string}</span>,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const isSuspended = row.original.status === 'Suspended';

      return (
        <div className="flex items-center gap-3">
          <button
            onClick={() => onEditManagement(row.original)}
            className="p-2 rounded-md text-gray-400 hover:text-indigo-500 hover:bg-indigo-50"
          >
            <Pencil className="w-4 h-4" />
          </button>

          <button
            disabled={isSuspended}
            onClick={() => onSuspendManagement(row.original)}
            className={`p-2 rounded-md
              ${
                isSuspended
                  ? 'cursor-not-allowed text-gray-300'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }
            `}
            title={isSuspended ? 'User already suspended' : 'Suspend user'}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      );
    },
  },
];
