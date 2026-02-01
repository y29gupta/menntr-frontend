import { Handle, Position } from 'reactflow';
import { User } from './hierarchy.types';

export function OrganizationTreeNode({ data }: any) {
  const users: User[] = data.users || [];
  const typeLabel =
    data.type === 'institution'
      ? 'Institution'
      : data.type === 'category'
        ? 'Category'
        : data.type === 'department'
          ? 'Department'
          : data.type === 'faculty'
            ? 'Faculty'
            : 'Role';

  return (
    <div
      className="
        w-[280px]
        rounded-xl
        bg-white
        shadow-lg
        border-2
        px-4 py-3
        text-left
      "
      style={{
        borderColor:
          data.type === 'institution'
            ? '#f97316'
            : data.type === 'category'
              ? '#a855f7'
              : data.type === 'department'
                ? '#3b82f6'
                : '#10b981',
      }}
    >
      {/* Name */}
      <div className="text-sm font-semibold text-gray-900 mb-1">{data.name}</div>
      <div className="text-xs text-gray-500 mb-2">{typeLabel}</div>

      {/* Users List */}
      {users.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="text-xs font-medium text-gray-700 mb-2">
            {users.length} {users.length === 1 ? 'User' : 'Users'}
          </div>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {users.map((user: User) => (
              <div key={user.id} className="text-xs text-gray-600 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span className="truncate">{user.name || user.email}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {users.length === 0 && (
        <div className="text-xs text-gray-400 mt-2 italic">No users assigned</div>
      )}

      {/* Accent bar */}
      <div
        className="h-1 w-10 rounded-full mx-auto mt-3"
        style={{
          backgroundColor:
            data.type === 'institution'
              ? '#f97316'
              : data.type === 'category'
                ? '#a855f7'
                : data.type === 'department'
                  ? '#3b82f6'
                  : '#10b981',
        }}
      />

      {/* Handles */}
      <Handle type="target" position={Position.Top} className="!bg-emerald-400 !w-2 !h-2" />
      <Handle type="source" position={Position.Bottom} className="!bg-emerald-400 !w-2 !h-2" />
    </div>
  );
}
