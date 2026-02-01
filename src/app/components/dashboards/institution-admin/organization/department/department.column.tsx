import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type Department = {
  id: number;
  name: string;
  code: string;
  // categoryId?: number;
  // hodUserId?: number;
  category: {};
  hod: {} | null;
  students?: number;
  faculty?: number;
};

export type DepartmentApiData = {
  id: number;
  name: string;
  code: string | null;
  category: {
    id: number;
    name: string;
  } | null;
  hod: {
    id: number;
    name: string;
    email: string;
  } | null;
  // hod: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DepartmentApiResponse = {
  total: number;
  page: number;
  limit: number;
  data: DepartmentApiData[];
};

export type CreateDepartmentPayload = {
  name: string;
  code: string;
  category_id?: number | null;
  // hodUserId removed - users can be assigned separately
};

export type UpdateDepartmentPayload = {
  name?: string;
  code?: string;
  category_id?: number | null;
  // hodUserId removed
};

// export const mapApiDepartmentToDepartment = (apiData: DepartmentApiData): Department => ({
//   id: apiData.id,
//   name: apiData.name ?? '—',
//   code: apiData.code ?? '—',
//   category: apiData.category?.name ?? '—',
//   hod: apiData.hod?.name ?? '—',
//   students: 0,
//   faculty: 0,
// });
export const mapApiDepartmentToDepartment = (apiData: DepartmentApiData): Department => ({
  id: apiData.id,
  name: apiData.name ?? '—',
  code: apiData.code ?? '—',
  // categoryId: apiData.category?.id,
  // hodUserId: apiData.hod?.id,
  category: apiData.category ?? '—',
  hod: apiData.hod ?? '—',
  students: 0,
  faculty: 0,
});

export const departmentColumns = (
  onEditDepartment: (row: Department) => void,
  onDeleteDepartment: (row: Department) => void
): ColumnDef<Department>[] => [
  {
    accessorKey: 'name',
    header: 'Department',
    cell: ({ row }) => (
      <div className="max-w-[260px]">
        <p className="font-medium text-gray-900 truncate">{row.original.name}</p>
        <p className="text-[11px] sm:text-xs text-gray-500 truncate">{row.original.code}</p>
      </div>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      return <span className="text-gray-600">{row.original.name as string}</span>;
    },
  },
  {
    accessorKey: 'hod',
    header: 'HOD',
    cell: ({ row }) => <span className="text-gray-600">{row.original.name as string}</span>,
  },
  {
    accessorKey: 'students',
    header: 'Students',
    cell: ({ getValue }) => <span className="text-gray-600">{getValue() as number}</span>,
  },
  {
    accessorKey: 'faculty',
    header: 'Faculty',
    cell: ({ getValue }) => <span className="text-gray-600">{getValue() as number}</span>,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            onEditDepartment(row.original);
          }}
          className="p-2 rounded-md text-gray-400 hover:text-indigo-500 hover:bg-indigo-50"
        >
          <Pencil className="w-4 h-4" />
        </button>

        <button
          onClick={() => onDeleteDepartment(row.original)}
          className="p-2 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    ),
  },
];
