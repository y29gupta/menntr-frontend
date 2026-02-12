export default function SkillGapOverview() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0px_0px_8px_0px_#0F172A1F]">
      {/* Header */}
      <div className="mb-6">
        <h3 className=" font-bold text-lg text-[#1A2C50]">Skill Gap Overview</h3>
        <p className="text-sm text-[#727C90] mt-1 font-medium">
          Based on your recent assessments and placement readiness criteria
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
        {/* Strength Areas */}
        <div className="rounded-2xl flex flex-col  p-5 bg-[linear-gradient(113.74deg,rgba(236,255,241,0.5)_1.69%,rgba(255,255,255,0.5)_98.88%)] backdrop-blur-[100px] shadow-[0px_0px_8px_0px_#0F172A1F] border border-white/40">
          <h4 className="font-medium text-[#192B4F] mb-3">Strength Areas</h4>
          <p className="text-[#727C90] font-medium text-xs">
            You're performing well in these skills
          </p>

          <div className="flex gap-2 flex-wrap mb-4">
            <span className="bg-[#E0F8E8] text-[#1A2C50] border border-[#B0C6B4] px-3 py-1 rounded-[64px] text-xs">
              Data Structures
            </span>
            <span className="bg-[#E0F8E8] text-[#1A2C50] border border-[#B0C6B4] px-3 py-1 rounded-[64px] text-xs">
              Python Basics
            </span>
            <span className="bg-[#E0F8E8] text-[#1A2C50] border border-[#B0C6B4] px-3 py-1 rounded-[64px] text-xs">
              Problem Solving
            </span>
          </div>

          <div className="border-t mt-auto border-slate-200 pt-3 text-xs text-slate-600">
            Consistently scoring above benchmark
          </div>
        </div>

        {/* Needs Improvement */}
        <div
          className="rounded-2xl p-5 flex flex-col
bg-[linear-gradient(113.74deg,rgba(255,245,235,0.5)_1.69%,rgba(255,255,255,0.5)_98.88%)]
backdrop-blur-[100px]
shadow-[0px_0px_8px_0px_#0F172A1F]
border border-white/40"
        >
          <h4 className="font-medium text-[#192B4F] mb-3">Needs Improvement</h4>
          <p className="text-[#727C90] font-medium text-xs">
            Focus on these to improve placement readiness{' '}
          </p>

          <div className="flex gap-2 flex-wrap mb-4">
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
              Algorithms
            </span>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
              SQL Query
            </span>
          </div>

          <div className="border-t mt-auto border-slate-200 pt-3 text-xs text-slate-600">
            Below placement readiness threshold
          </div>
        </div>

        {/* Critical Gaps */}
        <div
          className="rounded-2xl p-5 flex flex-col
bg-[linear-gradient(113.74deg,rgba(255,235,235,0.5)_1.69%,rgba(255,255,255,0.5)_98.88%)]
backdrop-blur-[100px]
shadow-[0px_0px_8px_0px_#0F172A1F]
border border-white/40"
        >
          <h4 className="font-medium text-[#192B4F] mb-3">Critical Gaps</h4>
          <p className="text-[#727C90] font-medium text-xs">These require immediate attention </p>

          <div className="flex gap-2 flex-wrap mb-4">
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">
              System Design
            </span>
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">
              Advanced Coding Patterns
            </span>
          </div>

          <div className="border-t mt-auto border-slate-200 pt-3 text-xs text-slate-600">
            Blocking placement readiness
          </div>
        </div>
      </div>
    </div>
  );
}
