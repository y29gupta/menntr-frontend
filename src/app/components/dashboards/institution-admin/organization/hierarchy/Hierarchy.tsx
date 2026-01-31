'use client';

import {
  DndContext,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import DragAddButton from './DragAddButton';
import HierarchyRow from './HierarchyRow';
import DragOverlayUI from './DragOverlayUI';

import CategoryForm from '../category/CategoryForm';
import DepartmentForm from '../department/Department-form';

import { createDepartment, getHierarchy } from '@/app/lib/institutions.api';
import { OrganizationTreeModal } from './OrganizationTreeModal';

export default function Hierarchy() {
  const { data, refetch } = useQuery({
    queryKey: ['organization-hierarchy'],
    queryFn: getHierarchy,
  });

  const categories = data?.institution?.children ?? [];

  const [isDragging, setIsDragging] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showDepartmentForm, setShowDepartmentForm] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [activeDrag, setActiveDrag] = useState<{
    label: string;
    dragType: 'ADD_CATEGORY' | 'ADD_DEPARTMENT';
  } | null>(null);

  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const [dropValid, setDropValid] = useState(false);

  const createDepartmentMutation = useMutation({
    mutationFn: createDepartment,
  });

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

    if (dragType === 'ADD_CATEGORY' && overType === 'PRINCIPAL') {
      setDropValid(true);
      setFeedback({ type: 'success', message: 'Add category' });
      return;
    }

    if (dragType === 'ADD_DEPARTMENT' && overType === 'CATEGORY') {
      setDropValid(true);
      setFeedback({ type: 'success', message: 'Add department' });
      return;
    }

    setDropValid(false);
    setFeedback({ type: 'error', message: 'Invalid drop' });
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const dragType = e.active.data.current?.dragType;
    const overId = e.over?.id as string | null;
    const overType = e.over?.data.current?.type;

    if (dragType === 'ADD_CATEGORY' && overType === 'PRINCIPAL') {
      setShowCategoryForm(true);
    }

    if (dragType === 'ADD_DEPARTMENT' && overType === 'CATEGORY') {
      setActiveCategoryIndex(Number(overId));
      setShowDepartmentForm(true);
    }

    setIsDragging(false);
    setActiveDrag(null);
    setFeedback(null);
    setDropValid(false);
  };

  return (
    <>
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {/* HEADER (UNCHANGED) */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
          <div className="flex  ">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Organization Hierarchy</h2>
              <p className="text-sm text-gray-600">ABC Engineering College</p>
            </div>
            <a
              onClick={() => setOpen(true)}
              className="text-sm text-purple-600 flex   gap-1 ml-1 mt-1"
            >
              View your organization tree ↗
            </a>
          </div>
          <OrganizationTreeModal open={open} onClose={() => setOpen(false)} />

          <div>
            <p className="text-sm text-gray-500">Drag and drop to add</p>
            <div className="flex gap-3">
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
        <div className="mt-4 ml-6 space-y-4">
          {categories.map((cat, index) => (
            <div key={index}>
              <HierarchyRow
                id={String(index)}
                type="CATEGORY"
                label="Category"
                showDropLine
                isDropAllowed={dropValid}
              />

              <div className="ml-8 mt-2 space-y-2">
                {cat.children?.map((_, deptIndex) => (
                  <HierarchyRow
                    key={deptIndex}
                    id={`${index}-${deptIndex}`}
                    type="DEPARTMENT"
                    label="Department"
                    showDropLine={false}
                    isDropAllowed={false}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {isDragging && <div className="fixed inset-0 bg-white/80 z-40" />}

        <DragOverlay>
          {activeDrag && <DragOverlayUI label={activeDrag.label} feedback={feedback} />}
        </DragOverlay>
      </DndContext>

      {/* CATEGORY FORM OVERLAY */}
      {showCategoryForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl">
            <CategoryForm
              mode="add"
              onCancel={() => setShowCategoryForm(false)}
              onSubmitSuccess={() => {
                setShowCategoryForm(false);
                refetch();
              }}
            />
          </div>
        </div>
      )}

      {/* DEPARTMENT FORM OVERLAY */}
      {showDepartmentForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl">
            <DepartmentForm
              mode="create"
              onBack={() => setShowDepartmentForm(false)}
              onSubmit={(data) => {
                createDepartmentMutation.mutate(data, {
                  onSuccess: () => {
                    setShowDepartmentForm(false);
                    refetch(); // hierarchy refetch
                  },
                });
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
