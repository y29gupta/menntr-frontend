export default function OngoingAssessment() {
  return (
    <div className="bg-white rounded-xl p-5 border border-[#DBE3E9] shadow-[0px_0px_8px_0px_#0F172A1F]">
      <h3 className="font-semibold mb-4">Ongoing Assessment</h3>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <p className="font-medium">Mid-Term test</p>
          <p className="text-sm text-gray-500">Type: Coding + MCQ</p>
          <p className="text-sm text-gray-500">2 hours</p>
        </div>

        <button className="bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] rounded-3xl px-5 py-2 text-sm font-medium !text-white hover:opacity-90 w-full sm:w-auto">
          Take Assessment
        </button>
      </div>
    </div>
  );
}
