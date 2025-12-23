'use client';

import Image from 'next/image';
import HelpSupportIcon from '../icons/HelpSupportIcon';

export default function Navbar() {
  return (
    // <div className="w-full max-w-301.5 border ">
    <header className="w-full">
      <nav
        className="
          w-full
          flex
          items-center
          justify-between
          pt-4
          md:pt-7     
          bg-white
        "
      >
        {/* LEFT */}
        <div className="flex flex-col  gap-1">
          <Image
            src="/assets/menntrLogo.svg"
            width={84}
            height={25}
            alt="Menntr Logo"
            className="object-contain"
            priority
          />

          {/* Hide tagline on very small screens */}
          <p className=" sm:block text-sm leading-5 text-gray-500">
            Smarter Campus Management for Everyone.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex md:flex-row flex-col  items-center  gap-2 cursor-pointer">
          <HelpSupportIcon />
          <span className="text-xs md:text-sm leading-5 font-medium text-gray-700">
            Help & Support
          </span>
        </div>
      </nav>
    </header>
    // </div>
  );
}
