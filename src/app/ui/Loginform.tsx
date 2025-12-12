import { Flex, Input } from 'antd';
import Password from 'antd/es/input/Password';
import Buttons from './Button';

const Loginform = ({ role }: { role: string }) => {
  let imageSrc = '/assets/Admin.png';

  if (role === 'student') imageSrc = '/assets/HappyStudent.png';
  if (role === 'superadmin') imageSrc = '/assets/superadmin.png';

  // const imageSrc = role === 'student' ? '/assets/HappyStudent.png' : '/assets/Admin.png';

  return (
    <>
      <div className=" bg-white w-full mx-auto flex flex-col justify-center items-center min-h-auto ">
        <div
          className={`flex   w-full items-center ${role == 'superadmin' ? 'justify-end' : 'justify-between'}  gap-20  `}
        >
          {role !== 'superadmin' && (
            <div className="flex  gap-2 ">
              <img src={'Go-back.svg'} alt="Loading" />
              <p className="text-slate-900 text-[16px] pt-4">Go back</p>
            </div>
          )}

          <div className="relative mr-40  max-w-lg rounded-full border border-[#E5E7EB] bg-white shadow-sm px-2 py-1 ">
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

        <div className="flex w-full  px-10 bg-white items-center justify-between">
          <div className=" flex gap-5   bg-white min-h-auto  ">
            <div className="w-4px max-h-[100vh] bg-[#3B82F6] text-[#3B82F6]">|</div>
            <div>
              <div className="flex items-center gap-7 bg-white max-w-xs mb-8 border-0 rounded-4xl px-5 shadow-[0px_0px_24px_0px_#0F172A40]">
                <img src={'vector.svg'} alt="loading" />
                <p className="text-[#0F172A] text-[20px] font-semibold pt-4">
                  {role === 'student'
                    ? 'Student Login'
                    : role === 'superadmin'
                      ? 'Super Admin Login'
                      : 'Admin Login'}
                </p>
              </div>

              <div className="space-y-6 bg-white p-8 rounded-2xl w-full min-w-lg mx-auto transition-all duration-300 shadow-[0px_0px_16px_0px_#0F172A26] hover:shadow-[0px_0px_24px_0px_#0F172A40] hover:-translate-y-1">
                <p className="text-[#1A2C50] text-[16px] font-semibold text-center">
                  {role === 'student'
                    ? 'Enter your student login details'
                    : role === 'superadmin'
                      ? 'Enter your super admin login details'
                      : 'Enter your admin login details'}
                </p>

                <Flex vertical gap={18}>
                  <Input
                    placeholder="Email"
                    variant="underlined"
                    className="!placeholder-[#636771]"
                  />
                  <Password
                    placeholder="Password"
                    variant="underlined"
                    className="!placeholder-[#636771]"
                  />
                </Flex>

                <div className="pt-8 flex justify-center">
                  <Buttons role={role} />
                </div>
              </div>
            </div>
          </div>
          <div className=" ">
            <img src={imageSrc} alt="Loading" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginform;
