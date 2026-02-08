'use client';

import React from 'react';

type ConfirmModalProps = {
  open: boolean;
  title: string;
  icon?: React.ReactNode;
  description: React.ReactNode;
  warning?: React.ReactNode;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title,
  icon,
  description,
  warning,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
      <div className="bg-white rounded-2xl shadow-lg w-[496px] p-7 space-y-5">
        {/* HEADER */}
        <div className="flex items-center justify-start gap-2 text-xl font-semibold text-gray-900">
          {icon}
          <span>{title}</span>
        </div>

        {/* DESCRIPTION */}
        <p className="text-[#3D465C] text-[16px]">{description}</p>

        {/* WARNING */}
        {warning && <p className="text-[#B36344] text-16px font-semibold">{warning}</p>}

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={onConfirm}
            className="!text-white px-6 py-2 rounded-full font-medium text-sm
            bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]"
          >
            {confirmText}
          </button>

          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-full text-gray-700
            border border-gray-300 font-medium text-sm"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
