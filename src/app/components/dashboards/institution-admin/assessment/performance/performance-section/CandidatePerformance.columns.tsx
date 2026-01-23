import { ColumnDef } from '@tanstack/react-table';
import { FileText } from 'lucide-react';

/* ========= TYPES ========= */

export type CandidatePerformance = {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
  duration: string;
  score: string;
  percentage: number;
  status: 'Completed' | 'In Progress' | 'Not Started';
  assessmentName: string;
};

/* ========= COLUMNS ========= */

export const candidatePerformanceColumns = (
  onRowClick: (row: CandidatePerformance) => void,
  onViewReport: (row: CandidatePerformance) => void
): ColumnDef<CandidatePerformance>[] => [
  {
    accessorKey: 'name',
    header: 'Student Name',
    cell: ({ row }) => (
      <div className="relative z-10 flex items-center gap-3">
        <img
          src={row.original.avatarUrl || '/avatar-placeholder.png'}
          className="w-9 h-9 rounded-full object-cover"
        />
        <span className="font-medium text-gray-900">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ getValue }) => (
      <span className="relative z-10 text-gray-600 truncate block max-w-[200px]">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
  },
  {
    accessorKey: 'score',
    header: 'Overall Score',
  },
  {
    accessorKey: 'percentage',
    header: 'Overall %',
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return <span className="relative z-10 font-medium">{value}%</span>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as CandidatePerformance['status'];

      const map = {
        Completed: 'bg-green-100 text-green-700',
        'In Progress': 'bg-yellow-100 text-yellow-700',
        'Not Started': 'bg-gray-200 text-gray-600',
      };

      return (
        <span className={`relative z-10 px-3 py-1 rounded-full text-xs font-medium ${map[status]}`}>
          {status}
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <button
        onClick={(e) => {
          e.stopPropagation(); // 🚫 block row click
          onViewReport(row.original); // ✅ only ViewReport
        }}
        className="relative z-20 flex items-center gap-2 text-purple-600! text-sm font-medium cursor-pointer"
      >
        <FileText className="w-4 h-4" />
        View Report
      </button>
    ),
  },
];
