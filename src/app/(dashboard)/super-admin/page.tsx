'use client';

import { useState } from 'react';
// import DashboardOverview from '@/components/super-admin/DashboardOverview';
// import InstitutionForm from '@/components/super-admin/InstitutionForm';
// import { InstitutionFormValues } from '@/lib/institution';
import Dashboard from '@/app/components/dashboards/super-admin/Dashboard';
import OnboardingForm from '@/app/components/dashboards/super-admin/OnboardingForm';
import { InstitutionFormValues } from '@/app/lib/institution';
import { createInstitution } from '@/app/lib/api/institution';

type View = 'dashboard' | 'create' | 'edit';

export default function SuperAdminPage() {
  const [view, setView] = useState<View>('dashboard');
  const [editData, setEditData] = useState<InstitutionFormValues | null>(null);

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
            // console.log('SUBMIT:', data);
            // API call later
            createInstitution(data);
            setView('dashboard');
          }}
        />
      )}
    </div>
  );
}
