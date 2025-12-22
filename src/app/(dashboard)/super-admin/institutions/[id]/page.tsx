'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import OnboardingForm from '@/app/components/dashboards/super-admin/OnboardingForm';
import { fetchInstitutions, mapInstitutions, updateInstitution } from '@/app/lib/institutions.api';
import { InstitutionFormValues } from '@/app/lib/institution';

// import { updateInstitution } from '@/app/lib/api/institution';

export default function EditInstitutionPage() {
  // const { id } = useParams();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['institutions'],
    queryFn: fetchInstitutions,
  });

  if (isLoading || !data) {
    return <p>Loading...</p>;
  }

  const institutions = mapInstitutions(data?.data ?? []);

  const institution = institutions.find((inst) => String(inst.id) === id);

  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: (formData: InstitutionFormValues) => updateInstitution(id!, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['institutions'] });
      router.push('/super-admin');
    },
  });

  if (!institution) return <p>Institution not found</p>;

  return (
    <OnboardingForm
      mode="edit"
      defaultValues={{
        name: institution.name,
        code: institution.code,
        contactEmail: 'y@gmail.com',
        plan: institution.plan === 'Premium' ? 'PREMIUM' : 'BASIC',
      }}
      onCancel={() => router.push('/super-admin')}
      onSubmitForm={(formData) => updateMutation.mutate(formData)}
    />
  );
}
