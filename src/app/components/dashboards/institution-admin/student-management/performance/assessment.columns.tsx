import { ColumnDef } from '@tanstack/react-table';
import { AssessmentPerformanceRow, AssessmentStatus, AssessmentCategory } from './assessment.types';
import Image from 'next/image';

export const assessmentPerformanceColumns: ColumnDef<AssessmentPerformanceRow>[] = [
  {
    header: 'Assessment name',
    accessorKey: 'assessmentName',
  },
  {
    header: 'Category',
    accessorKey: 'category',
    cell: ({ getValue }) => {
      const value = getValue<AssessmentCategory>();

      const style = value === 'Aptitude' ? 'bg-[#F4F6CE] ' : 'bg-[#CEE5F6]';

      return (
        <span className={`p-2 rounded-lg text-sm text-[#404345] font-light ${style}`}>{value}</span>
      );
    },
  },
  {
    header: 'Attempt',
    accessorKey: 'attempt',
  },
  {
    header: 'Duration',
    accessorKey: 'duration',
  },
  {
    header: 'Score',
    accessorKey: 'score',
  },
  {
    header: 'Score %',
    accessorKey: 'scorePercent',
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ getValue }) => {
      const status = getValue<AssessmentStatus>();

      const map: Record<AssessmentStatus, string> = {
        Completed: 'bg-[#F4FFF0] text-[#008E00]',
        'In-Progress': 'bg-[#FFFAE6] text-[#8E6100]',
        'Not started yet': 'bg-[#F5F5F5] text-[#636771]',
      };

      return (
        <span className={`px-2 py-2 rounded-lg text-xs font-medium ${map[status]}`}>
          ● {status}
        </span>
      );
    },
  },
  {
    header: 'Actions',
    cell: () => (
      //   <span className="text-violet-600 text-sm font-medium cursor-pointer hover:underline">
      //     View Report
      //   </span>
      <button className="cursor-pointer gap-2 flex !text-[#7A39E9] text-sm font-medium ">
        <Image width={16} height={16} src="/assets/reportIcon.png" alt="reportIcon" />
        <span className="text-inherit">View Report</span>
      </button>
    ),
  },
];
