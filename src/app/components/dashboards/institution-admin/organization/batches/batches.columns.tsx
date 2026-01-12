import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

/* ================= TYPES ================= */

export type Batch = {
  id: number;
  name: string;
  department: {
    id: number;
    name: string;
    // code: string;
  };
  category: string;
  faculties: string[];
  academic_year: string;
  students: number;
  status: 'Active' | 'Inactive';
};
export type BatchApiData = {
  id: number;
  name: string;
  category: string | null;
  department: {
    id: number;
    name: string;
  };
  coordinator?: {
    id: string;
    name: string;
  } | null;

  academic_year: string;
  students: number;
  status: 'Active' | 'Inactive';
};

export type BatchApiResponse = BatchApiData[];

/* ================= MAPPER ================= */
export const mapApiBatchToBatch = (apiData: BatchApiData): Batch => ({
  id: apiData.id,
  name: apiData.name,

  department: {
    id: apiData.department.id,
    name: apiData.department.name,
  },

  category: apiData.category ?? '',

  faculties: [],

  academic_year: apiData.academic_year,

  students: apiData.students,

  status: apiData.status,
});

/* ================= COLUMNS ================= */

export const batchesColumns = (
  onEditBatch: (row: Batch) => void,
  onDeleteBatch: (row: Batch) => void
): ColumnDef<Batch>[] => [
  {
    accessorKey: 'name',
    header: 'Batch Name',
    cell: ({ row }) => <p className="font-medium text-gray-900 truncate">{row.original.name}</p>,
  },
  {
    accessorKey: 'department',
    header: 'Department',
    cell: ({ row }) => (
      <div className="max-w-[220px]">
        <p className="font-medium text-gray-900 truncate">{row.original.department.name}</p>
        {/* <p className="text-[11px] sm:text-xs text-gray-500 truncate">
          {row.original.department.code}
        </p> */}
      </div>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ getValue }) => <span className="text-gray-600">{getValue() as string}</span>,
  },
  // {
  //   accessorKey: 'faculties',
  //   header: 'Faculties',
  //   cell: ({ getValue }) => (
  //     <span className="text-gray-600 truncate block max-w-[160px]">
  //       {(getValue() as string[]).join(', ')}
  //     </span>
  //   ),
  // },
  {
    accessorKey: 'faculties',
    header: 'Faculties',
    cell: ({ getValue }) => {
      const faculties = getValue() as string[];

      return (
        <div className="relative group max-w-[160px]">
          {/* Visible truncated text */}
          <span className="text-gray-600 truncate block cursor-pointer">
            {faculties.join(', ')}
          </span>

          {/* Hover popup */}
          {faculties.length > 1 && (
            <div
              className="
              absolute top-0 left-full ml-3 z-50
              hidden group-hover:block
              w-56 rounded-xl bg-white
              shadow-[0_4px_16px_0_#00000033]
              border border-gray-100
            "
            >
              <div className="px-4 py-3 font-semibold text-sm text-[#1A2C50] border-b">
                Faculties list
              </div>

              <div className="max-h-60 overflow-y-auto">
                {faculties.map((faculty, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 text-[12px] text-gray-700 border-b-[#DBE3E9] border-b last:border-b-0"
                  >
                    {faculty}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: 'academic_year',
    header: 'Academic year',
    cell: ({ getValue }) => <span className="text-gray-600">{getValue() as string}</span>,
  },
  {
    accessorKey: 'students',
    header: 'Students',
    cell: ({ getValue }) => <span className="text-gray-600">{getValue() as number}</span>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as Batch['status'];
      return (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <button
          onClick={() => onEditBatch(row.original)}
          className="p-2 rounded-md text-gray-400 hover:text-indigo-500 hover:bg-indigo-50"
        >
          <Pencil className="w-4 h-4" />
        </button>

        <button
          onClick={() => onDeleteBatch(row.original)}
          className="p-2 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    ),
  },
];
