'use client';

import { useState } from 'react';
import Logout from '../Logout';
import LogoutModal from './LogoutModal';

interface ProfileDropdownProps {
  onResetPassword: () => void;
  onLogout: () => void;
}

export default function ProfileDropdown({ onResetPassword, onLogout }: ProfileDropdownProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="absolute top-14 right-0 w-75 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
        <div className="px-6 py-2 border-b border-gray-200">
          <h3 className="text-gray-900 font-semibold text-base">Micheal keaton</h3>
          <p className="text-gray-500 text-sm">michealkeaton54@phathaxiom.com</p>
        </div>

        <div className="p-4 flex items-center justify-between">
          <button
            onClick={onResetPassword}
            className="px-3 py-1.5 text-gray-700 font-medium rounded-md border border-gray-300 hover:bg-gray-50 transition-colors text-sm"
          >
            Reset Password
          </button>

          <Logout onClick={() => setIsModalOpen(true)} />
        </div>
      </div>

      <LogoutModal
        open={isModalOpen}
        onConfirm={() => {
          onLogout();
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
}
