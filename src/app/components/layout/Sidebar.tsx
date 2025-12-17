'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { SIDEBAR_CONFIG } from '@/app/lib/sidebar.config';
import { Role } from '@/app/lib/roles';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import CollapseIcon from '../icons/CollapseIcon';
import ExpandMenuIcon from '../icons/ExpandMenuIcon';
type SidebarRole = keyof typeof SIDEBAR_CONFIG;
type SidebarItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

type Props = {
  role: Role;
  collapsed: boolean;
  onToggle: () => void;
};

export default function Sidebar({ role, collapsed, onToggle }: Props) {
  const pathname = usePathname();
  const menu: readonly SidebarItem[] = SIDEBAR_CONFIG[role as SidebarRole] ?? [];

  return (
    <aside
      className={clsx(
        'h-screen bg-white  shadow-[0px_8px_16px_0px_rgba(26,44,80,0.2)] transition-all duration-300 shrink-0',
        collapsed ? 'w-[72px]' : 'w-[300px]'
      )}
    >
      {/* Logo Section */}
      <div className="px-4 pt-[30px] pb-6 flex items-center justify-between">
        {!collapsed && (
          <div>
            {/* <p className="font-bold text-lg text-[#1A2C50]"></p> */}
            <img src="/assets/menntrLogo.svg" alt="menntrLogo" />
            <p className="text-xs text-gray-500">Smarter Campus Management</p>
          </div>
        )}

        <button onClick={onToggle} className="text-gray-600 ">
          {collapsed ? <ExpandMenuIcon /> : <CollapseIcon />}
        </button>
      </div>

      {/* Divider */}
      <div className="mx-4 h-[1px] bg-[#DBE3E9]" />

      {/* Menu */}
      <nav className="mt-4 flex flex-col gap-2 px-3">
        {menu.map((item: SidebarItem) => {
          const active = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition',
                active ? 'bg-[#3B82F6] text-white' : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
