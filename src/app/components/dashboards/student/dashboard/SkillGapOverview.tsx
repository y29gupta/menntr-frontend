export default function SkillGapOverview() {
  return (
    <div className="bg-white rounded-xl p-5 border border-[#DBE3E9] shadow-[0px_0px_8px_0px_#0F172A1F]">
      <h3 className="font-semibold mb-4">Skill Gap Overview</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
        <div>
          <h4 className="font-medium text-green-600">Strength Areas</h4>

          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="bg-green-100 px-3 py-1 rounded-full">Data Structures</span>
            <span className="bg-green-100 px-3 py-1 rounded-full">Python Basics</span>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-yellow-600">Needs Improvement</h4>

          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="bg-yellow-100 px-3 py-1 rounded-full">Algorithms</span>
            <span className="bg-yellow-100 px-3 py-1 rounded-full">SQL Query</span>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-red-600">Critical Gaps</h4>

          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="bg-red-100 px-3 py-1 rounded-full">System Design</span>
          </div>
        </div>
      </div>
    </div>
  );
}
