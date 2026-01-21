'use client';

import React, { useState, useRef } from 'react';
import { FileText, X } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

import FormHeader from './management-form/FormHeader';
import FormDropdown from '@/app/ui/FormDropdown';

type Option = {
  label: string;
  value: string;
};

export default function BulkUploadInterface({ onBack }: { onBack: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* ---------------- STATIC DATA (UI ONLY) ---------------- */

  const categories = ['Engineering', 'Medical', 'Arts & Science', 'Commerce', 'Law'];
  const roles = ['Student', 'Faculty', 'Administrator', 'Guest'];
  const batches = ['2024-25', '2023-24', '2022-23', '2021-22', '2020-21'];

  const toOptions = (arr: string[]): Option[] => arr.map((item) => ({ label: item, value: item }));

  const categoryOptions = toOptions(categories);
  const roleOptions = toOptions(roles);
  const batchOptions = toOptions(batches);

  // const isUploadEnabled = Boolean(selectedCategory && selectedRole && selectedBatch);
  const isUploadEnabled = true;

  /* ---------------- DRAG & DROP ---------------- */

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isUploadEnabled) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isUploadEnabled) return;
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  /* ---------------- FILE HANDLING ---------------- */

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];

    if (
      !validTypes.includes(file.type) &&
      !file.name.endsWith('.csv') &&
      !file.name.endsWith('.xlsx')
    ) {
      alert('Please upload a CSV or XLSX file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploadedFile(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleBrowseClick = () => {
    if (!isUploadEnabled) return;
    fileInputRef.current?.click();
  };

  /* ---------------- TANSTACK MUTATION ---------------- */

  const bulkUploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      // backend currently expects these fields
      formData.append('institutionId', '1');
      formData.append('createdBy', '36');

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/bulk-upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include', // ✅ send auth_token cookie
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Bulk upload failed');
      }

      return data;
    },

    onSuccess: (data) => {
      alert(
        `✅ Upload Completed\nSuccess: ${data.summary.successCount}\nFailed: ${data.summary.failedCount}`
      );
      setUploadedFile(null);
    },

    onError: (error: any) => {
      console.error('❌ BULK UPLOAD ERROR:', error);
      alert(error.message || '❌ Bulk upload failed');
    },
  });

  const handleSubmitUpload = () => {
    if (!uploadedFile) {
      alert('Please upload a file');
      return;
    }

    bulkUploadMutation.mutate(uploadedFile);
  };

  /* ---------------- UI ---------------- */

  return (
    <>
      <div className="flex flex-col h-full min-h-0 px-2 sm:px-4 lg:px-6">
        <FormHeader onBack={onBack} title="Bulk Upload" />

        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
          {/* Dropdowns (UI ONLY) */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <FormDropdown
              value={selectedCategory}
              onChange={(v) => setSelectedCategory(Array.isArray(v) ? (v[0] ?? '') : v)}
              options={categoryOptions}
              placeholder="Select Category"
            />

            <FormDropdown
              value={selectedRole}
              onChange={(v) => setSelectedRole(Array.isArray(v) ? (v[0] ?? '') : v)}
              options={roleOptions}
              placeholder="Select Role"
            />

            <FormDropdown
              value={selectedBatch}
              onChange={(v) => setSelectedBatch(Array.isArray(v) ? (v[0] ?? '') : v)}
              options={batchOptions}
              placeholder="Select Batch"
              searchable
              searchPlaceholder="Search for Batch"
            />
          </div>

          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl transition-all ${
              !isUploadEnabled
                ? 'border-gray-300 bg-gray-50 opacity-60 cursor-not-allowed'
                : isDragging
                  ? 'border-purple-400 bg-purple-50'
                  : 'border-purple-500 bg-white'
            }`}
            style={{ minHeight: '360px' }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileInput}
              disabled={!isUploadEnabled}
              className="hidden"
            />

            <div className="flex flex-col items-center justify-center h-full px-6 py-20">
              {uploadedFile ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>

                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setUploadedFile(null)}
                    className="text-xs text-red-600 hover:text-red-700 mt-2"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <>
                  <FileText className="w-10 h-10 text-gray-400 mb-3" />
                  <p className="text-gray-700 text-sm text-center">
                    Drag and drop your file here or{' '}
                    <button
                      type="button"
                      onClick={handleBrowseClick}
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      click to browse
                    </button>
                  </p>

                  {!isUploadEnabled && (
                    <p className="text-xs text-gray-500 mt-2">
                      Please select Category, Role, and Batch to enable upload
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Upload Button */}
          <div className="flex justify-center mt-4">
            {uploadedFile && (
              <button
                type="button"
                onClick={handleSubmitUpload}
                disabled={bulkUploadMutation.isPending}
                className={`px-4 py-2 rounded-full text-sm font-medium !text-white
                  bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
                  hover:opacity-90 transition
                  ${bulkUploadMutation.isPending ? 'opacity-60 cursor-not-allowed' : ''}
                `}
              >
                {bulkUploadMutation.isPending ? 'Uploading...' : '+ Upload Now'}
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="mt-5">
            <p className="text-xs text-gray-700 text-center mb-4">
              *Required fields must be filled for each student.
            </p>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end">
              <div className="text-xs text-gray-600">
                <p>
                  Supported formats - <span className="font-medium">csv, xlsx</span>
                </p>
                <p>
                  Maximum file size: <span className="font-medium">5 MB</span>
                </p>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center justify-center h-10 px-6 rounded-full text-sm font-medium !text-purple-600 border border-current gap-2 hover:bg-purple-50 transition-colors"
                >
                  <FileText className="w-4 h-4 text-[#904BFF]" />
                  See sample template
                </button>

                <p className="text-xs text-[#3B82F6]">
                  Use this template to ensure your data is uploaded correctly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Template Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Sample Template</h2>
              <button onClick={() => setShowModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                      Student ID*
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                      Name*
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                      Email*
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                      Phone
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">STU001</td>
                    <td className="border border-gray-300 px-4 py-2">John Doe</td>
                    <td className="border border-gray-300 px-4 py-2">john@example.com</td>
                    <td className="border border-gray-300 px-4 py-2">1234567890</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">STU002</td>
                    <td className="border border-gray-300 px-4 py-2">Jane Smith</td>
                    <td className="border border-gray-300 px-4 py-2">jane@example.com</td>
                    <td className="border border-gray-300 px-4 py-2">0987654321</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
