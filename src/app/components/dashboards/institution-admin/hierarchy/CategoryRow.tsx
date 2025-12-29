'use client';

import { useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';

export default function CategoryRow({
  id,
  name,
  isValidDrop,
}: {
  id: string;
  name: string;
  isValidDrop: boolean | null;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: { accepts: 'DEPARTMENT' },
  });

  return (
    <div className="relative">
      {/* DROP LINE (this matches Figma) */}
      {isOver && (
        <div
          className={clsx(
            'absolute -bottom-1 left-0 right-0 h-[2px]',
            isValidDrop ? 'bg-green-500' : 'bg-red-500'
          )}
        />
      )}

      <div ref={setNodeRef} className="border border-purple-300 rounded-xl px-4 py-3 bg-white">
        {name}
      </div>
    </div>
  );
}
