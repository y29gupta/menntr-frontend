export default function CodingQuestion() {
  return (
    <div className="grid grid-cols-2 gap-6 mt-4">
      {/* Problem */}
      <div className="text-sm text-gray-700 space-y-3">
        <p>Write a function that checks whether a string is a palindrome.</p>

        <div>
          <p className="font-medium">Input:</p>
          <p>A string s</p>
        </div>

        <div>
          <p className="font-medium">Output:</p>
          <p>Return true if palindrome, else false</p>
        </div>

        <div>
          <p className="font-medium">Constraints:</p>
          <p>1 ≤ length of s ≤ 10⁵</p>
        </div>
      </div>

      {/* Editor */}
      <div className="border rounded-xl overflow-hidden">
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <span className="text-sm font-medium">Code Editor</span>
          <button className="text-sm text-purple-600 font-semibold">Run Code</button>
        </div>

        <textarea
          className="w-full h-64 p-4 font-mono text-sm outline-none"
          defaultValue={`def isPalindrome(s):\n    # write code here`}
        />
      </div>
    </div>
  );
}
