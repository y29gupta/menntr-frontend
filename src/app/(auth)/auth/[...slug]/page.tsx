import Navbar from '@/app/components/layout/Topbar';
import Loginform from '@/app/ui/Loginform';

const page = () => {
  return (
    <div className="max-w-full px-4 sm:px-6 md:px-8 lg:px-20 overflow-x-hidden max-h-[100vh]">
      <Navbar />
      <Loginform role="admin" />
    </div>
  );
};

export default page;
