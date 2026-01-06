import { useQuery } from '@tanstack/react-query';

// API Types
interface Role {
  id: number;
  name: string;
  showCategories?: boolean;
  showDepartment?: boolean;
  showBatch?: boolean;
}

interface RolesResponse {
  data: {
    roles: Role[];
  };
}

// Fetch function
const fetchRoles = async (): Promise<RolesResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/institutionsadmin/role-hierarchy`);
  if (!response.ok) {
    throw new Error('Failed to fetch roles');
  }
  return response.json();
};

// RoleSelector Component
const RoleSelector = ({ selectedRole, register }: any) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['roles'],
    queryFn: fetchRoles,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center gap-2 text-gray-600">
          <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading roles...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-600 text-sm">
          Error loading roles: {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      </div>
    );
  }

  const roles = data?.data?.roles || [];

  if (roles.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500 text-sm">No roles available</div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {roles.map((role) => {
        const selected = selectedRole === role.name;
        return (
          <label
            key={role.id}
            className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer text-sm transition-colors
              ${
                selected
                  ? 'bg-purple-100 text-purple-700 border border-purple-300'
                  : 'bg-gray-100 text-gray-600 border border-gray-200 hover:border-purple-300'
              }`}
          >
            <input
              type="radio"
              value={role.name}
              {...register('roleHierarchy')}
              className="sr-only"
            />
            {selected && <span className="text-purple-700">✓</span>}
            {role.name}
          </label>
        );
      })}
    </div>
  );
};

export default RoleSelector;