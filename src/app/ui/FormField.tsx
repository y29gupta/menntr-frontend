'use client';

import { Input } from 'antd';
import type { FieldError, UseFormRegister } from 'react-hook-form';

type InputType = 'text' | 'email' | 'password';

interface FormFieldProps {
  name: string;
  label: string;
  type: InputType;
  register: UseFormRegister<any>;
  error?: FieldError;
}

export default function FormField({ name, label, type, register, error }: FormFieldProps) {
  const isPassword = type === 'password';

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-[#1A2C50]">{label}</label>

      {isPassword ? (
        <Input.Password
          {...register(name)}
          placeholder={label}
          variant="underlined"
          status={error ? 'error' : undefined}
        />
      ) : (
        <Input
          {...register(name)}
          type={type}
          placeholder={label}
          variant="underlined"
          status={error ? 'error' : undefined}
        />
      )}

      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
}
