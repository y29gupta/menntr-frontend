export default function OngoingAssessment() {
  return (
    <div className="bg-white rounded-xl p-5 border shadow-sm">
      <h3 className="font-semibold mb-3">Ongoing Assessment</h3>

      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">Mid-Term test</p>
          <p className="text-sm text-gray-500">Type: Coding + MCQ</p>
          <p className="text-sm text-gray-500">2 hours</p>
        </div>

        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">Take Assessment</button>
      </div>
    </div>
  );
}
