import { ColumnDef } from '@tanstack/react-table';
import { EyeOutlined, BarChartOutlined, EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { AssessmentRow } from '../assessment.types';
import { formatDate } from '@/app/utils/formatDate';

export const assessmentColumns: ColumnDef<AssessmentRow>[] = [
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
  // {
  //   accessorKey: 'batches',
  //   header: 'Department / Batch',
  //   cell: ({}) => {
  //     return <></>;
  //   },
  // },
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
  {
    accessorKey: 'created_at',
    header: 'Expiry On',
    accessorFn: (row) => row.updated_at,
    cell: ({ getValue }) => formatDate(getValue<string>()),
  },
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
