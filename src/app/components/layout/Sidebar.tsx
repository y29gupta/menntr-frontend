'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { SIDEBAR_CONFIG } from '@/app/lib/sidebar.config';
import { Role, ROLE_TO_SIDEBAR_KEY } from '@/app/lib/roles';
import CollapseIcon from '../icons/CollapseIcon';
import ExpandMenuIcon from '../icons/ExpandMenuIcon';
import MenntrCollapsedIcon from '../icons/MenntrCollapsedIcon';

type SidebarItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
  disabled?: boolean;
};

type Props = {
  role: Role | null;
  collapsed: boolean;
  onToggle: () => void;
};

export default function Sidebar({ role, collapsed, onToggle }: Props) {
  const pathname = usePathname();

  const sidebarKey = role ? ROLE_TO_SIDEBAR_KEY[role] : undefined;
  const menu: readonly SidebarItem[] = sidebarKey ? (SIDEBAR_CONFIG[sidebarKey] ?? []) : [];

  // split items
  const activeItems = menu.filter((item) => !item.disabled);
  const upcomingItems = menu.filter((item) => item.disabled);

  return (
    <aside
      className={clsx(
        `
        h-screen bg-white
        shadow-[0px_8px_16px_0px_rgba(26,44,80,0.2)]
        z-50 fixed inset-y-0 left-0
        transition-transform duration-300 ease-in-out
        md:static md:transition-all
        `,
        collapsed ? 'w-[72px] relative' : 'w-[300px]'
      )}
    >
      {/* Logo */}
      <div className={clsx('pt-[30px] relative', !collapsed && 'px-4 pb-6')}>
        {!collapsed ? (
          <div>
            <img src="/assets/menntrLogo.svg" alt="menntrLogo" className="mb-1" />
            <p className="text-xs text-gray-500 mb-6">Smarter Campus Management for Everyone</p>
            <div className="h-[1px] bg-[#DBE3E9]" />
          </div>
        ) : (
          <div className="pb-6">
            <div className="flex justify-center mb-6">
              <MenntrCollapsedIcon />
            </div>
            <div className="h-[1px] bg-[#DBE3E9] mx-4" />
          </div>
        )}

        <button onClick={onToggle} className="absolute right-[-30px] top-[50px]">
          {collapsed ? <ExpandMenuIcon /> : <CollapseIcon />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2 px-3 mt-4">
        {/* ACTIVE ITEMS */}
        {activeItems.map((item) => {
          const basePath = item.path.split('?')[0];

          const active =
            basePath === '/super-admin'
              ? pathname === '/super-admin'
              : pathname === basePath || pathname.startsWith(basePath + '/');

          return (
            <Link
              key={item.path}
              href={item.path}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition',
                active ? 'bg-[#FFEEFF] text-[#7B3AEC]' : 'text-slate-600 hover:bg-slate-100',
                collapsed && 'justify-center'
              )}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        {/* UPCOMING HEADING */}
        {upcomingItems.length > 0 && !collapsed && (
          <div className="mt-4 px-4 text-xs font-semibold text-orange-500 uppercase">
            Upcoming features
          </div>
        )}

        {/* UPCOMING ITEMS */}
        {upcomingItems.map((item) => (
          <div
            key={item.path}
            className={clsx(
              'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium',
              'opacity-40 cursor-not-allowed text-slate-600',
              collapsed && 'justify-center'
            )}
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </div>
        ))}
      </nav>
    </aside>
  );
}
