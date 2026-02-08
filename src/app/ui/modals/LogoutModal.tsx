'use client';

import LogoutIcon from '@/app/components/icons/LogoutIcon';
import ConfirmModal from './ConfirmModal';
import { useParams, usePathname } from 'next/navigation';

interface LogoutModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutModal({ open, onConfirm, onCancel }: LogoutModalProps) {
  if (!open) return null;
  const params = usePathname();
  console.log(params.split('/')[1], 'params');
  const role = params.split('/')[1];

  return (
    <ConfirmModal
      open={open}
      title="Log out"
      icon={<LogoutIcon color="#0F172A" />}
      description={
        <>
          Are you sure you want to <span className="font-semibold">log out</span> of {role}?
        </>
      }
      warning={`You’re about to log out from the ${role} account.`}
      confirmText="Yes, Log out"
      cancelText="No, Cancel"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
