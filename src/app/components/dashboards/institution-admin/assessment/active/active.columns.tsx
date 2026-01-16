import { ColumnDef } from '@tanstack/react-table';
import { EyeOutlined, BarChartOutlined, EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

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

export const assessmentColumns: ColumnDef<AssessmentRow>[] = [
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
      const router = useRouter();

      return (
        <div className="flex gap-4 text-gray-600">
          <EyeOutlined
            className="cursor-pointer hover:text-purple-600"
            onClick={() => router.push(`/admin/assessment/${row.original.id}/performance`)}
          />
          <BarChartOutlined className="cursor-pointer hover:text-purple-600" />
          <EditOutlined className="cursor-pointer hover:text-purple-600" />
        </div>
      );
    },
  },
];
