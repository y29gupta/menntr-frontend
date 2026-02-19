'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema, CategoryFormValues } from './category.schema';
import {
  createCategory,
  updateCategory,
  getPrograms,
  createProgram,
  Program,
} from '@/app/lib/institutions.api';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { CreateCategoryPayload } from './category.types';
import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

type Props = {
  mode: 'add' | 'edit';
  defaultValues?: Partial<CategoryFormValues>;
  onCancel: () => void;
  onSubmitSuccess: () => void;
};

export default function CategoryForm({ mode, defaultValues, onCancel, onSubmitSuccess }: Props) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: defaultValues?.name || '',
      code: defaultValues?.code || '',
      programs: defaultValues?.programs || [],
      id: defaultValues?.id,
    },
  });

  const { register, handleSubmit, formState, control, watch, setValue } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'programs',
  });

  const [selectedProgramIds, setSelectedProgramIds] = useState<number[]>([]);
  const [showNewProgramForm, setShowNewProgramForm] = useState(false);
  const [newProgramCode, setNewProgramCode] = useState('');
  const [newProgramName, setNewProgramName] = useState('');

  const queryClient = useQueryClient();

  // Fetch all programs for dropdown
  const { data: allPrograms = [] } = useQuery<Program[]>({
    queryKey: ['programs'],
    queryFn: () => getPrograms(),
  });

  // When editing, if defaultValues has a program, find its ID in allPrograms
  useEffect(() => {
    if (
      mode === 'edit' &&
      defaultValues?.programs &&
      defaultValues.programs.length > 0 &&
      allPrograms.length > 0
    ) {
      const program = defaultValues.programs[0];
      const matchingProgram = allPrograms.find(
        (p) => p.program_code === program.program_code && p.program_name === program.program_name
      );
      if (matchingProgram) {
        setSelectedProgramIds([matchingProgram.id]);
      }
    }
  }, [mode, defaultValues, allPrograms]);

  const createProgramMutation = useMutation({
    mutationFn: createProgram,
    onSuccess: (newProgram) => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      // Replace existing program if any, otherwise add the new program
      if (fields.length > 0) {
        remove(0);
        setSelectedProgramIds([]);
      }
      append({
        program_code: newProgram.program_code,
        program_name: newProgram.program_name,
      });
      setSelectedProgramIds([newProgram.id]);
      setShowNewProgramForm(false);
      setNewProgramCode('');
      setNewProgramName('');
    },
  });

  const handleAddNewProgram = () => {
    if (!newProgramCode.trim() || !newProgramName.trim()) return;

    // If a program already exists, replace it instead of adding
    if (fields.length > 0) {
      remove(0);
      setSelectedProgramIds([]);
    }

    // For now, we'll add it to the form directly
    // In create mode, it will be created when category is created
    // In edit mode, we need category_role_id, so we'll create it immediately
    if (mode === 'edit' && defaultValues?.id) {
      createProgramMutation.mutate({
        category_role_id: Number(defaultValues.id),
        program_code: newProgramCode.trim(),
        program_name: newProgramName.trim(),
      });
    } else {
      // In create mode, just add to form array
      append({
        program_code: newProgramCode.trim(),
        program_name: newProgramName.trim(),
      });
      setShowNewProgramForm(false);
      setNewProgramCode('');
      setNewProgramName('');
    }
  };

  const handleSelectProgram = (programId: number) => {
    const program = allPrograms.find((p) => p.id === programId);
    if (!program) return;

    // If a program already exists, replace it instead of adding
    if (fields.length > 0) {
      remove(0);
      setSelectedProgramIds([]);
    }

    append({
      program_code: program.program_code,
      program_name: program.program_name,
    });
    setSelectedProgramIds([programId]);
  };

  const mutation = useMutation({
    mutationFn: async (payload: CreateCategoryPayload) => {
      if (mode === 'edit' && defaultValues?.id) {
        return updateCategory(defaultValues.id, payload);
      }
      const res = await createCategory(payload);

      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      onSubmitSuccess();
    },
  });

  const onSubmit = (data: CategoryFormValues) => {
    mutation.mutate({
      name: data.name,
      code: data.code,
      programs: data.programs && data.programs.length > 0 ? data.programs : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <div className="flex  px-4 pt-4 flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground"
        >
          <img src="/Go-back.svg" alt="" /> Go back
        </button>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full sm:w-auto  whitespace-nowrap text-xs sm:text-sm !text-white
    bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
    px-6 py-2.5 rounded-full flex items-center justify-center gap-2 font-medium
   "
        >
          {mutation.isPending ? (
            <>
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : mode === 'add' ? (
            '+ Add Category'
          ) : (
            'Save Changes'
          )}
        </button>
      </div>

      {/* Card */}
      <div className="px-4">
        <div className="w-full rounded-2xl border-[#C3CAD9] border bg-background p-4 sm:p-6 flex flex-col gap-6 sm:gap-7">
          {/* Name */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <label className="text-sm sm:text-[16px] text-[#0F172A] font-medium">
              Category Name
            </label>
            <input
              {...register('name')}
              placeholder="Enter Category Name"
              className="w-full border-b py-2 sm:py-2.5 outline-none bg-transparent border-[#C3CAD9]"
            />
            {formState.errors.name && (
              <p className="text-xs text-red-500">{formState.errors.name.message}</p>
            )}
          </div>

          {/* Code */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <label className="text-sm sm:text-[16px] text-[#0F172A] font-medium">
              Category Code
            </label>
            <input
              {...register('code')}
              placeholder="Enter Category Code"
              className="w-full border-b py-2 sm:py-2.5 outline-none bg-transparent border-[#C3CAD9]"
            />
            {formState.errors.code && (
              <p className="text-xs text-red-500">{formState.errors.code.message}</p>
            )}
          </div>

          {/* Program (only one per category) */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <label className="text-sm sm:text-[16px] text-[#0F172A] font-medium">
              Program <span className="text-xs text-gray-500">(Optional - One per category)</span>
            </label>

            {/* Dropdown for existing programs */}
            <div className="flex gap-2">
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleSelectProgram(Number(e.target.value));
                    e.target.value = '';
                  }
                }}
                disabled={fields.length > 0}
                className="flex-1 border-b py-2 sm:py-2.5 outline-none bg-transparent border-[#C3CAD9] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select a program...</option>
                {allPrograms
                  .filter((p) => !selectedProgramIds.includes(p.id))
                  .map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.program_name} ({program.program_code})
                    </option>
                  ))}
              </select>
              <button
                type="button"
                onClick={() => setShowNewProgramForm(!showNewProgramForm)}
                disabled={fields.length > 0}
                className="px-4 py-2 border border-[#C3CAD9] rounded-lg hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
                Add New
              </button>
            </div>

            {/* New Program Form */}
            {showNewProgramForm && (
              <div className="border border-[#C3CAD9] rounded-lg p-4 space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newProgramCode}
                    onChange={(e) => setNewProgramCode(e.target.value)}
                    placeholder="Program Code (e.g., btech)"
                    className="flex-1 border-b py-2 outline-none bg-transparent border-[#C3CAD9]"
                  />
                  <input
                    type="text"
                    value={newProgramName}
                    onChange={(e) => setNewProgramName(e.target.value)}
                    placeholder="Program Name (e.g., B-TECH)"
                    className="flex-1 border-b py-2 outline-none bg-transparent border-[#C3CAD9]"
                  />
                  <button
                    type="button"
                    onClick={handleAddNewProgram}
                    disabled={
                      !newProgramCode.trim() ||
                      !newProgramName.trim() ||
                      createProgramMutation.isPending
                    }
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewProgramForm(false);
                      setNewProgramCode('');
                      setNewProgramName('');
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Selected Program (only one) */}
            {fields.length > 0 && (
              <div className="mt-2">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center justify-between p-3 border border-[#C3CAD9] rounded-lg"
                  >
                    <div className="flex-1">
                      <span className="font-medium">{field.program_name}</span>
                      <span className="text-sm text-gray-500 ml-2">({field.program_code})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        remove(index);
                        // Remove from selectedProgramIds if it was from dropdown
                        const program = allPrograms.find(
                          (p) => p.program_code === field.program_code
                        );
                        if (program) {
                          setSelectedProgramIds([]);
                        }
                      }}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <input type="hidden" {...register(`programs.${index}.program_code`)} />
                    <input type="hidden" {...register(`programs.${index}.program_name`)} />
                  </div>
                ))}
              </div>
            )}

            {formState.errors.programs && (
              <p className="text-xs text-red-500">{formState.errors.programs.message}</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
