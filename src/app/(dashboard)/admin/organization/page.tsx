'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

import OrganizationHeader from '@/app/components/dashboards/institution-admin/OrganizationHeader';
import DepartmentForm, {
  DepartmentFormValues,
} from '@/app/components/dashboards/institution-admin/organization/department/Department-form';
import Categories from '@/app/components/dashboards/institution-admin/organization/category/Categories';
import Hierarchy from '@/app/components/dashboards/institution-admin/organization/hierarchy/Hierarchy';
import DepartmentsTable from '@/app/components/dashboards/institution-admin/organization/department/Department-table';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { createDepartment, updateDepartment, getDepartments } from '@/app/lib/institutions.api';
import Batches from '@/app/components/dashboards/institution-admin/organization/batches/Batches';

const Page = () => {
  const [activeTab, setActiveTab] = useState<
    'Categories' | 'Departments' | 'Batches' | 'Role Hierarchy'
  >('Departments');
  const [departmentView, setDepartmentView] = useState<'list' | 'form'>('list');
  const [categoryView, setCategoryView] = useState<'list' | 'form'>('list');
  const [batchView, setBatchView] = useState<'list' | 'form'>('list');

  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const [search, setSearch] = useState('');
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const hideOrganizationHeader =
    (activeTab === 'Departments' && departmentView === 'form') ||
    (activeTab === 'Categories' && categoryView === 'form') ||
    (activeTab === 'Batches' && batchView === 'form');

  const queryClient = useQueryClient();

  // Fetch departments to get the total count
  const { data: departmentResponse } = useQuery({
    queryKey: ['department'],
    queryFn: getDepartments,
  });

  const totalDepartments = departmentResponse?.total ?? 0;

  const createDepartmentMutation = useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      // refresh department list
      queryClient.invalidateQueries({ queryKey: ['department'] });

      // go back to list view
      setDepartmentView('list');
    },
  });

  const updateDepartmentMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) => updateDepartment(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['department'] });
      setDepartmentView('list');
      setSelectedDepartment(null);
    },
  });

  const handleDepartmentSubmit = (data: DepartmentFormValues) => {
    const payload = {
      name: data.name,
      code: data.code,
      category_id: data.category_id ? Number(data.category_id) : null,
      // hodUserId removed - users can be assigned separately
    };

    if (formMode === 'create') {
      createDepartmentMutation.mutate(payload);
    } else {
      console.log(payload, 'update');
      updateDepartmentMutation.mutate({
        id: selectedDepartment.id,
        payload,
      });
    }
  };

  return (
    <div className="flex rounded-2xl   flex-1  flex-col  gap-4  shadow-[0_0_16px_0_#0F172A26] w-full">
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
              <div className="w-full px-4 ">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h2 className="hidden sm:block font-semibold text-gray-800 text-sm sm:text-base lg:text-lg">
                    Total Departments <span>({totalDepartments})</span>
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
              <div className="relative px-4  w-full h-full overflow-y-auto">
                <DepartmentsTable
                  globalFilter={search}
                  onGlobalFilterChange={setSearch}
                  showColumnFilters={showColumnFilters}
                  onEdit={(department) => {
                    console.log(department, 'del');
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
                  category_id: selectedDepartment?.category.id
                    ? String(selectedDepartment.category.id)
                    : undefined,
                  hodId: selectedDepartment?.hodUserId
                    ? String(selectedDepartment.hodUserId)
                    : undefined,
                }}
                onBack={() => setDepartmentView('list')}
                // onSubmit={(data) => {
                //   if (formMode === 'create') {
                //     createDepartmentMutation.mutate({
                //       name: data.name,
                //       code: data.code,
                //       categoryId: data.parentCategoryId ? Number(data.parentCategoryId) : undefined,
                //       hodUserId: data.hodId ? Number(data.hodId) : undefined,
                //     });
                //   } else {
                //     console.log('UPDATE', data);
                //   }
                // }}
                onSubmit={handleDepartmentSubmit}
              />
            </>
          )}
        </>
      )}

      {activeTab === 'Batches' && <Batches setBatchView={setBatchView} />}

      {activeTab === 'Categories' && <Categories setCategoryView={setCategoryView} />}

      {activeTab === 'Role Hierarchy' && (
        <div className="p-6  rounded-lg bg-white">
          <Hierarchy />
        </div>
      )}
    </div>
  );
};

export default Page;
