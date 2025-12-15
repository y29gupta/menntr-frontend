import { Button } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

const Buttons = ({ role }: { role: string }) => {
  return (
    <Button
      className="
    !rounded-full 
    !h-auto 
    !py-3 
    !px-6 
    !text-white 
    !text-[16px] 
    !font-medium 
    !bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
    hover:!opacity-90
    flex items-center gap-2
  "
    >
      {role == 'student' ? 'Login to Student Portal' : 'Login to Admin Portal'}
      <ArrowUpOutlined
        size={20}
        className="rotate-45 transition-transform duration-300 hover:rotate-90"
      />
    </Button>
  );
};

export default Buttons;
