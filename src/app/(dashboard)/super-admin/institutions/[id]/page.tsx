'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import OnboardingForm from '@/app/components/dashboards/super-admin/OnboardingForm';
import { institutionsApi, updateInstitution } from '@/app/lib/institutions.api';
import { InstitutionFormValues } from '@/app/lib/institution';

export default function EditInstitutionPage() {
  const params = useParams();
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
  const institutionId = Number(idParam);
  const router = useRouter();
  const queryClient = useQueryClient();

  if (Number.isNaN(institutionId)) {
    return <p>Invalid institution id</p>;
  }

  // ✅ Correct API call
  const { data, isLoading } = useQuery({
    queryKey: ['institution', institutionId],
    queryFn: () => institutionsApi.getById(institutionId),
    enabled: !!institutionId,
  });


  const updateMutation = useMutation({
    mutationFn: (formData: InstitutionFormValues) =>
      updateInstitution(Number(institutionId), formData),

    onSuccess: (updatedInstitution) => {
      queryClient.setQueryData(['institution', Number(institutionId)], updatedInstitution);

      queryClient.invalidateQueries({ queryKey: ['institutions'] });

      router.push('/super-admin');
    },
  });


  if (isLoading || !data) {
    return <p>Loading...</p>;
  }

  // ✅ data IS the institution
  const institution = data;

  return (
    <OnboardingForm
      mode="edit"
      defaultValues={{
        name: institution.name,
        code: institution.code,
        subdomain: institution.subdomain ?? '',
        contact_email: institution.contact_email,
        plan_id: institution.plan?.code?.toUpperCase(),
      }}
      onCancel={() => router.push('/super-admin')}
      onSubmitForm={(formData) => updateMutation.mutate(formData)}
    />
  );
}
