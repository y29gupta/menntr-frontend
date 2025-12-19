'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { SIDEBAR_CONFIG } from '@/app/lib/sidebar.config';
import { Role } from '@/app/lib/roles';
import CollapseIcon from '../icons/CollapseIcon';
import ExpandMenuIcon from '../icons/ExpandMenuIcon';
import MenntrCollapsedIcon from '../icons/MenntrCollapsedIcon';

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
    <>
      <aside
        className={clsx(
          'h-screen bg-white shadow-[0px_8px_16px_0px_rgba(26,44,80,0.2)] transition-all duration-300 shrink-0 relative z-100  ',
          collapsed ? 'w-[72px]' : 'w-[300px]'
        )}
      >
        {/* Logo Section */}
        <div className={clsx('pt-[30px]', !collapsed && 'px-4 pb-6')}>
          {!collapsed && (
            <div>
              <img src="/assets/menntrLogo.svg" alt="menntrLogo" className="mb-1" />
              <p className="text-xs text-gray-500 mb-6">Smarter Campus Management for Everyone</p>
              {/* Divider */}
              <div className="h-[1px] bg-[#DBE3E9]" />
            </div>
          )}

          {collapsed && (
            <div className="pb-6">
              <div className="flex justify-center mb-6">
                <MenntrCollapsedIcon />
              </div>
              <div className="h-[1px] bg-[#DBE3E9] mx-4" />
            </div>
          )}

          {/* Single toggle button with dynamic positioning */}
          <button onClick={onToggle} className={clsx('absolute right-[-30px] top-[50px]')}>
            {collapsed ? <ExpandMenuIcon /> : <CollapseIcon />}
          </button>
        </div>

        {/* Menu */}
        <nav className={clsx('flex flex-col gap-2 px-3 mt-4')}>
          {menu.map((item: SidebarItem) => {
            const active = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition',
                  active ? 'bg-[#3B82F6] text-white' : 'text-slate-600 hover:bg-slate-100',
                  collapsed && 'justify-center'
                )}
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
