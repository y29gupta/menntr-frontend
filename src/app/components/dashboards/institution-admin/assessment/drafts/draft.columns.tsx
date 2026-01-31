import { ColumnDef } from '@tanstack/react-table';
import { EyeOutlined, BarChartOutlined, EditOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { Trash2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react';
import { AssessmentRow } from '../assessment.types';
import { formatDate } from '@/app/utils/formatDate';

export const DraftColumns = (
  setDeleteAssessmentId: React.Dispatch<React.SetStateAction<string | null>>,
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>
): ColumnDef<AssessmentRow>[] => [
  { accessorKey: 'title', header: 'Assessment name' },
  {
    accessorKey: 'metadata.category',
    header: 'Category',
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-[#404345] text-xs font-medium ${
          row.original.metadata?.category === 'Aptitude' ? 'bg-[#F4F6CE] ' : 'bg-[#CEE5F6]'
        }`}
      >
        {row.original.metadata?.category}
      </span>
    ),
  },
  // { accessorKey: 'departmentBatch', header: 'Department / Batch' },
  {
    accessorKey: 'batches',
    header: 'Department / Batch',
    cell: ({ row }) => {
      const batches = row.original.batches;

      if (!batches || batches.length === 0) {
        return <span>-</span>;
      }

      return (
        <div className="flex flex-col gap-1">
          {batches.map((b) => (
            <span key={b.batch_id}>{b.batch.name}</span>
          ))}
        </div>
      );
    },
  },
  // { accessorKey: 'questions', header: 'Questions' },
  {
    accessorKey: 'questions',
    header: 'Questions',
    cell: ({ row }) => {
      console.log(row.original.questions?.length, 'ques');
      return (
        <>
          <span>{row.original.questions?.length}</span>
        </>
      );
    },
  },
  // { accessorKey: 'publishedOn', header: 'Published On' },
  {
    accessorKey: 'published_at',
    header: 'Published On',
    accessorFn: (row) => row.published_at,
    cell: ({ getValue }) => formatDate(getValue<string>()),
    // cell: ({ row }) => {
    //   console.log(typeof row.original.created_at, 'ques');
    //   return (
    //     <>
    //       <span>{row.original.questions?.length}</span>
    //     </>
    //   );
    // },
  },
  // { accessorKey: 'expiryOn', header: 'Expiry On' },
  {
    accessorKey: 'updated_at',
    header: 'Expiry On',
    accessorFn: (row) => row.updated_at,
    cell: ({ getValue }) => formatDate(getValue<string>()),
  },
  // { accessorKey: 'lastEdited', header: 'Last Edited' },

  {
    accessorKey: 'updated_at',
    header: 'Last Edited',
    accessorFn: (row) => row.updated_at,
    cell: ({ getValue }) => formatDate(getValue<string>()),
  },
  // { accessorKey: 'status', header: 'Status' },

  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      console.log(row.original.id, 'row is');
      return (
        <div className="flex gap-4 text-gray-600">
          {/* <EyeOutlined className="cursor-pointer hover:text-purple-600" /> */}
          <button className="cursor-pointer rounded-4xl bg-[#F5F0FF] !text-[#904BFF] py-1 px-4">
            Publish
          </button>

          <Tooltip title="Edit" placement="bottom" color="purple">
            <EditOutlined
              onClick={() => redirect(`/admin/assessment/edit/${row.original.id}`)}
              className="cursor-pointer hover:!text-purple-600 hover:bg-[#F5F0FF] px-3 rounded-xl"
            />
          </Tooltip>
          <Tooltip title="Delete" placement="bottom" color="black" className="text-blue-200">
            {/* <BarChartOutlined className="cursor-pointer hover:!text-purple-600 hover:bg-[#F5F0FF] px-3 rounded-xl" /> */}
            <span className="cursor-pointer  hover:!text-purple-600 hover:bg-[#F5F0FF] px-3 rounded-xl">
              <Trash2
                onClick={() => {
                  setDeleteAssessmentId(row.original.id);
                  setDeleteModalOpen(true);
                }}
              />
            </span>
          </Tooltip>
        </div>
      );
    },
  },
];
