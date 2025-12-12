'use client';

import { Card, Button, Divider } from 'antd';
import Image from 'next/image';
import ArrowUpRightIcon from '../icons/ArrowUpRightIcon';

export interface RoleCardProps {
  label: string;
  title: string;
  description: string;
  image: string; // image URL
  buttonText: string;
  gradient?: string; // optional (because sometimes you may not send)
  onClick?: () => void; // optional handler
}

export default function CampusUserCard({
  label,
  title,
  description,
  image,
  buttonText,
  gradient = 'bg-[linear-gradient(90deg,#904BFF_0%,#BD47BF_100%)]',
  onClick,
}: RoleCardProps) {
  return (
    <div className="w-[320px]    flex flex-col items-center mt-10 md:mt-1">
      {/* Top Label Outside Card */}
      <div
        style={{
          padding: '12px 16px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.1)',
          boxShadow: '0px 4px 20px rgba(15, 23, 42, 0.12)',
          marginBottom: '20px',
          fontSize: '16px',
          fontWeight: 500,
          color: 'rgba(15, 23, 42, 1)',
        }}
      >
        {label}
      </div>

      {/* Card */}
      <Card
        style={{
          width: 320,
          height: 'auto',
          borderRadius: 20,
          boxShadow: '0 6px 25px rgba(0,0,0,0.12)',
          textAlign: 'center',
          paddingTop: '10px',
        }}
      >
        {/* Icon */}
        <Image src={image} alt={title} width={90} height={90} style={{ margin: '0 auto' }} />

        {/* Title */}
        <h2 className="mt-3 mb-2 text-[20px] font-semibold">{title}</h2>

        {/* Description */}
        <p className="text-[14px] text-gray-600 px-4 leading-5">{description}</p>

        <Divider />

        {/* Button */}
        <Button
          onClick={onClick}
          type="text"
          className="flex items-center gap-2 text-blue-600 font-medium text-[15px]"
        >
          {buttonText}

          <span className={`inline-flex items-center justify-center p-2 rounded-md ${gradient}`}>
            <ArrowUpRightIcon className="w-3 h-3 text-white" />
          </span>
        </Button>
      </Card>
    </div>
  );
}
