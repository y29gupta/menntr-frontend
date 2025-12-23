'use client';

import Image from 'next/image';

export default function RobotCard() {
  return (
    <div
      className="
        inline-flex
        items-center
        gap-[10px]
        p-2
        
       
      "
    >
      {/* Reserve exact space → NO CLS */}
      <div className="w-[138px] h-[206px] flex items-center justify-center">
        <Image src="/assets/roboIcon.png" alt="Assistant Robot" width={138} height={206} priority />
      </div>
    </div>
  );
}
