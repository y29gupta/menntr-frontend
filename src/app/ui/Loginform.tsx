'use client';
import { useRouter } from 'next/navigation';
import Buttons from './Button';

const Loginform = ({ role }: { role: string }) => {
  const navigate = useRouter();
  let imageSrc = '/assets/Admin.png';

  if (role === 'student') imageSrc = '/assets/HappyStudent.png';
  if (role === 'superadmin') imageSrc = '/assets/superadmin.png';

  return (
    <>
      <div className="bg-white w-full mx-auto flex flex-col justify-center items-start min-h-auto px-4 sm:px-6 lg:px-8 z-10 pb-4">
        <div className={`flex flex-col w-full`}>
          <div className="w-full flex justify-start sm:justify-end sm:pr-10 md:pr-20 lg:pr-40 mb-4 lg:mb-0">
            <div className="relative max-w-full sm:max-w-lg rounded-full border border-[#E5E7EB] bg-white shadow-sm px-2 py-2">
              <div className="hidden sm:block absolute top-4.5 left-70">
                <img src="/assets/cursorIcon.png" alt="" className="w-[19px] h-6" />
              </div>
              <span className="text-gray-700 text-sm sm:text-base pr-2">
                I want to level up my skills
              </span>
              <span
                className="px-2 sm:px-4 py-1 rounded-full text-xs font-medium text-[#3B82F6]
                  bg-[linear-gradient(90deg,#F8FBFF_0%,#EEEBFF_100%)]
                shadow-sm ml-1 sm:ml-0"
              >
                Exactly. Let's begin
              </span>
            </div>
          </div>
          {role !== 'superadmin' && (
            <div
              className="flex gap-2 mb-6 cursor-pointer hover:opacity-80 transition-opacity w-fit"
              onClick={() => navigate.push('/')}
            >
              <img src={'Go-back.svg'} alt="Loading" />
              <p className="text-slate-900 text-[14px] sm:text-[16px] pt-4">Go back</p>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row w-full bg-white items-start justify-between max-w-[1206px] gap-8 lg:gap-0">
          <div className="flex gap-3 sm:gap-5 bg-white min-h-auto w-full lg:w-auto">
            <div className="w-4px max-h-[100vh] bg-[#3B82F6] text-[#3B82F6]">|</div>
            <div className="flex-1 lg:flex-none">
              <div className="flex items-center gap-4 sm:gap-7 bg-white max-w-xs mb-6 sm:mb-8 rounded-3xl px-4 sm:px-5 shadow-[0px_0px_24px_0px_#0F172A40]">
                <img src={'vector.svg'} alt="loading" className="sm:w-auto sm:h-auto" />
                <p className="text-[#0F172A] text-[16px] sm:text-[20px] font-semibold pt-4">
                  {role === 'student'
                    ? 'Student Login'
                    : role === 'superadmin'
                      ? 'Super Admin Login'
                      : 'Admin Login'}
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // handle form submission
                }}
                className="space-y-4 sm:space-y-6 bg-white p-4 sm:p-6 lg:p-8 rounded-2xl w-full min-w-full sm:min-w-lg mx-auto transition-all duration-300 shadow-[0px_0px_16px_0px_#0F172A26]"
              >
                <p className="text-[#1A2C50] text-[14px] sm:text-[16px] font-semibold text-center">
                  {role === 'student'
                    ? 'Enter your student login details'
                    : role === 'superadmin'
                      ? 'Enter your super admin login details'
                      : 'Enter your admin login details'}
                </p>

                <div className="flex flex-col gap-4 sm:gap-5">
                  {role !== 'superadmin' && (
                    <div className="w-full">
                      <input
                        type="text"
                        name="institutionCode"
                        placeholder="Institution Code"
                        className="w-full border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-800 placeholder-[#636771] py-2 outline-none text-sm sm:text-base"
                      />
                    </div>
                  )}

                  <div className="w-full">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-800 placeholder-[#636771] py-2 outline-none text-sm sm:text-base"
                    />
                  </div>

                  <div className="w-full relative">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="w-full border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-800 placeholder-[#636771] py-2 outline-none text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <Buttons role={role} />
                </div>
              </form>
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              src={imageSrc}
              alt="Loading"
              className="w-[370px] h-[400px] xl:w-[400px] xl:h-[400px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginform;
