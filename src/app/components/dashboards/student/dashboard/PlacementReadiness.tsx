export default function PlacementReadiness() {
  return (
    <div className="bg-white rounded-xl p-5 border shadow-sm flex justify-between">
      <div>
        <h3 className="font-semibold mb-3">Placement Readiness</h3>

        <div className="text-4xl font-bold text-green-600">85%</div>
      </div>

      <div className="bg-green-50 p-4 rounded-xl text-sm max-w-sm">
        Ready for placements
        <br />
        Based on CGPA, completed assessments, and skill coverage
        <br />
        Target readiness: 75%
      </div>
    </div>
  );
}
