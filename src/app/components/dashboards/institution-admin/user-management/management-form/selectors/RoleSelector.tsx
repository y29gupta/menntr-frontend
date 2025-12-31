import { ROLE_CONFIG, RoleKey } from '@/app/constants/roleConfig';

const RoleSelector = ({ selectedRole, register }: any) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {(Object.keys(ROLE_CONFIG.hierarchy) as RoleKey[]).map((role) => {
        const selected = selectedRole === role;
        return (
          <label
            key={role}
            className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer text-sm
              ${
                selected
                  ? 'bg-purple-100 text-purple-700 border border-purple-300'
                  : 'bg-gray-100 text-gray-600 border border-gray-200 hover:border-purple-300'
              }`}
          >
            <input type="radio" value={role} {...register('roleHierarchy')} className="sr-only" />
            {selected && <span>✓</span>}
            {role}
          </label>
        );
      })}
    </div>
  );
};

export default RoleSelector;
