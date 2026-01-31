'use client';

import React from 'react';
import { Button } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

interface ButtonsProps {
  role?: string | null;
  status?: boolean;
  label?: string;
  mode?: 'login' | 'forgot' | 'validate' | 'reset';
}

const Buttons = ({ role, status, label, mode = 'login' }: ButtonsProps) => {
  // Used in flows where role is not present (forgot/reset)
  if (!role && !label && mode === 'login') {
    return <div className="h-[48px] w-[260px]" />;
  }

  // Default login label
  const loginLabel =
    role === 'Student'
      ? 'Login to Student Portal'
      : role === 'Super Admin'
        ? 'Login to Super Admin Portal'
        : 'Login to Admin Portal';

  // Mode-based label (his logic)
  const modeLabel =
    mode === 'forgot'
      ? 'Send link now'
      : mode === 'validate'
        ? 'Validate now'
        : mode === 'reset'
          ? 'Reset now'
          : loginLabel;

  const buttonLabel = label ?? modeLabel;

  return (
    <Button
      htmlType="submit"
      loading={status}
      className="
        !rounded-full
        !h-[48px]
        !px-6
        !text-white
        !text-[16px]
        !font-medium
        !bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
        hover:!opacity-90
        flex items-center gap-2
      "
    >
      <span className="whitespace-nowrap">{buttonLabel}</span>

      <span className="w-[20px] h-[20px] flex items-center justify-center">
        <ArrowUpOutlined className="rotate-45" />
      </span>
    </Button>
  );
};

export default Buttons;
