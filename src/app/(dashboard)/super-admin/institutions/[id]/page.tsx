'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import OnboardingForm from '@/app/components/dashboards/super-admin/OnboardingForm';
import { fetchInstitutions, mapInstitutions, updateInstitution } from '@/app/lib/institutions.api';
import { InstitutionFormValues } from '@/app/lib/institution';

export default function EditInstitutionPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['institutions'],
    queryFn: fetchInstitutions,
  });

  const updateMutation = useMutation({
    mutationFn: (formData: InstitutionFormValues) => updateInstitution(id!, formData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['institutions'] });
      router.push('/super-admin');
    },
  });

  if (isLoading || !data) {
    return <p>Loading...</p>;
  }

  const institutions = mapInstitutions(data?.data ?? []);

  const institution = institutions.find((inst) => String(inst.id) === id);

  console.log(institution, id, 'insti');

  if (!institution) return <p>Institution not found</p>;

  return (
    <OnboardingForm
      mode="edit"
      defaultValues={{
        name: institution.name,
        code: institution.code,
        contactEmail: institution.contactEmail,
        plan: institution.plan === 'Premium' ? 'PREMIUM' : 'BASIC',
      }}
      onCancel={() => router.push('/super-admin')}
      onSubmitForm={(formData) => updateMutation.mutate(formData)}
    />
  );
}
