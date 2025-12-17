'use client';

import { Role } from '@/app/lib/roles';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import clsx from 'clsx';

type Props = {
  role: Role;
  collapsed: boolean;
  onToggle: () => void;
};

export default function Sidebar({ role, collapsed, onToggle }: Props) {
  return (
    <aside
      className={clsx(
        'h-screen bg-white border-r transition-all duration-300 shrink-0',
        collapsed ? 'w-[72px]' : 'w-[240px]'
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b">
        {!collapsed && (
          <span className="font-bold text-lg text-indigo-600 whitespace-nowrap">Menntr</span>
        )}
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
        />
      </div>
    </aside>
  );
}
