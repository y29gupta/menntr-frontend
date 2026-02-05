'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InstitutionFormValues, institutionSchema } from '@/app/lib/institution';
import { Button } from 'antd';
import CheckedIcon from '../../icons/CheckedIcon';
import { Check } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { plansApi, type Plan } from '@/app/lib/api/plans.api';
import { useEffect, useMemo } from 'react';
import Profile from '@/app/ui/Profile';

type Props = {
  mode: 'create' | 'edit';
  defaultValues?: InstitutionFormValues;
  onCancel: () => void;
  onSubmitForm: (data: InstitutionFormValues) => void;
};

export default function OnboardingForm({ mode, defaultValues, onCancel, onSubmitForm }: Props) {
  // Fetch plans from API
  const { data: plansData, isLoading: plansLoading } = useQuery({
    queryKey: ['plans'],
    queryFn: () => plansApi.getPlans(),
  });

  const plans = plansData?.data || [];

  // Get default plan code (premium or first available)
  const defaultPlanCode = useMemo(() => {
    if (defaultValues?.plan_id) return defaultValues.plan_id;
    const premiumPlan = plans.find((p) => p.code.toLowerCase() === 'premium');
    return premiumPlan?.code.toUpperCase() || plans[0]?.code.toUpperCase() || 'PREMIUM';
  }, [plans, defaultValues]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InstitutionFormValues>({
    resolver: zodResolver(institutionSchema),
    defaultValues: defaultValues ?? {
      name: '',
      code: '',
      subdomain: '',
      contact_email: '',
      plan_id: defaultPlanCode,
    },
  });

  // Update plan_id when plans are loaded
  useEffect(() => {
    if (plans.length > 0 && !defaultValues?.plan_id) {
      const premiumPlan = plans.find((p) => p.code.toLowerCase() === 'premium');
      const planCode = premiumPlan?.code.toUpperCase() || plans[0]?.code.toUpperCase();
      if (planCode) {
        setValue('plan_id', planCode);
      }
    }
  }, [plans, setValue, defaultValues]);

  const plan = watch('plan_id');
  const selectedPlan = plans.find((p) => p.code.toUpperCase() === plan);

  const resourceLimits = [
    {
      label: 'Max Students',
      value: selectedPlan?.max_students?.toString() || '—',
      placeholder: selectedPlan?.max_students ? `${selectedPlan.max_students}` : 'Unlimited',
    },
    {
      label: 'Max Admins',
      value: selectedPlan?.max_admins?.toString() || '—',
      placeholder: selectedPlan?.max_admins ? `${selectedPlan.max_admins}` : 'Unlimited',
    },
    {
      label: 'Max Storage (GB)',
      value: selectedPlan?.storage_gb?.toString() || '—',
      placeholder: selectedPlan?.storage_gb ? `${selectedPlan.storage_gb} GB` : 'Unlimited',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-[24px] rounded-2xl bg-white p-9 pt-[10px] shadow-sm">
      {/* BACK */}
      <div className="flex w-full justify-between">
        <h1 className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-gray-800 sm:text-base lg:text-lg">
          <button onClick={onCancel} className="mb-4 flex gap-2 text-sm text-gray-500">
            <img src="/Go-back.svg" alt="" className="cursor-pointer" />
            Go back to dashboard
          </button>
        </h1>

        <Profile />
      </div>

      {/* TITLE */}
      <div className="item- flex w-full flex-col justify-evenly gap-6">
        <h2 className="mb-8 text-center text-xl font-semibold">
          {mode === 'create' ? ' Institution Setup' : 'Edit Institution'}
        </h2>

        <div className="flex justify-between">
          <h2 className="text-[#0F172A]">Institutoin Details</h2>
          <button
            onClick={handleSubmit(onSubmitForm)}
            className="cursor-pointer rounded-full bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] px-6 py-2 !text-white transition-all duration-300 ease-in-out hover:bg-[linear-gradient(90deg,#7F3FFF_0%,#A844B3_100%)]"
          >
            {mode === 'create' ? 'Create Institution' : 'Save Changes'}
          </button>
        </div>

        <div className="w-full border-b border-[#C3CAD9]" />

        <div className="flex w-full justify-between gap-6">
          <div className="w-full max-w-[462px] p-2">
            <div className="space-y-6">
              <div>
                <label className="text-[16px] text-[#0F172A]">Institution Name</label>
                <input
                  {...register('name')}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none"
                  placeholder="ABC College"
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <label className="text-sm text-[#0F172A]">Institution Code</label>
                <input
                  {...register('code')}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none"
                  placeholder="ABC-ENG-001"
                />
                {errors.code && <p className="text-xs text-red-500">{errors.code.message}</p>}
              </div>

              <div>
                <label className="text-sm text-[#0F172A]">Sub Domain</label>
                <input
                  {...register('subdomain')}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none"
                  placeholder="ABC-ENG-001"
                />
                {errors.subdomain && (
                  <p className="text-xs text-red-500">{errors.subdomain.message}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-[#0F172A]">Contact Email</label>
                <input
                  {...register('contact_email')}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none"
                  placeholder="admin@abc.edu"
                />
                {errors.contact_email && (
                  <p className="text-xs text-red-500">{errors.contact_email.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full max-w-[500px] px-4 py-2">
            <h3 className="mb-4 text-[18px] font-medium text-[#0F172A]">Select Plan / Modules</h3>

            {plansLoading ? (
              <div className="text-center py-4">Loading plans...</div>
            ) : (
              <>
                <div className="mb-6 flex justify-around gap-4 flex-wrap">
                  {plans.map((planItem) => {
                    const planCode = planItem.code.toUpperCase();
                    const isSelected = plan === planCode;
                    return (
                      <button
                        key={planItem.id}
                        type="button"
                        onClick={() => setValue('plan_id', planCode)}
                        className={`
                          px-10 py-3 rounded-full border
                          flex items-center gap-3
                          cursor-pointer
                          transition-all duration-300 ease-in-out
                          hover:!text-white
                          hover:bg-[linear-gradient(90deg,#7F3FFF_0%,#A844B3_100%)]
                          ${
                            isSelected
                              ? 'border-purple-500 text-purple-600'
                              : 'border-gray-300 text-gray-700'
                          }
                        `}
                      >
                        {isSelected && (
                          <span className="group-hover:!text-white">
                            <CheckedIcon />
                          </span>
                        )}
                        {planItem.name}
                      </button>
                    );
                  })}
                </div>

                {selectedPlan && (
                  <div className="space-y-4">
                    {selectedPlan.description && (
                      <p className="text-sm text-gray-600 mb-3">{selectedPlan.description}</p>
                    )}

                    {/* Modules and Features */}
                    {selectedPlan.modules && selectedPlan.modules.length > 0 ? (
                      <div className="space-y-4 max-h-[400px] overflow-y-auto">
                        {selectedPlan.modules.map((module) => (
                          <div
                            key={module.id}
                            className="border-b border-gray-200 pb-3 last:border-b-0"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {module.icon && <span className="text-lg">{module.icon}</span>}
                              <h4 className="font-semibold text-[16px] text-[#0F172A]">
                                {module.name}
                              </h4>
                            </div>
                            {module.description && (
                              <p className="text-xs text-gray-500 mb-2">{module.description}</p>
                            )}
                            {module.features && module.features.length > 0 && (
                              <ul className="space-y-2 ml-6">
                                {module.features.map((feature) => (
                                  <li
                                    key={feature.id}
                                    className="flex items-start gap-2 text-sm text-gray-700"
                                  >
                                    <Check className="h-4 w-4 shrink-0 text-purple-600 mt-0.5" />
                                    <div className="flex-1">
                                      <span className="text-[14px]">{feature.name}</span>
                                      {feature.usage_limit && (
                                        <span className="text-xs text-gray-500 ml-2">
                                          (Limit: {feature.usage_limit})
                                        </span>
                                      )}
                                      {feature.description && (
                                        <p className="text-xs text-gray-500 mt-0.5">
                                          {feature.description}
                                        </p>
                                      )}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No modules available for this plan</p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="w-full border-b border-[#C3CAD9]" />

        <div className="w-full">
          <h2 className="mb-4 text-[18px] font-medium text-[#0F172A]">Resource limits</h2>

          <div className="flex gap-6">
            {resourceLimits.map((item) => (
              <div key={item.label} className="flex-1 rounded-xl border border-[#E2E8F0] p-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[16px] font-medium text-[#0F172A]">{item.label}</h3>
                  <p className="text-lg font-semibold text-[#0F172A]">
                    {item.value === '—' ? 'Unlimited' : item.value}
                  </p>
                  {item.placeholder && item.value !== '—' && (
                    <p className="text-sm text-[#64748B]">{item.placeholder}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ACTION */}
    </div>
  );
}
