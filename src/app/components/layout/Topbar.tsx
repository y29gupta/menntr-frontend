'use client';

import Image from 'next/image';
import HelpSupportIcon from '../icons/HelpSupportIcon';

export default function Navbar() {
  return (
    <header className="w-full">
      <nav className="w-full flex items-center justify-between  py-4 bg-white">
        {/* LEFT SECTION */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 ">
            <Image
              src="/menntrLogo.svg"
              width={100}
              height={40}
              alt="Logo"
              className="object-contain"
            />
          </div>

          <p className="text-gray-500 text-sm">Smarter Campus Management for Everyone.</p>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2 cursor-pointer">
          <HelpSupportIcon />
          <span className="text-gray-700 font-medium">Help & Support</span>
        </div>
      </nav>
    </header>
  );
}
