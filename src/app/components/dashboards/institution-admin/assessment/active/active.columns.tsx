// import { ColumnDef } from '@tanstack/react-table';
// import { EyeOutlined, BarChartOutlined, EditOutlined } from '@ant-design/icons';
// import { useRouter } from 'next/navigation';
// import { AssessmentRow } from '../assessment.types';
// import { formatDate } from '@/app/utils/formatDate';

import { formatDate } from '@/app/utils/formatDate';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { ColumnDef } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

// export const assessmentColumns: ColumnDef<AssessmentRow>[] = [
//   { accessorKey: 'title', header: 'Assessment name' },
//   {
//     accessorKey: 'metadata.category',
//     header: 'Category',
//     cell: ({ row }) => (
//       <span
//         className={`px-2 py-1 rounded-full text-[#404345] text-xs font-medium ${
//           row.original.metadata?.category === 'Aptitude' ? 'bg-[#F4F6CE] ' : 'bg-[#CEE5F6]'
//         }`}
//       >
//         {row.original.metadata?.category}
//       </span>
//     ),
//   },
//   // {
//   //   accessorKey: 'batches',
//   //   header: 'Department / Batch',
//   //   cell: ({}) => {
//   //     return <></>;
//   //   },
//   // },
//   {
//     accessorKey: 'batches',
//     header: 'Department / Batch',
//     cell: ({ row }) => {
//       const batches = row.original.batches;

//       if (!batches || batches.length === 0) {
//         return <span>-</span>;
//       }

//       return (
//         <div className="flex flex-col gap-1">
//           {batches.map((b) => (
//             <span key={b.batch_id}>{b.batch.name}</span>
//           ))}
//         </div>
//       );
//     },
//   },

//   {
//     accessorKey: 'questions',
//     header: 'Questions',
//     cell: ({ row }) => {
//       console.log(row.original.questions?.length, 'ques');
//       return (
//         <>
//           <span>{row.original.questions?.length}</span>
//         </>
//       );
//     },
//   },
//   {
//     accessorKey: 'published_at',
//     header: 'Published On',
//     accessorFn: (row) => row.published_at,
//     cell: ({ getValue }) => formatDate(getValue<string>()),
//     // cell: ({ row }) => {
//     //   console.log(typeof row.original.created_at, 'ques');
//     //   return (
//     //     <>
//     //       <span>{row.original.questions?.length}</span>
//     //     </>
//     //   );
//     // },
//   },
//   {
//     accessorKey: 'end_time',
//     header: 'Expiry On',
//     accessorFn: (row) => row.updated_at,
//     cell: ({ getValue }) => formatDate(getValue<string>()),
//   },
//   {
//     accessorKey: 'updated_at',
//     header: 'Last Edited',
//     accessorFn: (row) => row.updated_at,
//     cell: ({ getValue }) => formatDate(getValue<string>()),
//   },
//   // { accessorKey: 'status', header: 'Status' },
//   {
//     id: 'actions',
//     header: 'Actions',
//     cell: ({ row }) => {
//       const router = useRouter();

//       return (
//         <div className="flex gap-4 text-gray-600">
//           <EyeOutlined
//             className="cursor-pointer hover:text-purple-600"
//             onClick={() => router.push(`/admin/assessment/${row.original.id}/performance`)}
//           />
//           <BarChartOutlined className="cursor-pointer hover:text-purple-600" />
//           <EditOutlined className="cursor-pointer hover:text-purple-600" />
//         </div>
//       );
//     },
//   },
// ];

type ColumnOptions = {
  entityBasePath: string;
  entityLabel: string;
  mode?: 'active' | 'draft';

  // Feature toggles
  showExpiryOn?: boolean;
  showDueDate?: boolean;
  showAssignmentType?: boolean;

  onDelete?: (id: string) => void;
  onPublish?: (id: string) => void;
};

export const createEvaluationColumns = ({
  entityBasePath,
  entityLabel,
  mode = 'active',
  showExpiryOn = false,
  showDueDate = false,
  showAssignmentType = false,
  onDelete,
  onPublish,
}: ColumnOptions): ColumnDef<any>[] => {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'title',
      header: `${entityLabel} name`,
    },
    {
      accessorKey: 'metadata.category',
      header: 'Category',
      cell: ({ row }) => (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#F4F6CE]">
          {row.original.metadata?.category}
        </span>
      ),
    },
  ];

  // Assignment Type (Only for Assignment)
  if (showAssignmentType) {
    columns.push({
      accessorKey: 'metadata.assignmentType',
      header: 'Assignment Type',
      cell: ({ row }) => (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#F3E8FF]">
          {row.original.metadata?.assignmentType}
        </span>
      ),
    });
  }

  // Department / Batch
  columns.push({
    accessorKey: 'batches',
    header: 'Department / Batch',
    cell: ({ row }) => {
      const batches = row.original.batches;
      if (!batches?.length) return <span>-</span>;

      return (
        <div className="flex flex-col gap-1">
          {batches.map((b: any) => (
            <span key={b.batch_id}>{b.batch.name}</span>
          ))}
        </div>
      );
    },
  });

  // Questions
  columns.push({
    accessorKey: 'questions',
    header: 'Questions',
    cell: ({ row }) => <span>{row.original.questions?.length}</span>,
  });

  // Published On
  columns.push({
    accessorKey: 'published_at',
    header: 'Published On',
    cell: ({ getValue }) => formatDate(getValue<string>()),
  });

  // Assessment Expiry
  if (showExpiryOn) {
    columns.push({
      accessorKey: 'end_time',
      header: 'Expiry On',
      cell: ({ getValue }) => formatDate(getValue<string>()),
    });
  }

  // Assignment Due Date
  if (showDueDate) {
    columns.push({
      accessorKey: 'due_date',
      header: 'Due Date',
      cell: ({ getValue }) => formatDate(getValue<string>()),
    });
  }

  // Last Edited
  columns.push({
    accessorKey: 'updated_at',
    header: 'Last Edited',
    cell: ({ getValue }) => formatDate(getValue<string>()),
  });

  // Actions
  columns.push({
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const router = useRouter();
      const id = row.original.id;

      return (
        <div className="flex gap-4 text-gray-600 items-center">
          {mode === 'active' && (
            <>
              <EyeOutlined
                className="cursor-pointer hover:text-purple-600"
                onClick={() => router.push(`${entityBasePath}/${id}/performance`)}
              />
              <EditOutlined
                className="cursor-pointer hover:text-purple-600"
                onClick={() => router.push(`${entityBasePath}/edit/${id}`)}
              />
            </>
          )}

          {mode === 'draft' && (
            <>
              <button
                onClick={() => onPublish?.(id)}
                className="rounded-4xl bg-[#F5F0FF] !text-[#904BFF] py-1 px-4"
              >
                Publish
              </button>

              <EditOutlined
                className="cursor-pointer hover:text-purple-600"
                onClick={() => {
                  console.log('Routing to:', `${entityBasePath}/edit/${id}`);
                  router.push(`${entityBasePath}/edit/${id}`);
                }}
              />

              {/* <button onClick={() => onDelete?.(id)} className="text-red-500">
                Delete
              </button> */}
              <Trash2 onClick={() => onDelete?.(id)} />
            </>
          )}
        </div>
      );
    },
  });

  return columns;
};
