'use client';

import {
  DndContext,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core';
import { useState } from 'react';
import DragAddButton from './DragAddButton';
import HierarchyRow from './HierarchyRow';
import DragOverlayUI from './DragOverlayUI';
import { Category } from './hierarchy.types';
// import { Category } from './types';

export default function Hierarchy() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const [activeDrag, setActiveDrag] = useState<{
    label: string;
    dragType: 'ADD_CATEGORY' | 'ADD_DEPARTMENT';
  } | null>(null);

  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const [dropValid, setDropValid] = useState(false);

  /* ---------------- DRAG EVENTS ---------------- */

  const handleDragStart = (e: DragStartEvent) => {
    setIsDragging(true);
    setActiveDrag({
      label: e.active.data.current?.label,
      dragType: e.active.data.current?.dragType,
    });
  };

  const handleDragOver = (e: DragOverEvent) => {
    const dragType = e.active.data.current?.dragType;
    const overType = e.over?.data.current?.type;

    if (!dragType || !overType) return;

    if (dragType === 'ADD_CATEGORY' && overType === 'PRINCIPAL') {
      setDropValid(true);
      setFeedback({
        type: 'success',
        message: 'Add category under principal',
      });
      return;
    }

    if (dragType === 'ADD_DEPARTMENT' && overType === 'CATEGORY') {
      setDropValid(true);
      setFeedback({
        type: 'success',
        message: 'Add Department under Engineering category',
      });
      return;
    }

    setDropValid(false);
    setFeedback({
      type: 'error',
      message: 'You can’t move here',
    });
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const dragType = e.active.data.current?.dragType;
    const overId = e.over?.id as string | null;
    const overType = e.over?.data.current?.type;

    if (dragType === 'ADD_CATEGORY' && overType === 'PRINCIPAL') {
      setCategories((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          name: 'Category',
          isNew: true,
          departments: [],
        },
      ]);
    }

    if (dragType === 'ADD_DEPARTMENT' && overType === 'CATEGORY') {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === overId
            ? {
                ...cat,
                departments: [
                  ...cat.departments,
                  {
                    id: crypto.randomUUID(),
                    name: 'New Department',
                    isNew: true,
                  },
                ],
              }
            : cat
        )
      );
    }

    setIsDragging(false);
    setActiveDrag(null);
    setFeedback(null);
    setDropValid(false);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
        {/* LEFT */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-800">Organization Hierarchy</h2>
            <a href="#" className="text-sm text-purple-600 flex items-center gap-1">
              View your organization tree ↗
            </a>
          </div>
          <p className="mt-1 text-sm text-gray-600">ABC Engineering College</p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col md:items-end gap-2 w-full md:w-auto">
          <p className="text-sm text-gray-500">Drag and drop to add</p>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <DragAddButton id="add-category" label="Add Category" dragType="ADD_CATEGORY" />
            <DragAddButton id="add-department" label="Add Department" dragType="ADD_DEPARTMENT" />
          </div>
        </div>
      </div>

      {/* PRINCIPAL */}
      <HierarchyRow
        id="principal"
        type="PRINCIPAL"
        label="Institutional admin (Principal)"
        showDropLine
        isDropAllowed={dropValid}
      />

      {/* CATEGORIES */}
      <div className="mt-4 ml-2 sm:ml-4 md:ml-6 space-y-4">
        {categories.map((cat) => (
          <div key={cat.id}>
            <HierarchyRow
              id={cat.id}
              type="CATEGORY"
              label={cat.name}
              isNew={cat.isNew}
              showDropLine
              isDropAllowed={dropValid}
            />

            <div className="ml-4 sm:ml-6 md:ml-10 mt-2 space-y-2">
              {cat.departments.map((dept) => (
                <HierarchyRow
                  key={dept.id}
                  id={dept.id}
                  type="DEPARTMENT"
                  label={dept.name}
                  isNew={dept.isNew}
                  showDropLine={false}
                  isDropAllowed={false}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FULL WHITE OVERLAY */}
      {isDragging && <div className="fixed inset-0 bg-white/80 z-40" />}

      {/* DRAG OVERLAY */}
      <DragOverlay>
        {activeDrag && (
          <div className="z-50">
            <DragOverlayUI label={activeDrag.label} feedback={feedback} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
