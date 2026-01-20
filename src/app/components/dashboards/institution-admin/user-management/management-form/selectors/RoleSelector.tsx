import { useQuery } from '@tanstack/react-query';

interface Role {
  id: number;
  name: string;
}

interface RolesResponse {
  data: {
    roles: Role[];
  };
}

const fetchRoles = async (): Promise<RolesResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/institutionsadmin/role-hierarchy`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch roles');
  }
  return response.json();
};

type Props = {
  selectedRole?: string;
  register: any;
  onRoleSelect: (roleId: number) => void;
  allRoles?: Role[];
};

const RoleSelector = ({ selectedRole, register, onRoleSelect, allRoles = [] }: Props) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['roles'],
    queryFn: fetchRoles,
    staleTime: 5 * 60 * 1000,
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

  const roleHierarchies = data?.data?.roles || [];

  if (roleHierarchies.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500 text-sm">No roles available</div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h4 className="mb-3 text-sm font-medium text-gray-700">Select Role Hierarchy</h4>
      <div className="flex flex-wrap gap-2">
        {roleHierarchies.map((role) => {
          const selected = selectedRole === role.name;
          return (
            <label
              key={role.id}
              onClick={() => {
                onRoleSelect(role.id);
              }}
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
              <span>{role.name}</span>
            </label>
          );
        })}
      </div>

      {/* Display all roles with full names when a role hierarchy is selected */}
      {allRoles.length > 0 && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <h5 className="text-xs font-semibold text-gray-600 mb-2">Available Roles (ID - Name):</h5>
          <div className="flex flex-wrap gap-2">
            {allRoles.map((role) => (
              <span
                key={role.id}
                className="inline-block px-3 py-1 bg-white border border-gray-300 rounded-full text-xs text-gray-700"
              >
                <span className="font-semibold text-purple-600">{role.id}</span> - {role.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleSelector;
