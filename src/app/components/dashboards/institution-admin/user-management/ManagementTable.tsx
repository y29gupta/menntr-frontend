import DataTable from '@/app/components/table/DataTable';
import { Management, ManagementColumn } from './usermanagement.column';

type Props = {
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  showColumnFilters: boolean;

  onEdit: (row: Management) => void;
};

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
];

export default function ManagementTable({
  globalFilter,
  onGlobalFilterChange,
  showColumnFilters,
  onEdit,
}: Props) {
  return (
    <DataTable
      data={data}
      columns={ManagementColumn(
        (row) => onEdit(row),
        (row) => console.log('Delete', row)
      )}
      globalFilter={globalFilter}
      onGlobalFilterChange={onGlobalFilterChange}
      showColumnFilters={showColumnFilters}
    />
  );
}
