import { Handle, Position } from 'reactflow';

export function OrganizationTreeNode({ data }: any) {
  return (
    <div
      className="
        w-[260px]
        rounded-xl
        bg-white
        shadow-lg
        border border-gray-200
        px-4 py-3
        text-center
      "
    >
      {/* Name */}
      <div className="text-sm font-semibold text-gray-900">{data.name}</div>

      {/* Role */}
      {data.type === 'institution' && <div className="text-xs text-gray-500 mt-1">Institution</div>}

      {data.type === 'category' && data.head && (
        <div className="text-xs text-gray-500 mt-1">Head • {data.head.name}</div>
      )}

      {data.type === 'department' && data.hod && (
        <div className="text-xs text-gray-500 mt-1">HOD • {data.hod.name}</div>
      )}

      {/* Accent bar */}
      <div className="h-1 w-10 bg-emerald-400 rounded-full mx-auto mt-2" />

      {/* Handles */}
      <Handle type="target" position={Position.Top} className="!bg-emerald-400 !w-2 !h-2" />
      <Handle type="source" position={Position.Bottom} className="!bg-emerald-400 !w-2 !h-2" />
    </div>
  );
}
