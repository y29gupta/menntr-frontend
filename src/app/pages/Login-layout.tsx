import React from 'react';
import Loginform from '../ui/Loginform';

const LoginLayout = () => {
  return (
    <div className="mx-40 bg-white min-h-[100vh]">
      <div className="flex items-center justify-between mx-7 mb-[-70px] mr-20">
        <div className="flex  gap-2 ">
          <img src={'Go-back.svg'} alt="Loading" />
          <p className="text-slate-900 text-[16px] pt-4">Go back</p>
        </div>
        <div className="relative  max-w-lg rounded-full border border-[#E5E7EB] bg-white shadow-sm px-2 py-1 ">
          <div className=" absolute top-5 left-85 z-10">
            <img src="/vector.png" alt="" />
          </div>
          <input
            type="text"
            placeholder="I want to level up my skills"
            className="  bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
          <button className="px-4 py-1 rounded-full text-xs font-medium !text-[#3B82F6] bg-[linear-gradient(90deg,#F8FBFF_0%,#EEEBFF_100%)] shadow-sm hover:opacity-90 transition z-0">
            Exactly. Let’s begin
          </button>
        </div>
      </div>
      <Loginform />
    </div>
  );
};

export default LoginLayout;
