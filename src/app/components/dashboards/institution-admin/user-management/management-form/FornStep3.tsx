'use client';

import FormHeader from './FormHeader';
import { useFormContext } from 'react-hook-form';

type Props = {
  onBack: () => void;
  mode: 'create' | 'edit';
  onSubmit: () => void;
};

type CredentialsForm = {
  sendCredentials: boolean;
};

export default function UserCredentials({ onBack, mode, onSubmit }: Props) {
  const { register, handleSubmit, watch } = useFormContext<CredentialsForm>();

  const sendCredentials = watch('sendCredentials', true);

  const submitHandler = () => {
    if (!sendCredentials) return;
    onSubmit();
  };

  return (
    <div className="flex h-full w-full flex-col">
      <FormHeader onBack={onBack} title={mode === 'edit' ? 'Edit User' : 'Add User'} />

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="relative flex-1 w-full rounded-2xl border border-gray-200
               bg-gradient-to-b from-[#f8f9ff] to-white
               p-6 sm:p-8 flex flex-col"
      >
        {/* TITLE */}
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Credentials</h2>

        <div className="h-px w-full bg-gray-200 mb-4" />

        {/* CHECKBOX */}
        <label className="flex items-start gap-3 text-sm text-gray-800">
          <input
            type="checkbox"
            {...register('sendCredentials')}
            className="mt-1 h-4 w-4 rounded accent-[#636771] cursor-pointer"
          />

          <span>
            Send credentials via email
            <span className="text-gray-500"> (Auto-generated password)</span>
            <p className="mt-1 text-[14px] text-[#C46800]">
              User will be required to change password on first login
            </p>
          </span>
        </label>

        {/* BUTTON */}
        <div className="mt-auto flex justify-center text-white">
          <button
            type="submit"
            disabled={!sendCredentials}
            className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium 
              bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
              transition
              ${
                !sendCredentials
                  ? 'opacity-80 cursor-not-allowed'
                  : 'shadow-md hover:shadow-lg cursor-pointer'
              }
            `}
          >
            {mode === 'edit' ? 'Save all changes' : '+ Add User'}
          </button>
        </div>
      </form>
    </div>
  );
}
