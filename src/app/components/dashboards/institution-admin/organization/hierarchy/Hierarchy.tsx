'use client';

import {
  DndContext,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  DragOverlay,
  closestCenter,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GripVertical, Trash2 } from 'lucide-react';

import DragAddButton from './DragAddButton';
import DragOverlayUI from './DragOverlayUI';
import { useDroppable } from '@dnd-kit/core';

import CategoryForm from '../category/CategoryForm';
import DepartmentForm from '../department/Department-form';

import { createDepartment, getHierarchy } from '@/app/lib/institutions.api';
import { OrganizationTreeModal } from './OrganizationTreeModal';
import { api } from '@/app/lib/api';

// Droppable Zone Component
function DroppableZone({
  id,
  type,
  children,
  className = '',
  isDropAllowed,
}: {
  id: string;
  type: string;
  children: React.ReactNode;
  className?: string;
  isDropAllowed: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: { type },
  });

  return (
    <div ref={setNodeRef} className={`relative ${className}`}>
      {isOver && (
        <div
          className={`absolute -bottom-[2px] left-0 right-0 h-[2px] ${
            isDropAllowed ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
      )}
      {children}
    </div>
  );
}

// Sortable Role Row Component
function SortableRoleRow({
  id,
  name,
  roleHierarchyId,
  type,
  onDelete,
  children,
}: {
  id: string;
  name: string;
  roleHierarchyId: number;
  type: 'CATEGORY' | 'DEPARTMENT' | 'FACULTY';
  onDelete?: () => void;
  children?: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: { type, roleHierarchyId },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const typeLabel =
    type === 'CATEGORY' ? 'Category' : type === 'DEPARTMENT' ? 'Department' : 'Faculty';
  const borderColor =
    type === 'CATEGORY' ? 'border-purple-300' : type === 'DEPARTMENT' ? 'border-blue-300' : 'border-green-300';

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <div
        className={`flex items-center justify-between px-4 py-3 rounded-xl bg-white border-2 shadow-sm hover:shadow-md transition-shadow ${borderColor}`}
      >
        <div className="flex items-center gap-3 flex-1">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
          >
            <GripVertical className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <span className="font-medium text-gray-900">{name}</span>
            <span className="ml-2 text-xs text-gray-500">({typeLabel})</span>
          </div>
        </div>
        {onDelete && (
          <button
            onClick={onDelete}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      {children && <div className="ml-8 mt-3 space-y-2">{children}</div>}
    </div>
  );
}

export default function Hierarchy() {
  const queryClient = useQueryClient();
  const { data, refetch } = useQuery({
    queryKey: ['organization-hierarchy'],
    queryFn: getHierarchy,
  });

  const institution = data?.institution;
  const categories = institution?.children ?? [];

  const [isDragging, setIsDragging] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showDepartmentForm, setShowDepartmentForm] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [activeDrag, setActiveDrag] = useState<{
    label: string;
    dragType: 'ADD_CATEGORY' | 'ADD_DEPARTMENT' | 'ROLE';
  } | null>(null);
  const [draggedRoleId, setDraggedRoleId] = useState<string | null>(null);

  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const [dropValid, setDropValid] = useState(false);

  const createDepartmentMutation = useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organization-hierarchy'] });
    },
  });

  const moveRoleMutation = useMutation({
    mutationFn: async ({ roleId, newParentId, newOrder }: { roleId: string; newParentId?: number; newOrder?: number }) => {
      const res = await api.put(`/organization/hierarchy/${roleId}/move`, {
        newParentId,
        newOrder,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organization-hierarchy'] });
    },
  });

  /* ---------------- DRAG EVENTS ---------------- */

  const handleDragStart = (e: DragStartEvent) => {
    setIsDragging(true);
    const dragType = e.active.data.current?.dragType;
    const roleId = e.active.id as string;

    if (dragType === 'ADD_CATEGORY' || dragType === 'ADD_DEPARTMENT') {
      setActiveDrag({
        label: e.active.data.current?.label,
        dragType: dragType,
      });
    } else if (e.active.data.current?.type) {
      // Dragging an existing role
      setDraggedRoleId(roleId);
      setActiveDrag({
        label: e.active.data.current?.name || 'Role',
        dragType: 'ROLE',
      });
    }
  };

  const handleDragOver = (e: DragOverEvent) => {
    const dragType = e.active.data.current?.dragType;
    const dragRoleHierarchyId = e.active.data.current?.roleHierarchyId;
    const overType = e.over?.data.current?.type;
    const overRoleHierarchyId = e.over?.data.current?.roleHierarchyId;

    // Adding new category/department
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

    // Reordering roles at same level
    if (dragType === 'ROLE' && dragRoleHierarchyId === overRoleHierarchyId) {
      setDropValid(true);
      setFeedback({ type: 'success', message: 'Reorder role' });
      return;
    }

    setDropValid(false);
    setFeedback({ type: 'error', message: 'Invalid drop' });
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const dragType = e.active.data.current?.dragType;
    const dragRoleHierarchyId = e.active.data.current?.roleHierarchyId;
    const overId = e.over?.id as string | null;
    const overType = e.over?.data.current?.type;
    const overRoleHierarchyId = e.over?.data.current?.roleHierarchyId;

    // Adding new category/department
    if (dragType === 'ADD_CATEGORY' && overType === 'PRINCIPAL') {
      setShowCategoryForm(true);
    }

    if (dragType === 'ADD_DEPARTMENT' && overType === 'CATEGORY') {
      setActiveCategoryId(overId);
      setShowDepartmentForm(true);
    }

    // Reordering roles at same level
    if (dragType === 'ROLE' && draggedRoleId && dragRoleHierarchyId === overRoleHierarchyId && overId) {
      // Find the category, department, or faculty list
      if (dragRoleHierarchyId === 2) {
        // Reordering categories
        const oldIndex = categories.findIndex((cat) => cat.id === draggedRoleId);
        const newIndex = categories.findIndex((cat) => cat.id === overId);
        if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
          moveRoleMutation.mutate({
            roleId: draggedRoleId,
            newOrder: newIndex,
          });
        }
      } else if (dragRoleHierarchyId === 3) {
        // Reordering departments - find which category they belong to
        for (const category of categories) {
          const oldIndex = category.children?.findIndex((dept) => dept.id === draggedRoleId) ?? -1;
          const newIndex = category.children?.findIndex((dept) => dept.id === overId) ?? -1;
          if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
            // Both are in the same category
            moveRoleMutation.mutate({
              roleId: draggedRoleId,
              newOrder: newIndex,
            });
            break;
          }
        }
      } else if (dragRoleHierarchyId === 4) {
        // Reordering faculty - find which department they belong to
        for (const category of categories) {
          for (const dept of category.children || []) {
            const oldIndex = dept.children?.findIndex((faculty) => faculty.id === draggedRoleId) ?? -1;
            const newIndex = dept.children?.findIndex((faculty) => faculty.id === overId) ?? -1;
            if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
              // Both are in the same department
              moveRoleMutation.mutate({
                roleId: draggedRoleId,
                newOrder: newIndex,
              });
              return;
            }
          }
        }
      }
    }

    setIsDragging(false);
    setActiveDrag(null);
    setDraggedRoleId(null);
    setFeedback(null);
    setDropValid(false);
  };

  return (
    <>
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
          <div className="flex items-start gap-2">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Organization Hierarchy</h2>
              <p className="text-sm text-gray-600">{institution?.name || 'Institution'}</p>
            </div>
            <a
              onClick={() => setOpen(true)}
              className="text-sm text-purple-600 flex items-center gap-1 ml-2 mt-1 cursor-pointer hover:underline"
            >
              View your organization tree ↗
            </a>
          </div>
          <OrganizationTreeModal open={open} onClose={() => setOpen(false)} />

          <div>
            <p className="text-sm text-gray-500 mb-2">Drag and drop to add or reorder</p>
            <div className="flex gap-3">
              <DragAddButton id="add-category" label="Add Category" dragType="ADD_CATEGORY" />
              <DragAddButton id="add-department" label="Add Department" dragType="ADD_DEPARTMENT" />
            </div>
          </div>
        </div>

        {/* PRINCIPAL - Droppable for adding categories */}
        <DroppableZone
          id="principal"
          type="PRINCIPAL"
          className="mb-4"
          isDropAllowed={dropValid}
        >
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white border-2 border-orange-300 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-900">{institution?.name || 'Institution Admin'}</span>
              <span className="text-xs text-gray-500">(Principal)</span>
            </div>
          </div>
        </DroppableZone>

        {/* CATEGORIES - Sortable */}
        <div className="mt-4 ml-6 space-y-4">
          <SortableContext items={categories.map((cat) => cat.id)} strategy={verticalListSortingStrategy}>
            {categories.map((cat) => (
              <SortableRoleRow
                key={cat.id}
                id={cat.id}
                name={cat.name}
                roleHierarchyId={cat.roleHierarchyId}
                type="CATEGORY"
                onDelete={() => {
                  // TODO: Implement delete
                  console.log('Delete category', cat.id);
                }}
              >
                {/* DEPARTMENTS - Sortable within each category */}
                {cat.children && cat.children.length > 0 && (
                  <div className="ml-8 mt-3 space-y-2">
                    <SortableContext
                      items={cat.children.map((dept) => dept.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {cat.children.map((dept) => (
                        <SortableRoleRow
                          key={dept.id}
                          id={dept.id}
                          name={dept.name}
                          roleHierarchyId={dept.roleHierarchyId}
                          type="DEPARTMENT"
                          onDelete={() => {
                            // TODO: Implement delete
                            console.log('Delete department', dept.id);
                          }}
                        >
                          {/* FACULTY ROLES - Sortable within each department */}
                          {dept.children && dept.children.length > 0 && (
                            <div className="ml-8 mt-3 space-y-2">
                              <SortableContext
                                items={dept.children.map((faculty) => faculty.id)}
                                strategy={verticalListSortingStrategy}
                              >
                                {dept.children.map((faculty) => (
                                  <SortableRoleRow
                                    key={faculty.id}
                                    id={faculty.id}
                                    name={faculty.name}
                                    roleHierarchyId={faculty.roleHierarchyId}
                                    type="FACULTY"
                                    onDelete={() => {
                                      // TODO: Implement delete
                                      console.log('Delete faculty', faculty.id);
                                    }}
                                  />
                                ))}
                              </SortableContext>
                            </div>
                          )}
                        </SortableRoleRow>
                      ))}
                    </SortableContext>
                  </div>
                )}
                {/* Droppable zone for adding departments to this category */}
                <DroppableZone
                  id={cat.id}
                  type="CATEGORY"
                  className="ml-8 mt-2 min-h-[40px]"
                  isDropAllowed={dropValid}
                >
                  <div className="text-xs text-gray-400 text-center py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 transition-colors">
                    Drop here to add department
                  </div>
                </DroppableZone>
              </SortableRoleRow>
            ))}
          </SortableContext>
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
              defaultValues={{
                category_id: activeCategoryId || undefined,
              }}
              onBack={() => {
                setShowDepartmentForm(false);
                setActiveCategoryId(null);
              }}
              onSubmit={(data) => {
                createDepartmentMutation.mutate(data, {
                  onSuccess: () => {
                    setShowDepartmentForm(false);
                    setActiveCategoryId(null);
                    refetch();
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
