'use client';

import LogoutIcon from '@/app/components/icons/LogoutIcon';

interface LogoutModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutModal({ open, onConfirm, onCancel }: LogoutModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
      <div className="bg-white rounded-2xl shadow-lg w-[496px] p-7 space-y-5">
        <div className="flex items-center justify-start gap-2 text-xl font-semibold text-gray-900">
          <LogoutIcon color="#0F172A" />
          <span>Log out</span>
        </div>

        <p className="text-[#3D465C] text-[16px]">
          Are you sure you want to <span className="font-semibold">log out</span> of Super admin?
        </p>

        <p className="text-[#B36344] text-16px font-semibold">
          You’re about to log out from the Super Admin account.
        </p>

        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={onConfirm}
            className="!text-white px-6 py-2 rounded-full font-medium text-sm bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]"
          >
            Yes, Log out
          </button>

          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-full text-gray-700 border border-gray-300 font-medium text-sm"
          >
            No, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
