import { useMutation } from '@tanstack/react-query';

export function useStudentBulkUpload() {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/students/bulk-upload`,
        { method: 'POST', body: formData, credentials: 'include' }
      );

      if (!res.ok) throw new Error('Upload failed');
      return res.json();
    },
  });
}
