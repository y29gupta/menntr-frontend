'use client';

import dynamic from 'next/dynamic';

const RobotCard = dynamic(() => import('@/app/ui/RobotCard'), {
  ssr: false,
});

export default function RobotClient() {
  return <RobotCard />;
}
