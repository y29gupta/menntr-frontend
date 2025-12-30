'use client';

import { useState } from 'react';
import { Search, Filter, Upload } from 'lucide-react';
import ManagementTable from '@/app/components/dashboards/institution-admin/user-management/ManagementTable';
import ProfileForm from '@/app/components/dashboards/institution-admin/user-management/management-form/FormStep1';

const Page = () => {
  const [view, setView] = useState<'list' | 'form'>('list');

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const [search, setSearch] = useState('');
  const [showColumnFilters, setShowColumnFilters] = useState(false);

  const handleBulkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('Uploaded file:', file.name, file.type);
  };

  return (
    <div className="flex rounded-2xl flex-col p-4 gap-4 shadow-[0_0_16px_0_#0F172A26] w-full">
      {view === 'list' ? (
        <>
          {/* Top bar */}
          <div className="w-full">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="hidden sm:block font-semibold text-gray-800 text-sm sm:text-base lg:text-lg">
                Total User <span>(20)</span>
              </h2>

              <div className="flex gap-2 text-white">
                <label
                  htmlFor="bulk-upload"
                  className="inline-flex items-center justify-center h-10 px-6 rounded-full text-sm font-medium text-purple-600 border border-current flex gap-2"
                >
                  <Upload className="w-4 h-4 text-[#904BFF]" />
                  Bulk Upload
                </label>

                <input
                  id="bulk-upload"
                  type="file"
                  className="hidden"
                  accept=".xlsx,.xls,.doc,.docx,.pdf"
                  onChange={handleBulkUpload}
                />

                <button
                  onClick={() => {
                    setFormMode('create');
                    setSelectedUser(null);
                    setView('form');
                  }}
                  className="inline-flex items-center justify-center h-10 px-6 rounded-full text-sm font-medium text-white bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] shadow-md hover:shadow-lg transition-shadow gap-1"
                >
                  <span>+</span>
                  Add User
                </button>
              </div>
            </div>

            {/* Search + Filter */}
            <div className="flex sm:flex-row gap-3 mb-4">
              <div className="relative max-w-[400px] w-full">
                <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search for departments"
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                onClick={() => setShowColumnFilters((prev) => !prev)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                {showColumnFilters ? 'Hide Filters' : 'Filter'}
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="relative w-full h-full overflow-y-auto">
            <ManagementTable
              globalFilter={search}
              onGlobalFilterChange={setSearch}
              showColumnFilters={showColumnFilters}
              onEdit={(department) => {
                setFormMode('edit');
                setSelectedUser(department);
                setView('form');
              }}
            />
          </div>
        </>
      ) : (
        <ProfileForm
          mode={formMode}
          defaultValues={{
            firstName: selectedUser?.firstName,
            lastName: selectedUser?.lastName,
            email: selectedUser?.email,
            mobile: selectedUser?.mobile,
          }}
          onBack={() => setView('list')}
          onSubmit={(data) => {
            formMode === 'create' ? console.log('CREATE', data) : console.log('UPDATE', data);
          }}
        />
      )}
    </div>
  );
};

export default Page;
