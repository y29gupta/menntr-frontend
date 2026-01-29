export default function McqQuestion() {
  return (
    <div className="mt-4">
      <p className="text-sm font-medium text-gray-800 mb-4">
        What is the difference between a list and a tuple?
      </p>

      <div className="flex flex-col gap-3">
        {['Option 1', 'Option 2', 'Option 3', 'Option 4'].map((opt, i) => (
          <label
            key={i}
            className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-purple-50"
          >
            <input type="radio" name="mcq" className="accent-purple-600" />
            <span className="text-sm">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
