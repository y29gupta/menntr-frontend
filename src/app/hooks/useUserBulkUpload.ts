import { useMutation } from '@tanstack/react-query';

export function useUserBulkUpload() {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      formData.append('institutionId', '1');
      formData.append('createdBy', '36');
      const res = await fetch(`/api/users/bulk-upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Bulk upload failed');
      }

      return res.json();
    },
  });
}
