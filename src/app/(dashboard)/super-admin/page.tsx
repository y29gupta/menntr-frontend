import React from 'react';
import Image from 'next/image';

const page = () => {
  return (
    <div>
      <div>
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
      </div>
    </div>
  );
};

export default page;
