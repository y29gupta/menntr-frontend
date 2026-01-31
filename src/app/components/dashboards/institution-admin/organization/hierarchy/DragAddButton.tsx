'use client';

import { useDraggable } from '@dnd-kit/core';

export default function DragAddButton({
  id,
  label,
  dragType,
}: {
  id: string;
  label: string;
  dragType: 'ADD_CATEGORY' | 'ADD_DEPARTMENT';
}) {
  const { setNodeRef, listeners, attributes } = useDraggable({
    id,
    data: { dragType, label },
  });

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-4 rounded-2xl border border-[#BFB2FF] bg-white text-sm text-[#0F172A] cursor-grab
           w-full sm:w-auto text-center"
    >
      {label}
    </button>
  );
}
