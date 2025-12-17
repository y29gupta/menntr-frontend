'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

type menuItem = {
  label: string;
  path: string;
  icon: React.ElementType;
};

const Sidebar = ({ data }: { data: menuItem[] }) => {
  const pathname = usePathname();
  return (
    <div className=" flex flex-col items-center px-[16px] py-[30px] max-w-[300px] max-h-[100vh] shadow-[0px_8px_16px_0px_#1A2C501A]">
      <div
        className="flex flex-col gap-1 max-w-[208px] relative
                  after:content-['']
                  after:block
                  after:w-full
                  after:h-[1px]
                  after:bg-[#DBE3E9]"
      >
        <Image
          src="/assets/menntrLogo.svg"
          width={84}
          height={25}
          alt="Menntr Logo"
          className="object-contain"
          priority
        />

        <p className="sm:block text-[10px] leading-5 text-gray-500">
          Smarter Campus Management for Everyone.
        </p>
      </div>

      <div className="w-64 flex flex-col gap-2 mt-3">
        {data.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg
            ${isActive ? 'bg-blue-500 text-white' : 'text-slate-600'}
          `}
            >
              <Icon />
              <span className="text-[16px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
