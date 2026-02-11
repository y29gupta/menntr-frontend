import Topbar from './components/layout/Topbar';
import CampusUserCard from './components/layout/CampusUserCard';

import RobotClient from './components/RobotClient';
import Image from 'next/image';

export default function Page() {
  return (
    <div
      className="
       
        h-screen
    w-full
    max-w-[1366px]
    mx-auto
    bg-white
    px-4
    sm:px-6
    lg:px-20
    flex
    flex-col
    relative
    overflow-y-auto
    lg:overflow-hidden
      "
    >
      {/* MESH BACKGROUND (Behind Cards Only) */}

      {/* CONTENT CONTAINER */}
      <div className=" relative w-full max-w-[1206px] z-10 flex flex-col gap-6">
        <Topbar />

        {/* FLOATING ROBOT (LEFT) */}
        <div
          className="
            absolute
            left-0
            top-[120px]
            hidden
            
            lg:block
            pointer-events-none
          "
        >
          <RobotClient />
        </div>

        {/* CENTER HEADING */}
        <div className="w-full flex justify-center">
          <div className="relative flex flex-col items-center gap-[10px]">
            <h6 className="text-[#0F172A] text-[32px] leading-[40px]">
              Welcome to <span className="font-bold underline">Menntr</span>
            </h6>

            <p className="text-[#636771]">choose your role to continue</p>

            {/* GIF */}
            <img
              src="/assets/animation.gif"
              alt="Loading animation"
              className="
                absolute
                left-full
                ml-4
                bottom-0
                w-[77px]
                h-[130px]
                hidden
                sm:block
              "
            />
          </div>
        </div>

        {/* ROLE CARDS */}
        <div className="relative w-full pt-12 flex justify-center">
          {/* MESH BACKGROUND (Anchored to Cards) */}
          <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
            <div className="mesh-blob" />
          </div>

          <div className="relative z-[2] w-full flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-6 w-full">
              <CampusUserCard
                label="For Campus User"
                title="Student"
                description="Access assessments, results, and placement opportunities."
                image="/assets/studentIcon.png"
                buttonText="Continue as Student"
                // onClick={() => router.push('/login?role=student')}
                redirect="/login?role=Student"
              />

              <CampusUserCard
                label="For Admin Roles"
                title="Institution"
                description="Manage campus-wide department and placement workflow."
                image="/assets/institutionIcon.png"
                buttonText="Continue as Institution Admin"
                // onClick={() => router.push(`/login?role=Institution Admin`)}
                redirect="/login?role=Institution Admin"
              />
            </div>

            {/* CTA PILL */}
            <div className="w-full flex justify-end">
              {/* <div className="max-w-lg  rounded-full border border-[#648bd9] bg-white shadow-sm px-4 py-2 flex items-center gap-3">
                <div className="w-[19px] h-6 flex-shrink-0">
                  <img src="/assets/cursorIcon.png" alt="" />
                </div>

                <span className="text-gray-700 text-sm">I want to level up my skills</span>

                <span
                  className="
                    px-4
                    py-1
                    rounded-full
                    text-xs
                    font-medium
                    text-[#3B82F6]
                    bg-[linear-gradient(90deg,#F8FBFF_0%,#EEEBFF_100%)]
                    shadow-sm
                  "
                >
                  Exactly. Let&apos;s begin
                </span>
              </div> */}
              <Image src="assets/quoteImage.png" alt="quotes" width={300} height={50} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
