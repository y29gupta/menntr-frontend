import { ColumnDef } from '@tanstack/react-table';

import { Pencil, Trash } from 'lucide-react';
import { StudentApi } from './student.types';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';

export const studentColumns: ColumnDef<StudentApi>[] = [
  {
    header: 'Student name',
    accessorKey: 'studentName',
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-900">{row.original.studentName}</span>
        <span className="text-xs text-gray-500">{row.original.email}</span>
      </div>
    ),
  },
  {
    header: 'Role number',
    accessorKey: 'rollNumber',
  },
  {
    header: 'Category',
    accessorKey: 'category',
    cell: ({ row }) => (
      <span className="inline-flex px-2 py-[2px] rounded-full text-xs font-medium bg-[#EEF2FF] text-[#4F46E5]">
        {row.original.category || '-'}
      </span>
    ),
  },
  {
    header: 'Department',
    accessorKey: 'department',
  },
  {
    header: 'Batch',
    accessorKey: 'batch',
  },
  {
    header: 'Assessment taken',
    accessorKey: 'assessmentsTaken',
  },
  {
    header: 'Average score',
    cell: ({ row }) => {
      //   const score = row.original.averageScore;
      const score = 28;

      //   if (score === null) {
      //     return <span className="text-xs text-gray-400">-</span>;
      //   }

      let styles = 'bg-[#FFE6E6] text-[#8E0000]';
      if (score >= 75) styles = 'bg-[#F2FDEE] text-[#008E2D]';
      else if (score >= 50) styles = '!bg-[#FFFAE6] !text-[#8E6100]';

      return (
        <span className={`inline-flex px-2 py-[2px] rounded-md text-xs font-semibold ${styles}`}>
          {score}%{/* 56% */}
        </span>
      );
    },
  },
  {
    header: 'Status',
    cell: ({ row }) => (
      <span className="inline-flex items-center gap-1 px-2 py-[2px] rounded-md bg-[#ECFDF3] text-[#027A48] text-xs font-medium">
        <span className="h-1.5 w-1.5 rounded-full bg-[#12B76A]" />
        {row.original.status === 'active' ? 'Active' : 'Inactive'}
      </span>
    ),
  },
  {
    header: 'Last login',
    accessorKey: 'lastLogin',
  },
  {
    header: 'Actions',
    cell: () => (
      <div className="flex items-center gap-3">
        <Image
          width={16}
          height={16}
          src="/assets/performanceIcon.svg"
          alt="performanceIcon"
          onClick={(e) => e.stopPropagation()}
        />
        <Image width={18} height={18} src="/assets/deleteIcon.svg" alt="deleteIcon" />
        {/* <Pencil size={16} className="cursor-pointer text-gray-500 hover:text-gray-700" /> */}
        {/* <Trash size={16} className="cursor-pointer text-gray-500 hover:text-gray-700" /> */}
      </div>
    ),
  },
];
