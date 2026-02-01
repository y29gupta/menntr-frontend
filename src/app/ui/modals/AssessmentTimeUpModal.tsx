// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Timer } from 'lucide-react';

// type Props = {
//   open: boolean;
//   redirectSeconds?: number;
// };

// export default function AssessmentTimeUpModal({ open, redirectSeconds = 5 }: Props) {
//   const router = useRouter();
//   const [seconds, setSeconds] = useState(redirectSeconds);

//   useEffect(() => {
//     if (!open) return;

//     setSeconds(redirectSeconds);

//     const interval = setInterval(() => {
//       setSeconds((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           router.replace('/student/assessment');
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [open, redirectSeconds, router]);

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
//       <div className="w-[460px] rounded-2xl bg-white p-6 shadow-xl">
//         {/* Title */}
//         <div className="flex  text-[#1A2C50] justify-center items-center gap-2 mb-4">
//           <Timer size={24} className="text-[#1A2C50]" />
//           <span className="text-xl font-bold text-[#1A2C50]">Your time has ended</span>
//         </div>

//         {/* Content */}
//         <ul className="mb-4 space-y-2 text-sm text-gray-700">
//           <li>• Your assessment time is over.</li>
//           <li>• All your saved answers will now be automatically submitted.</li>
//         </ul>

//         {/* Warning */}
//         <div className="mb-4 flex items-center gap-2 text-sm text-orange-600">
//           <span>⚠</span>
//           <span>You can no longer make changes.</span>
//         </div>

//         {/* Footer */}
//         <div className="border-t pt-3 text-sm text-gray-500">
//           Redirecting to submission screen in {seconds} seconds...
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Frown, Timer } from 'lucide-react';

type ModalMode = 'timeup' | 'cancel';

type Props = {
  open: boolean;
  mode?: ModalMode;
  redirectSeconds?: number;
  onCancelConfirm?: () => void;
  onCancelClose?: () => void;
};

export default function AssessmentTimeUpModal({
  open,
  mode = 'timeup',
  redirectSeconds = 5,
  onCancelConfirm,
  onCancelClose,
}: Props) {
  const router = useRouter();
  const [seconds, setSeconds] = useState(redirectSeconds);

  useEffect(() => {
    if (!open || mode !== 'timeup') return;

    setSeconds(redirectSeconds);

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.replace('/student/assessment');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [open, redirectSeconds, router, mode]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="w-[460px] rounded-2xl bg-white p-6 shadow-xl">
        {/* Title */}
        <div className="flex justify-center items-center gap-2 mb-4 text-[#1A2C50]">
          {mode === 'timeup' ? <Timer size={24} /> : <Frown size={24} />}

          <span className="text-xl font-bold">
            {mode === 'timeup' ? 'Your time has ended' : 'Assessment Not Finished'}
          </span>
        </div>

        {/* Content */}
        <ul className="mb-4 space-y-2 text-sm text-gray-700">
          {mode === 'timeup' ? (
            <>
              <li>• Your assessment time is over.</li>
              <li>• All your saved answers will now be automatically submitted.</li>
            </>
          ) : (
            <>
              <li>• You haven’t completed all the questions yet.</li>
              <li>• If you leave now, your remaining questions will be marked as unanswered.</li>
            </>
          )}
        </ul>

        {/* Warning */}
        <div className="mb-4 flex items-center gap-2 text-sm text-orange-600">
          <span>⚠</span>
          <span>
            {mode === 'timeup'
              ? 'You can no longer make changes.'
              : 'Are you sure you want to exit the assessment?'}
          </span>
        </div>

        {/* Footer */}
        {mode === 'timeup' ? (
          <div className="border-t pt-3 text-sm text-gray-500">
            Redirecting to submission screen in {seconds} seconds...
          </div>
        ) : (
          <div className="border-t pt-4  border-[#C3CAD9] flex justify-center gap-3">
            <button
              onClick={onCancelClose}
              className="px-4 py-2 rounded-[64px] bg-linear-to-r from-[#904BFF] to-[#C053C2] !text-white text-sm"
            >
              Continue Assessment
            </button>

            <button
              onClick={onCancelConfirm}
              className="px-4 py-2 rounded-full border border-[#F44336] !text-[#F44336] text-sm"
            >
              Exit Anyways
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
