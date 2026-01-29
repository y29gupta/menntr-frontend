export default function AssessmentStepper() {
  const steps = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-full px-4 py-3 shadow-sm flex items-center gap-2 overflow-x-auto">
      {steps.map((step) => {
        const isCompleted = step < 3;
        const isActive = step === 3;

        return (
          <div
            key={step}
            className={`h-8 w-8 flex items-center justify-center rounded-full text-sm font-medium
              ${
                isCompleted
                  ? 'bg-green-500 text-white'
                  : isActive
                    ? 'border-2 border-purple-500 text-purple-600'
                    : 'bg-gray-100 text-gray-500'
              }`}
          >
            {step}
          </div>
        );
      })}
    </div>
  );
}
