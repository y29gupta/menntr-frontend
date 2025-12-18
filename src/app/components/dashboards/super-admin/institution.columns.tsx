import { ColumnDef } from '@tanstack/react-table';
import { Settings } from 'lucide-react';

export type Institution = {
  id: number;
  name: string;
  code: string;
  plan: string;
  students: string;
  status: string;
};

export const institutionColumns: ColumnDef<Institution>[] = [
  {
    accessorKey: 'name',
    header: 'Institution',
    cell: ({ row }) => (
      <div className="max-w-[260px]">
        <p className="font-medium text-gray-900 truncate">{row.original.name}</p>
        <p className="text-[11px] sm:text-xs text-gray-500 truncate">{row.original.code}</p>
      </div>
    ),
  },
  {
    accessorKey: 'plan',
    header: 'Plan',
    cell: ({ getValue }) => {
      const plan = getValue() as string;

      const bg = plan === 'Premium' ? 'bg-[#C89A2A]' : 'bg-[#E8F0FF]';
      const text = plan === 'Premium' ? 'text-white' : 'text-black';

      return (
        <span className={`${bg} ${text} px-3 py-1 rounded text-[11px] sm:text-xs font-medium`}>
          {plan}
        </span>
      );
    },
  },
  {
    accessorKey: 'students',
    header: 'Students',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as string;

      return (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span>{status}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => (
      <button className="flex items-center gap-2 text-[#3B82F6] font-medium">
        <Settings className="w-4 h-4 text-[#3B82F6]" /> Configure
      </button>
    ),
  },
];
