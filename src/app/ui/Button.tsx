'use client';

import React from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';

interface ButtonsProps {
  role?: string | null;
  status?: boolean;
  mode?: 'login' | 'forgot' | 'validate' | 'reset';
}

const Buttons = ({ role, status, mode = 'login' }: ButtonsProps) => {
  if (!role) {
    return <div className="h-[48px] w-[260px]" />;
  }

  const loginLabel =
    role === 'student'
      ? 'Login to Student Portal'
      : role === 'superadmin'
        ? 'Login to Super Admin Portal'
        : 'Login to Admin Portal';

  const label =
    mode === 'forgot'
      ? 'Send link now'
      : mode === 'validate'
        ? 'validate now '
        : mode === 'reset'
          ? 'Reset now'
          : loginLabel;

  return (
    <button
      type="submit"
      disabled={status}
      className="
      rounded-full h-[48px] px-6 !text-white text-[16px] font-medium
      bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
      flex items-center gap-2 hover:opacity-90
      disabled:opacity-50 disabled:cursor-not-allowed transition
      "
    >
      {status ? (
        <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
      ) : (
        <>
          <span>{label}</span>

          <span className="w-[20px] h-[20px] flex items-center justify-center">
            <ArrowUpOutlined className="rotate-45" />
          </span>
        </>
      )}
    </button>
  );
};

export default Buttons;
