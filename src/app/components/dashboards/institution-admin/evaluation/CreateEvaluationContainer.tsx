'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ZodObject, z } from 'zod';

import Stepper from '../assessment/create/Stepper';
import { CreateEvaluationApi } from './types';

interface Props<TSchema extends ZodObject<any>> {
  config: {
    entityLabel: string;
    basePath: string;
    schema: TSchema;
    api: CreateEvaluationApi;
    buildCreatePayload: (values: z.infer<TSchema>) => any;
    buildUpdatePayload?: (values: z.infer<TSchema>) => any;
    stepOneFields: (keyof z.infer<TSchema>)[];
    stepTwoFields?: (keyof z.infer<TSchema>)[];
    allowedQuestionTypes: string[];
  };
  mode?: 'create' | 'edit';
  editId?: string;
  Steps: {
    StepOne: React.ComponentType<any>;
    StepTwo: React.ComponentType<any>;
    StepThree: React.ComponentType<any>;
    StepFour: React.ComponentType<any>;
  };
}

export default function CreateEvaluationContainer<TSchema extends ZodObject<any>>({
  config,
  mode = 'create',
  editId,
  Steps,
}: Props<TSchema>) {
  const {
    entityLabel,
    basePath,
    schema,
    api,
    buildCreatePayload,
    buildUpdatePayload,
    stepOneFields,
  } = config;

  const router = useRouter();
  const [step, setStep] = useState(1);
  const [entityId, setEntityId] = useState<string>('');

  const isEdit = mode === 'edit' && !!editId;

  type FormValues = z.infer<TSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema) as any,
    mode: 'onChange',
  });

  // -------------------------
  // FETCH EDIT DATA
  // -------------------------

  const { data: editData } = useQuery({
    queryKey: ['edit-entity', editId],
    queryFn: () => api.getById!(editId!),
    enabled: isEdit && !!api.getById,
  });

  // -------------------------
  // HYDRATE FORM
  // -------------------------

  useEffect(() => {
    if (!editData) return;

    Object.keys(editData).forEach((key) => {
      form.setValue(key as any, editData[key], {
        shouldDirty: false,
      });
    });

    setEntityId(editData.id);
  }, [editData]);

  // -------------------------
  // MUTATIONS
  // -------------------------

  const createMutation = useMutation({
    mutationFn: api.create,
  });

  const updateMutation = useMutation({
    mutationFn: (payload: any) => api.update!(editId!, payload),
  });

  // -------------------------
  // HANDLERS
  // -------------------------

  const handleCancel = () => {
    router.replace(`${basePath}?tab=active`);
  };

  const handleStepOneNext = async () => {
    const isValid = await form.trigger(stepOneFields as any);
    if (!isValid) return;

    const values = form.getValues();

    if (isEdit) {
      if (!buildUpdatePayload) return;

      const payload = buildUpdatePayload(values);
      await updateMutation.mutateAsync(payload);

      setStep(2);
      return;
    }

    const payload = buildCreatePayload(values);
    const res = await createMutation.mutateAsync(payload);

    setEntityId(res.id);
    // setEntityId('10');
    setStep(2);
  };

  const handleStepTwoNext = async () => {
    if (!config.stepTwoFields) {
      setStep(3);
      return;
    }

    const isValid = await form.trigger(config.stepTwoFields as any);

    if (!isValid) return;

    if (api.updateAudience) {
      const batches = form.getValues(
        config.stepTwoFields.find((field) => field === 'batches') as any
      ) as string[];

      await api.updateAudience(entityId, batches?.map((id) => Number(id)) ?? []);
    }

    setStep(3);
  };

  const { StepOne, StepTwo, StepThree, StepFour } = Steps;

  return (
    <div className="w-full h-full bg-white p-4 rounded-2xl shadow">
      <h2 className="text-xl font-semibold">
        {isEdit ? 'Edit' : 'Create'} {entityLabel}
      </h2>
      <p className="text-sm text-gray-500">Set up your {entityLabel}</p>

      <Stepper step={step} />

      {step === 1 && <StepOne form={form} onNext={handleStepOneNext} onCancel={handleCancel} />}

      {step === 2 && (
        <StepTwo
          form={form}
          entityId={entityId}
          onBack={() => setStep(1)}
          onNext={handleStepTwoNext}
          onCancel={handleCancel}
        />
      )}

      {step === 3 && (
        <StepThree
          entityId={entityId}
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
          onCancel={handleCancel}
          allowedQuestionTypes={config.allowedQuestionTypes}
        />
      )}

      {step === 4 && (
        <StepFour entityId={entityId} onBack={() => setStep(3)} onCancel={handleCancel} />
      )}
    </div>
  );
}
