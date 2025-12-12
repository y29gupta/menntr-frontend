'use client';
import Topbar from './components/layout/Topbar';
import CampusUserCard from './components/layout/CampusUserCard';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';

export default function page() {
  const router = useRouter();
  return (
    <>
      <div className="max-w-full   px-12">
        <div className=" ">
          <Topbar />
        </div>
        <div className=" w-full  flex flex-col   relative  ">
          {/* <div className='border '> */}
          <Image
            src="/roboIcon.jpg"
            width={150}
            height={150}
            className="absolute top-15 left-5 -z-50 "
            alt="roboicon"
          />
          {/* </div> */}
          <div className="flex  relative  justify-center items-end gap-4">
            <div className="flex flex-col   items-center  ">
              <h6 className="text-[#0F172A]  text-[32px]">
                Welcome to <span className="font-bold underline">Menntr</span>
              </h6>
              <p className="text-[#636771] ">choose your role to continue</p>
            </div>
            <div className=" absolute md:right-123 -right-5  ">
              <img
                src="/assets/animation.gif"
                alt="Loading animation"
                className="w-[77px] h-[130px]  "
              />
            </div>
          </div>
          <div className="mt-10  w-full mx-auto  flex flex-col items-center justify-center gap-6">
            <div className="md:flex sm:flex sm-flex-col gap-3">
              <CampusUserCard
                label="For Campus User"
                title="Student"
                description="Access assessments, results, and placement opportunities."
                image="/assets/studentIcon.png"
                buttonText="Continue as Student"
                gradient="bg-[linear-gradient(90deg,#904BFF_0%,#BD47BF_100%)]"
                onClick={() => router.push('/login?role=student')}
              />
              <CampusUserCard
                label="For Admin Roles"
                title="Institution"
                description="Manage campus-wide department and placement workflow."
                image="/assets/institutionIcon.png"
                buttonText="Continue as Institution Admin"
                gradient="bg-[linear-gradient(90deg,#904BFF_0%,#BD47BF_100%)]"
                onClick={() => router.push('/login?role=admin')}
              />
            </div>
            <div className="w-full  flex justify-end ">
              <div className="relative  max-w-lg rounded-full border border-[#E5E7EB] bg-white shadow-sm px-2 py-2 ">
                <div className=" absolute top-4.5 left-70">
                  <img src="/assets/cursorIcon.png" alt="" className="w-[19px] h-6" />
                </div>
                {/* Left Text */}
                <span className="text-gray-700">I want to level up my skills</span>

                {/* Right Highlighted Text */}
                <span
                  className="px-4 py-1 rounded-full text-xs font-medium text-[#3B82F6]
                  bg-[linear-gradient(90deg,#F8FBFF_0%,#EEEBFF_100%)]
                shadow-sm "
                >
                  Exactly. Let's begin
                </span>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
