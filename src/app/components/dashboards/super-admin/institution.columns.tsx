import { ColumnDef } from '@tanstack/react-table';
import { Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

export type Institution = {
  id: number;
  name: string;
  code: string;
  plan: string;
  students: string;
  status: string;
  contact_email?: string;
};

export const institutionColumns = (
  onEditInstitution: (row: Institution) => void
): ColumnDef<Institution>[] => [
  {
    accessorKey: 'name',
    header: 'Institution',
    cell: ({ row }) => (
      <div className="max-w-[260px]">
        <p className="font-medium  truncate">{row.original.name}</p>
        <p className="text-[11px] sm:text-xs text-gray-500 truncate">{row.original.code}</p>
      </div>
    ),
  },
  {
    accessorKey: 'plan',
    header: 'Plan',
    cell: ({ getValue }) => {
      const plan = (getValue() as string) || '';

      const planStyles: Record<string, string> = {
        'Premium Plan': 'bg-[#C89A2A] text-white',
        'Basic Plan': 'bg-[#E8F0FF] text-black',
        'Enterprise Plan': 'bg-[#1A2E66] text-white',
        'Professional Plan': 'bg-[#2563EB] text-white',
        'Free Trial': 'bg-[#EB2595] text-white',
      };

      const classes = planStyles[plan] ?? 'bg-gray-200 text-black';

      return (
        <span
          className={`${classes} inline-flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium`}
        >
          {plan}
        </span>
      );
    },
  },
  {
    accessorKey: 'contact_email',
    header: 'Email',
    cell: ({ row }) => {
      return row.original.contact_email;
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
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          <span>{status}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const router = useRouter();
      console.log(row, 'row');
      return (
        <button
          onClick={() => router.push(`/super-admin/institutions/${row.original.id}`)}
          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[rgba(185,205,237,0.6)] rounded-lg !text-blue-500 font-medium"
        >
          <Settings className="w-4 h-4" />
          Configure
        </button>
      );
    },
  },
];
