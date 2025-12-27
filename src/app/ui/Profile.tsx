// Profile.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import ProfileDropdown from './modals/ProfileDropdownModal';
import { logout } from '../lib/loginService';
import { usePathname, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();
  const queryclient = useQueryClient();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResetPassword = () => {
    alert('Reset Password clicked');
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      const res = await logout();
      queryclient.clear();
      router.replace(`/`);
    } catch (error) {
      console.log(error, 'logout failed');
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center !text-white font-semibold text-sm shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
      >
        MK
      </button>

      {isOpen && <ProfileDropdown onResetPassword={handleResetPassword} onLogout={handleLogout} />}
    </div>
  );
}
