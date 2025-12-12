import { Flex, Input } from 'antd';
import Password from 'antd/es/input/Password';
import Buttons from './Button';

const Loginform = () => {
  return (
    <div className="flex bg-white items-center justify-evenly">
      <div className=" flex gap-5  bg-white min-h-auto  ">
        <div className="w-4px max-h-[100vh] bg-[#3B82F6] text-[#3B82F6]">|</div>
        <div>
          <div className="flex items-center gap-7 bg-white max-w-xs mb-8 border rounded-3xl px-5 shadow-[0px_0px_24px_0px_#0F172A40]">
            <img src={'Vector.svg'} alt="loading" />
            <p className="text-[#0F172A] text-[20px] font-semibold pt-4 ">Super Admin Portal</p>
          </div>
          <div className="space-y-6 bg-white p-8 rounded-2xl w-full min-w-lg mx-auto transition-all duration-300 shadow-[0px_0px_16px_0px_#0F172A26] hover:shadow-[0px_0px_24px_0px_#0F172A40] hover:-translate-y-1">
            <p className="text-[#1A2C50] text-[16px] font-semibold text-center">
              Enter your login details
            </p>

            <Flex vertical gap={18}>
              <Input placeholder="Email" variant="underlined" className="!placeholder-[#636771]" />
              <Password
                placeholder="Password"
                variant="underlined"
                className="!placeholder-[#636771]"
              />
            </Flex>

            <div className="pt-8 flex justify-center">
              <Buttons />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-10">
        <img src={'Login.svg'} alt="Loading" />
      </div>
    </div>
  );
};

export default Loginform;
