'use client';

import { useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';

export default function HierarchyRow({
  id,
  type,
  label,
  isNew,
  showDropLine,
  isDropAllowed,
}: {
  id: string;
  type: 'PRINCIPAL' | 'CATEGORY' | 'DEPARTMENT';
  label: string;
  isNew?: boolean;
  showDropLine: boolean;
  isDropAllowed: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: { type },
  });

  return (
    <div className="relative">
      {/* DROP INDICATOR */}
      {isOver && showDropLine && (
        <div
          className={clsx(
            'absolute -bottom-[2px] left-0 right-0 h-[2px]',
            isDropAllowed ? 'bg-green-500' : 'bg-red-500'
          )}
        />
      )}

      <div
        ref={setNodeRef}
        className={clsx(
          'flex items-center justify-between px-4 py-2 rounded-2xl bg-white border',
          type === 'PRINCIPAL' && 'border-orange-300 border-2',
          type === 'CATEGORY' && 'border-purple-300',
          type === 'DEPARTMENT' && 'border-blue-300'
        )}
      >
        <div className="flex items-center gap-3">
          <span>{label}</span>
          {isNew && (
            <span className="text-xs px-2 py-0.5 rounded border border-green-500 text-green-600">
              Newly added
            </span>
          )}
        </div>

        {type !== 'PRINCIPAL' && <button className="text-gray-400 hover:text-red-500">🗑</button>}
      </div>
    </div>
  );
}
