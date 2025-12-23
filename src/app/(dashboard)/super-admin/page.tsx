'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Dashboard from '@/app/components/dashboards/super-admin/Dashboard';
import OnboardingForm from '@/app/components/dashboards/super-admin/OnboardingForm';
import { InstitutionFormValues } from '@/app/lib/institution';
import { createInstitution } from '@/app/lib/api/institution';

type View = 'dashboard' | 'create' | 'edit';

export default function SuperAdminPage() {
  const [view, setView] = useState<View>('dashboard');
  const [editData, setEditData] = useState<InstitutionFormValues | null>(null);

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createInstitution,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['institutions'] });
      setView('dashboard');
    },
    onError: (err) => {
      console.error('Create institution failed', err);
    },
  });

  return (
    <div className="w-full">
      {view === 'dashboard' && (
        <Dashboard
          onCreateInstitution={() => {
            setEditData(null);
            setView('create');
          }}
          onEditInstitution={(row) => {
            setEditData(row);
            setView('edit');
          }}
        />
      )}

      {(view === 'create' || view === 'edit') && (
        <OnboardingForm
          mode={view}
          defaultValues={editData ?? undefined}
          onCancel={() => setView('dashboard')}
          onSubmitForm={(data) => {
            createMutation.mutate(data);
            setView('dashboard');
          }}
        />
      )}
    </div>
  );
}
