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
    name: 'Dr. Rajesh Kumar',
    role: 'Category admin',
    Department: 'Engineering',
    status: 'Active',
    lastLogin: '2 days ago',
  },
  {
    id: 2,
    name: 'Dr. Anil Sharma',
    role: 'Management admin',
    Department: 'Information Technology',
    status: 'Active',
    lastLogin: '5 hours ago',
  },
  {
    id: 3,
    name: 'Dr. Suresh Patil',
    role: 'Management admin',
    Department: 'Mechanical Engineering',
    status: 'Inactive',
    lastLogin: '12 days ago',
  },
  {
    id: 4,
    name: 'Dr. Ravi Verma',
    role: 'Category admin',
    Department: 'Civil Engineering',
    status: 'Active',
    lastLogin: '1 day ago',
  },
  {
    id: 5,
    name: 'Dr. Meena Iyer',
    role: 'Management admin',
    Department: 'Electrical Engineering',
    status: 'Active',
    lastLogin: '3 hours ago',
  },
  {
    id: 6,
    name: 'Dr. Neha Gupta',
    role: 'Management admin',
    Department: 'Artificial Intelligence',
    status: 'Inactive',
    lastLogin: '18 days ago',
  },
  {
    id: 7,
    name: 'Dr. Aman Khanna',
    role: 'Category admin',
    Department: 'Data Science',
    status: 'Active',
    lastLogin: '30 minutes ago',
  },
  {
    id: 8,
    name: 'Dr. Vikram Singh',
    role: 'Management admin',
    Department: 'Robotics',
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
