import React from 'react';
import { Button } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

interface ButtonsProps {
  role?: string | null;
  status?: boolean;
}

const Buttons = ({ role, status }: ButtonsProps) => {
  if (!role) {
    return <div className="h-[48px] w-[260px]" />;
  }

  const label =
    role === 'student'
      ? 'Login to Student Portal'
      : role === 'superadmin'
        ? 'Login to Super Admin Portal'
        : 'Login to Admin Portal';

  return (
    <Button
      htmlType="submit" // ✅ THIS IS THE FIX
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
      <span className="whitespace-nowrap">{label}</span>

      <span className="w-[20px] h-[20px] flex items-center justify-center">
        <ArrowUpOutlined className="rotate-45" />
      </span>
    </Button>
  );
};

export default Buttons;
