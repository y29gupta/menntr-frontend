import { useRouter } from 'next/navigation';

export function SuccessModal({
  assessmentName,
  onClose,
}: {
  assessmentName: string;
  onClose: () => void;
}) {
  const router = useRouter();

  const handleRedirect = () => {
    // router.replace('/admin/assessment');
    // router.refresh();
    // onClose();
    window.location.href = '/admin/assessment';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={handleRedirect}>
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative w-[420px] rounded-xl bg-white p-8 text-center shadow-lg">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E6F4EA]">
          <svg
            className="h-7 w-7 text-[#2E7D32]"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 className="mt-4 text-[18px] font-semibold text-[#101828]">
          Assessment successfully Published
        </h3>

        <p className="mt-1 text-[14px] text-[#667085]">{assessmentName}</p>
      </div>
    </div>
  );
}
