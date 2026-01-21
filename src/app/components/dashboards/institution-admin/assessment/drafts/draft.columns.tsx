import { ColumnDef } from '@tanstack/react-table';
import { EyeOutlined, BarChartOutlined, EditOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { Trash2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react';

export type AssessmentRow = {
  id: string;
  assessmentName: string;
  category: string;
  departmentBatch: string;
  questions: number;
  publishedOn: string;
  expiryOn: string;
  lastEdited: string;
  status: string;
};

export const DraftColumns = (
  setDeleteAssessmentId: React.Dispatch<React.SetStateAction<string | null>>,
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>
): ColumnDef<AssessmentRow>[] => [
  { accessorKey: 'assessmentName', header: 'Assessment name' },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-[#404345] text-xs font-medium ${
          row.original.category === 'Aptitude' ? 'bg-[#F4F6CE] ' : 'bg-[#CEE5F6]'
        }`}
      >
        {row.original.category}
      </span>
    ),
  },
  { accessorKey: 'departmentBatch', header: 'Department / Batch' },
  { accessorKey: 'questions', header: 'Questions' },
  { accessorKey: 'publishedOn', header: 'Published On' },
  { accessorKey: 'expiryOn', header: 'Expiry On' },
  { accessorKey: 'lastEdited', header: 'Last Edited' },
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
