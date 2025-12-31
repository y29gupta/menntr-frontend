import { useEffect, useState } from 'react';
import FormHeader from './FormHeader';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
};

const STORAGE_KEY = 'profile-form-step-1';

type ProfileFormProps = {
  mode: 'create' | 'edit';
  defaultValues?: Partial<FormValues>;
  onBack: () => void;
  onSubmit: (data: FormValues) => void;
};

const ProfileForm = ({ mode, defaultValues, onBack, onSubmit }: ProfileFormProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormValues>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }

    return {
      firstName: defaultValues?.firstName || '',
      lastName: defaultValues?.lastName || '',
      email: defaultValues?.email || '',
      mobile: defaultValues?.mobile || '',
    };
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleChange = (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormValues, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Phone is required';
    } else if (formData.mobile.length < 10) {
      newErrors.mobile = 'Phone must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <FormHeader onBack={onBack} title={mode === 'edit' ? 'Edit User' : 'Add User'} />

      <div className="flex justify-center mb-6 sm:mb-8 flex-shrink-0">
        <div className="relative">
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at top, #F1F3F7 0%, #E6E9F0 100%)',
            }}
          ></div>

          <label className="absolute bottom-0 right-0 bg-white w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center shadow-md cursor-pointer border border-gray-200">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6B7280"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => e.target.files && setPreview(URL.createObjectURL(e.target.files[0]))}
            />
          </label>
        </div>
      </div>

      {/* Form - scrollable if needed */}
      <div className="flex-1 bg-white rounded-[24px] shadow-sm px-6 py-8 sm:px-10 sm:py-10 flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Fields */}
          <div className="relative flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-8 sm:gap-y-10">
            {/* Vertical Divider */}
            <span className="hidden sm:block absolute left-1/2 top-0 h-full w-px bg-gray-200" />

            {/* First Name */}
            <div className="sm:pr-10">
              <label className="block text-sm font-medium text-gray-800 mb-2">First Name</label>
              <input
                value={formData.firstName}
                onChange={handleChange('firstName')}
                placeholder="John"
                className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm text-gray-700
                     focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Email */}
            <div className="sm:pl-10">
              <label className="block text-sm font-medium text-gray-800 mb-2">Email Id</label>
              <input
                value={formData.email}
                onChange={handleChange('email')}
                placeholder="admin@abc.edu"
                className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm text-gray-700
                     focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Last Name */}
            <div className="sm:pr-10">
              <label className="block text-sm font-medium text-gray-800 mb-2">Last Name</label>
              <input
                value={formData.lastName}
                onChange={handleChange('lastName')}
                placeholder="Doe"
                className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm text-gray-700
                     focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Phone */}
            <div className="sm:pl-10">
              <label className="block text-sm font-medium text-gray-800 mb-2">Phone</label>
              <input
                value={formData.mobile}
                onChange={handleChange('mobile')}
                placeholder="+91 73854 XXXXX"
                className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm text-gray-700
                     focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 flex justify-center text-white">
            <button
              type="submit"
              className="px-10 py-2.5 rounded-full text-sm font-medium 
                   bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
                   shadow-md hover:shadow-lg transition-shadow "
            >
              Go Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
