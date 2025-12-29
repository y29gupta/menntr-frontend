'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

import OrganizationHeader from '@/app/components/dashboards/institution-admin/OrganizationHeader';
import DepartmentsTable from '@/app/components/dashboards/institution-admin/Department-table';
import DepartmentForm from '@/app/components/dashboards/institution-admin/Department-form';
import Categories from '@/app/components/dashboards/institution-admin/category/Categories';
import Hierarchy from '@/app/components/dashboards/institution-admin/hierarchy/Hierarchy';

const Page = () => {
  const [activeTab, setActiveTab] = useState<'Categories' | 'Departments' | 'Hierarchy'>(
    'Departments'
  );
  const [departmentView, setDepartmentView] = useState<'list' | 'form'>('list');
  const [categoryView, setCategoryView] = useState<'list' | 'form'>('list');

  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const [search, setSearch] = useState('');
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const hideOrganizationHeader =
    (activeTab === 'Departments' && departmentView === 'form') ||
    (activeTab === 'Categories' && categoryView === 'form');

  return (
    <div className="flex rounded-2xl  flex-col p-4 gap-4  shadow-[0_0_16px_0_#0F172A26] w-full">
      {!hideOrganizationHeader && (
        <OrganizationHeader activeTab={activeTab} onTabChange={setActiveTab} />
      )}

      {/* <OrganizationHeader
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setDepartmentView('list'); // reset view on tab change
        }}
      /> */}
      {activeTab === 'Departments' && (
        <>
          {departmentView === 'list' ? (
            <>
              {/* Top bar */}
              <div className="w-full">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h2 className="hidden sm:block font-semibold text-gray-800 text-sm sm:text-base lg:text-lg">
                    Total Departments <span>(20)</span>
                  </h2>

                  <button
                    onClick={() => {
                      setFormMode('create');
                      setSelectedDepartment(null);
                      setDepartmentView('form');
                    }}
                    className="w-full sm:w-auto whitespace-nowrap text-xs sm:text-sm !text-white bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] px-6 py-2.5 rounded-full flex items-center justify-center gap-2 font-medium"
                  >
                    <span>+</span> Add Department
                  </button>
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

              {/* TABLE */}
              <div className="relative w-full h-full overflow-y-auto">
                <DepartmentsTable
                  globalFilter={search}
                  onGlobalFilterChange={setSearch}
                  showColumnFilters={showColumnFilters}
                  onEdit={(department) => {
                    setFormMode('edit');
                    setSelectedDepartment(department);
                    setDepartmentView('form');
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <DepartmentForm
                mode={formMode}
                defaultValues={{
                  name: selectedDepartment?.name,
                  code: selectedDepartment?.code,
                  parentCategoryId: selectedDepartment?.parentCategoryId,
                  hodId: selectedDepartment?.hodId,
                }}
                onBack={() => setDepartmentView('list')}
                onSubmit={(data) => {
                  if (formMode === 'create') {
                    console.log('CREATE', data);
                  } else {
                    console.log('UPDATE', data);
                  }
                }}
              />
            </>
          )}
        </>
      )}

      {activeTab === 'Categories' && <Categories setCategoryView={setCategoryView} />}

      {activeTab === 'Hierarchy' && (
        <div className="p-6  rounded-lg bg-white">
          <Hierarchy />
        </div>
      )}
    </div>
  );
};

export default Page;
