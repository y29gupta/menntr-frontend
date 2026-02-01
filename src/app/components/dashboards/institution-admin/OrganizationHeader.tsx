import OrganizationIcon from '../../icons/OrganizationIcon';

type Props = {
  activeTab: 'Categories' | 'Departments' | 'Batches' | 'Role Hierarchy';
  onTabChange: (tab: Props['activeTab']) => void;
};

const tabs: Props['activeTab'][] = ['Categories', 'Departments', 'Batches', 'Role Hierarchy'];

export default function OrganizationHeader({ activeTab, onTabChange }: Props) {
  return (
    <div className="w-full  px-4 pt-4 flex flex-col gap-6  ">
      {/* <div className="flex justify-between items-center ">
            <div className="">
              <div className="flex space-x-2 text-xl items-center">
                <OrganizationIcon />
                <h2 className="text-[#1A2C50]">Organization</h2>
              </div>
              <p>Manage categories departments and batches</p>
            </div>

            <div className="flex space-x-2 text-[#C46800]">
              <WarningIcon /> <p>Your plan going to expire</p>
            </div>
          </div> */}

      <div className="w-full    flex flex-col   ">
        {/* Top Row */}
        {/* <div className="flex  justify-between"> */}
        {/* Left: Title */}
        <div className="flex  gap-2">
          <span className="">
            <OrganizationIcon />
          </span>
          <div>
            <h2 className="text-[20px] font-semibold text-gray-900">Organization</h2>
          </div>
        </div>
        {/* </div> */}
        <p className="text-sm text-gray-500">Manage categories, departments and batches</p>

        {/* Tabs */}
        <div className="mt-3 ml-2 flex gap-4 border-b border-[#616573] overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`relative pb-2 px-3 text-sm font-medium transition-colors shrink-0
  ${activeTab === tab ? '!text-[#7C3AED]' : '!text-[#616570] hover:text-gray-700'}
`}
            >
              {tab}

              {/* Active underline */}
              {activeTab === tab && (
                <span className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-indigo-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
