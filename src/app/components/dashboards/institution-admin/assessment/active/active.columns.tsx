import { ColumnDef } from '@tanstack/react-table';
import { EyeOutlined, BarChartOutlined, EditOutlined } from '@ant-design/icons';

export type AssessmentRow = {
  name: string;
  category: 'Aptitude' | 'Domain';
  department: string;
  questions: number;
  publishedOn: string;
  expiryOn: string;
  lastEdited: string;
};

export const assessmentColumns: ColumnDef<AssessmentRow>[] = [
  { accessorKey: 'name', header: 'Assessment name' },
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
  { accessorKey: 'department', header: 'Department / Batch' },
  { accessorKey: 'questions', header: 'Questions' },
  { accessorKey: 'publishedOn', header: 'Published On' },
  { accessorKey: 'expiryOn', header: 'Expiry On' },
  { accessorKey: 'lastEdited', header: 'Last Edited' },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => (
      <div className="flex gap-4 text-gray-600">
        <EyeOutlined className="cursor-pointer hover:text-purple-600" />
        <BarChartOutlined className="cursor-pointer hover:text-purple-600" />
        <EditOutlined className="cursor-pointer hover:text-purple-600" />
      </div>
    ),
  },
];
