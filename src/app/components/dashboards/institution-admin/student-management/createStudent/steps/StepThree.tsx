'use client';

import { Divider, Switch } from 'antd';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { studentsApi } from '@/app/lib/services/students.api';

type Props = {
  value: {
    login_enabled: boolean;
    assessment_enabled: boolean;
    result_view_enabled: boolean;
  };
  onChange: (value: Props['value']) => void;
};

const StepThree = ({ value, onChange }: Props) => {
  const params = useParams<{ studentId: string }>();

  const { data } = useQuery({
    queryKey: ['platform-access', params.studentId],
    queryFn: () => studentsApi.getPlatformAccess(params.studentId),
  });

  useEffect(() => {
    if (data) {
      onChange({
        login_enabled: data.login_enabled,
        assessment_enabled: data.assessment_enabled,
        result_view_enabled: data.result_view_enabled,
      });
    }
  }, [data, onChange]);

  return (
    <div className=" rounded-3xl p-6">
      <h3 className="text-lg text-[#1A2C50] font-semibold mb-4">Platform Access</h3>

      <div className="flex border pt-4 px-4 pb-9 rounded-3xl border-[#DBE3E9] flex-col gap-6">
        <div className="flex   justify-between items-center">
          <div>
            <p className="font-medium text-[16px] !text-[#0F172A]">Enable Student Login</p>
            <p className="text-sm text-gray-500">
              Allows the student to log in and access assessments
            </p>
          </div>
          <Switch
            checked={value.login_enabled}
            onChange={(checked) => onChange({ ...value, login_enabled: checked })}
          />
        </div>
        <Divider style={{ margin: '0px', border: '1px solid #C3CAD9' }} />

        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-[16px] !text-[#0F172A]">Allow Assessment Access</p>
            <p className="text-sm text-gray-500">Student can participate in assigned assessments</p>
          </div>
          <Switch
            checked={value.assessment_enabled}
            onChange={(checked) => onChange({ ...value, assessment_enabled: checked })}
          />
        </div>

        <Divider style={{ margin: '0', border: '1px solid #C3CAD9' }} />

        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-[16px] !text-[#0F172A]">Allow Result Viewing</p>
            <p className="text-sm text-gray-500">
              Student can view their assessment results and reports
            </p>
          </div>
          <Switch
            checked={value.result_view_enabled}
            onChange={(checked) => onChange({ ...value, result_view_enabled: checked })}
          />
        </div>
      </div>
    </div>
  );
};

export default StepThree;
