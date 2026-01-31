import DataTable from '@/app/components/table/DataTable';
import {
  Department,
  DepartmentApiData,
  DepartmentApiResponse,
  departmentColumns,
  mapApiDepartmentToDepartment,
} from './department.column';
import { useQuery } from '@tanstack/react-query';
import { getDepartments } from '@/app/lib/institutions.api';

type Props = {
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  showColumnFilters: boolean;

  onEdit: (row: Department) => void;
};

export default function DepartmentsTable({
  globalFilter,
  onGlobalFilterChange,
  showColumnFilters,
  onEdit,
}: Props) {
  // const [departmentData, setDepartmentData] = useState<DepartmentApiData[]>();
  const {
    data: departmentResponse,
    isLoading,
    isError,
  } = useQuery<DepartmentApiResponse>({
    queryKey: ['department'],
    queryFn: getDepartments,
    // enabled: !!institutionId,
  });
  const tableData: Department[] = departmentResponse?.data.map(mapApiDepartmentToDepartment) ?? [];

  if (isLoading) {
    return <div className="p-4 text-sm text-gray-500">Loading departments...</div>;
  }

  if (isError) {
    return <div className="p-4 text-sm text-red-500">Failed to load departments</div>;
  }

  return (
    <DataTable<Department>
      data={tableData}
      columns={departmentColumns(
        (row) => onEdit(row),
        (row) => console.log('Delete', row)
      )}
      // // isLoading={isLoading}
      // globalFilter={globalFilter}
      // onGlobalFilterChange={onGlobalFilterChange}
      // showColumnFilters={showColumnFilters}
      columnFilters={{}}
      onColumnFilterChange={() => {}}
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
