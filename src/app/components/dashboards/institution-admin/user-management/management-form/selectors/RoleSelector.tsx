'use client';

import { useQuery } from '@tanstack/react-query';

interface Role {
  id: number;
  name: string;
}

interface RolesHierarchyResponse {
  data: {
    roles: Role[];
  };
}

const fetchRoleHierarchies = async (): Promise<RolesHierarchyResponse> => {
  const res = await fetch(`/api/institutionsadmin/role-hierarchy`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch role hierarchies');
  }

  return res.json();
};

type Props = {
  selectedRole?: string | number;
  register: any;
  onRoleSelect: (roleHierarchyId: number) => void;
  allRoles?: Role[];
};

const RoleSelector = ({ selectedRole, register, onRoleSelect, allRoles = [] }: Props) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['role-hierarchies'],
    queryFn: fetchRoleHierarchies,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <div className="py-6 text-sm text-gray-500">Loading roles…</div>;
  }

  if (isError) {
    return (
      <div className="py-6 text-sm text-red-500">
        {error instanceof Error ? error.message : 'Failed to load roles'}
      </div>
    );
  }

  const roleHierarchies = data?.data?.roles ?? [];

  return (
    <div className="mb-6">
      <h4 className="mb-3 text-sm font-medium text-gray-700">Select Role Hierarchy</h4>

      <div className="flex flex-wrap gap-2">
        {roleHierarchies.map((role) => {
          const isSelected = selectedRole === role.id || selectedRole === String(role.id);

          return (
            <label
              key={role.id}
              onClick={() => onRoleSelect(role.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer text-sm
                ${
                  isSelected
                    ? 'bg-purple-100 text-purple-700 border border-purple-300'
                    : 'bg-gray-100 text-gray-600 border border-gray-200 hover:border-purple-300'
                }`}
            >
              <input
                type="radio"
                value={role.id}
                {...register('roleHierarchy')}
                className="sr-only"
              />

              {isSelected && <span>✓</span>}
              {role.name}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default RoleSelector;
