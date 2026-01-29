import RobotClient from '@/app/components/RobotClient';
import Timer from './Timer';

export default function AssessmentHeader() {
  return (
    <div className="bg-[#F7F6FB] flex items-center justify-between  w-full py-4">
      {/* <RobotClient /> */}
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6">
        <div className="text-center w-full">
          <h1 className="text-base font-semibold text-gray-900">Practice Test – Round 2</h1>
          <p className="text-sm text-gray-500 mt-1">Python</p>
        </div>
      </div>
      <div className="">
        <Timer />
      </div>
    </div>
  );
}
