// 'use client';

import { Button } from 'antd';
import Image from 'next/image';
import ArrowUpRightIcon from '../icons/ArrowUpRightIcon';
import Link from 'next/link';

export interface RoleCardProps {
  label: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  gradient?: string;
  // onClick?: () => void;
  redirect: string;
}

export default function CampusUserCard({
  label,
  title,
  description,
  image,
  buttonText,
  gradient = 'bg-[linear-gradient(90deg,#904BFF_0%,#BD47BF_100%)]',
  // onClick,
  redirect,
}: RoleCardProps) {
  return (
    <div className="w-[320px] flex flex-col items-center">
      {/* LABEL */}
      <div className="mb-5 px-4 py-2 rounded-full bg-white/80 shadow-md text-[16px] font-medium text-[#0F172A]">
        {label}
      </div>

      {/* CARD */}
      <div className="w-full rounded-2xl bg-white shadow-lg px-6 pt-6 pb-5 flex flex-col items-center text-center">
        {/* ICON */}
        <div className="w-[90px] h-[90px] flex items-center justify-center">
          <Image src={image} alt={title} width={90} height={90} priority />
        </div>

        <h2 className="mt-4 mb-2 text-[20px] font-semibold leading-[28px]">{title}</h2>

        <p className="text-[14px] text-gray-600 leading-5 min-h-[40px]">{description}</p>

        {/* STATIC DIVIDER (NO ANT-D) */}
        <div className="w-full h-px bg-gray-200 my-4" />

        {/* BUTTON */}
        <Link href={redirect}>
          <Button
            // onClick={onClick}
            type="text"
            className="
            !p-0
            !h-[44px]
            !leading-[44px]
            flex
            items-center
            gap-2
            text-[#3B82F6]
            font-medium
            text-[15px]
          "
          >
            <span className="whitespace-nowrap">{buttonText}</span>

            {/* ICON BOX (fixed size = no shift) */}
            <span
              className={`w-[32px] h-[32px] flex items-center justify-center rounded-md ${gradient}`}
            >
              <ArrowUpRightIcon className="w-3 h-3 text-white" />
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
