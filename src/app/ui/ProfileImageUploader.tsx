'use client';

import { useRef, useState } from 'react';
import { Pencil } from 'lucide-react';

type Props = {
  value?: File | null;
  onChange: (file: File | null) => void;
};

export default function ProfileImageUploader({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange(file);
  };

  return (
    <div className="flex justify-center">
      <div className="relative" onClick={() => inputRef.current?.click()}>
        {/* Circle */}
        <div className="h-[120px] w-[120px] rounded-full bg-[#EEF1F6] flex items-center justify-center overflow-hidden">
          {preview ? (
            <img src={preview} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="28" r="16" fill="#B8BCC8" />
              <path d="M12 70C12 55 24 44 40 44C56 44 68 55 68 70" fill="#B8BCC8" />
            </svg>
          )}
        </div>

        {/* Edit icon */}
        <button
          type="button"
          className="absolute bottom-1 right-1 h-8 w-8 rounded-full bg-white shadow flex items-center justify-center"
        >
          <Pencil size={16} />
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileChange(file);
          }}
        />
      </div>
    </div>
  );
}
