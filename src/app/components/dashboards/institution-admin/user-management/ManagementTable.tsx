import DataTable from '@/app/components/table/DataTable';
import { Management, ManagementColumn } from './usermanagement.column';

type Props = {
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  showColumnFilters: boolean;
  onEdit: (row: Management) => void;
};

// TEMP / demo data (replace with API later)
const data: Management[] = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Category admin',
    Department: 'Engineering',
    status: 'Active',
    lastLogin: '2 days ago',
  },
  {
    id: 2,
    name: 'Anil Sharma',
    role: 'Institution admin',
    Department: 'Agriculture',
    status: 'Active',
    lastLogin: '5 hours ago',
  },
  {
    id: 3,
    name: 'Suresh Patil',
    role: 'H.O.D',
    Department: 'Engineering',
    status: 'Inactive',
    lastLogin: '12 days ago',
  },
  {
    id: 4,
    name: 'Ravi Verma',
    role: 'Placement Officer',
    Department: 'Engineering',
    status: 'Active',
    lastLogin: '1 day ago',
  },
  {
    id: 5,
    name: 'Meena Iyer',
    role: 'Faculty',
    Department: 'Engineering',
    status: 'Active',
    lastLogin: '3 hours ago',
  },
  {
    id: 6,
    name: 'Neha Gupta',
    role: 'Category admin',
    Department: 'Engineering',
    status: 'Inactive',
    lastLogin: '18 days ago',
  },
  {
    id: 7,
    name: 'Aman Khanna',
    role: 'Institution admin',
    Department: 'Agriculture',
    status: 'Active',
    lastLogin: '30 minutes ago',
  },
  {
    id: 8,
    name: 'Vikram Singh',
    role: 'Faculty',
    Department: 'Agriculture',
    status: 'Active',
    lastLogin: '6 days ago',
  },
  {
    id: 9,
    name: 'Pooja Nair',
    role: 'Faculty',
    Department: 'Engineering',
    status: 'Active',
    lastLogin: '1 hour ago',
  },
  {
    id: 10,
    name: 'Karthik R',
    role: 'H.O.D',
    Department: 'Agriculture',
    status: 'Active',
    lastLogin: '4 days ago',
  },
  {
    id: 11,
    name: 'Sunil Joshi',
    role: 'Placement Officer',
    Department: 'Engineering',
    status: 'Inactive',
    lastLogin: '22 days ago',
  },
  {
    id: 12,
    name: 'Anusha Rao',
    role: 'Faculty',
    Department: 'Engineering',
    status: 'Active',
    lastLogin: '45 minutes ago',
  },
  {
    id: 13,
    name: 'Deepak Mishra',
    role: 'Category admin',
    Department: 'Agriculture',
    status: 'Active',
    lastLogin: '2 hours ago',
  },
  {
    id: 14,
    name: 'Kiran Desai',
    role: 'Faculty',
    Department: 'Agriculture',
    status: 'Inactive',
    lastLogin: '14 days ago',
  },
  {
    id: 15,
    name: 'Manoj Kulkarni',
    role: 'Institution admin',
    Department: 'Engineering',
    status: 'Active',
    lastLogin: '10 minutes ago',
  },
  {
    id: 16,
    name: 'Shruti Malhotra',
    role: 'Faculty',
    Department: 'Engineering',
    status: 'Active',
    lastLogin: '8 hours ago',
  },
  {
    id: 17,
    name: 'Nitin Chawla',
    role: 'Placement Officer',
    Department: 'Agriculture',
    status: 'Active',
    lastLogin: '3 days ago',
  },
  {
    id: 18,
    name: 'Bhavya Jain',
    role: 'Category admin',
    Department: 'Engineering',
    status: 'Inactive',
    lastLogin: '20 days ago',
  },
  {
    id: 19,
    name: 'Arjun Reddy',
    role: 'Faculty',
    Department: 'Engineering',
    status: 'Active',
    lastLogin: '25 minutes ago',
  },
  {
    id: 20,
    name: 'Lavanya S',
    role: 'H.O.D',
    Department: 'Agriculture',
    status: 'Active',
    lastLogin: '7 days ago',
  },
];

export default function ManagementTable({
  globalFilter,
  onGlobalFilterChange,
  showColumnFilters,
  onEdit,
}: Props) {
  /* 🔹 Map globalFilter → columnFilters */
  const columnFilters: Record<string, string> = globalFilter
    ? {
        name: globalFilter,
        role: globalFilter,
        Department: globalFilter,
        status: globalFilter,
      }
    : {};

  const onColumnFilterChange = (columnName: string, value: string) => {
    onGlobalFilterChange(value);
  };

  return (
    <DataTable<Management>
      data={data}
      columns={ManagementColumn(
        (row) => onEdit(row),
        (row) => console.log('Delete', row)
      )}
      columnFilters={columnFilters}
      onColumnFilterChange={onColumnFilterChange}
      showColumnFilters={showColumnFilters}
      currentPage={1}
      pageCount={1}
      onPreviousPage={() => {}}
      onNextPage={() => {}}
      canPreviousPage={false}
      canNextPage={false}
    />
  );
}
