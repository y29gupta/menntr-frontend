import { Path } from 'react-hook-form';

export type FormFieldOption = {
  label: string;
  value: string;
};

export type FieldType = 'text' | 'email' | 'number' | 'dropdown' | 'chip'| 'date';

export type InputType = 'text' | 'email' | 'number';

export type FormFieldConfig<T> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  type: FieldType;
  options?: FormFieldOption[];
  required?: boolean;
  dropdownPosition?: string;
  message?:string
};
