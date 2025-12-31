import FormDropdown from '@/app/ui/FormDropdown';

const ScopeSelectors = ({
  roleRules,
  selectedCategory,
  watch,
  setValue,
  departmentOptions,
  batchOptions,
}: any) => {
  return (
    <div className="flex gap-10">
      {roleRules?.showDepartment && selectedCategory && (
        <div className="mb-6 w-full">
          <h4 className="mb-2 text-sm font-medium text-gray-700">Role Department</h4>

          <FormDropdown
            value={watch('roleDepartment')}
            placeholder="Select department"
            options={departmentOptions}
            onChange={(val) => setValue('roleDepartment', val)}
            searchable
          />
        </div>
      )}

      {roleRules?.showBatch && (
        <div className="mb-6 w-full">
          <h4 className="mb-2 text-sm font-medium text-gray-700">Role Batch</h4>

          <div className="w-full px-1">
            <FormDropdown
              value={watch('roleBatch')}
              placeholder="Select batch"
              options={batchOptions}
              onChange={(val) => setValue('roleBatch', val)}
              searchable
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ScopeSelectors;
