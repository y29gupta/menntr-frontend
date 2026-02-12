'use client';

export default function AuthLoading() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-purple-100 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-purple-600 border-r-purple-600 rounded-full animate-spin" />
        </div>

        {/* Loading Text */}
        <p className="text-purple-600 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}
