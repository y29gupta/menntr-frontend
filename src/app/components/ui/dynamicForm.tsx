'use client';

import {
  Controller,
  useForm,
  FieldValues,
  SubmitHandler,
  DefaultValues,
  Resolver,
  UseFormReturn,
} from 'react-hook-form';

import FormDropdown from '@/app/ui/FormDropdown';
import FormField from '@/app/ui/FormField';
import { FormFieldConfig, InputType, FieldType } from './form.type';
import { ZodSchema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { StudentFormValues } from '../dashboards/institution-admin/student-management/student.types';
import FormChip from './FormChip';
import DateInput from './FormDate';
// import { studentSetupFormValue } from '../dashboards/institution-admin/student-management/createStudent/student.schema';

type FormLayout = 'single' | 'two-column';

type FieldGroup<T extends FieldValues> = {
  title?: string;
  fields: FormFieldConfig<T>[];
};

type Props<T extends FieldValues> = {
  // title: string;
  fields?: FormFieldConfig<T>[]; // existing
  groups?: FieldGroup<T>[]; // ✅ new (optional)
  // message?: string;
  form: UseFormReturn<T>;
  layout?: FormLayout;
};

// type Props<T extends FieldValues> = {
//   title: string;
//   fields: FormFieldConfig<T>[];

//   form: UseFormReturn<T>;
//   layout?: FormLayout;
// };

type InputFieldType = 'text' | 'email' | 'number';

const inputTypeMap: Record<InputFieldType, InputType> = {
  text: 'text',
  email: 'email',
  number: 'number',
};

// function isInputField(type: FieldType): type is InputFieldType {
//   return type !== 'dropdown';
// }

function isInputField(type: FieldType): type is InputFieldType {
  return type === 'text' || type === 'email' || type === 'number';
}

export default function DynamicForm<T extends FieldValues>({
  // title,
  fields,
  // defaultValues,
  // message,
  // onCancel,
  groups,
  layout,
  form,
}: Props<T>) {
  const isTwoColumn = layout === 'two-column';

  const {
    control,
    formState: { errors },
  } = form;

  const renderFields = (fields: FormFieldConfig<T>[]) => (
    <div className={`grid gap-6 ${isTwoColumn ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
      {fields.map((field) => {
        if (field.type === 'dropdown') {
          return (
            <Controller
              key={field.name}
              name={field.name}
              control={control}
              render={({ field: ctrl }) => (
                <div className="flex flex-col gap-1">
                  <label className="text-[16px] font-medium !text-[#1A2C50]">{field.label}</label>

                  <FormDropdown
                    placeholder={field.label}
                    options={field.options ?? []}
                    value={ctrl.value}
                    onChange={ctrl.onChange}
                    triggerClassName="pt-0.2"
                    searchable={true}
                  />

                  {errors[field.name] && (
                    <p className="text-xs text-red-500">{errors[field.name]?.message as string}</p>
                  )}
                </div>
              )}
            />
          );
        }
        if (field.type === 'chip') {
          return (
            <Controller
              key={String(field.name)}
              name={field.name}
              control={control}
              render={({ field: ctrl }) => (
                <FormChip
                  label={field.label}
                  value={ctrl.value}
                  options={field.options ?? []}
                  onChange={ctrl.onChange}
                />
              )}
            />
          );
        }

        if (field.type === 'date') {
          return (
            <Controller
              key={String(field.name)}
              name={field.name}
              control={control}
              render={({ field: ctrl }) => (
                <DateInput label={field.label} value={ctrl.value} onChange={ctrl.onChange} />
              )}
            />
          );
        }
        if (!isInputField(field.type)) return null;

        const inputType = inputTypeMap[field.type];

        return (
          <Controller
            key={field.name}
            name={field.name}
            control={control}
            render={({ field: ctrl }) => (
              <div className="flex flex-col gap-1">
                <FormField
                  label={field.label}
                  placeholder={field.placeholder}
                  type={inputType}
                  {...ctrl}
                />
                {field.message ? (
                  <span className="text-[#4577F8] py-1 text-[12px] font-[500]">
                    {field.message}
                  </span>
                ) : (
                  ''
                )}

                {errors[field.name] && (
                  <p className="text-xs text-red-500">{errors[field.name]?.message as string}</p>
                )}
              </div>
            )}
          />
        );
      })}
    </div>
  );

  return (
    <>
      {/* <div className="relative  border px-6 pt-6 pb-8 rounded-3xl border-[#DBE3E9]"> */}
      {/* Vertical divider – desktop only */}
      {isTwoColumn && (
        <div className="absolute my-4 top-6 bottom-8 left-1/2 w-px bg-[#DBE3E9] hidden md:block" />
      )}

      {groups ? (
        groups.map((group, index) => (
          <div
            key={index}
            className="relative   border border-[#DBE3E9] px-6 pt-6 pb-8 rounded-3xl  mb-8"
          >
            {group.title && (
              <p className="text-[18px] font-semibold !text-[#1A2C50] pb-6">{group.title}</p>
            )}

            {renderFields(group.fields)}
          </div>
        ))
      ) : (
        <div className="relative border px-6 pt-6 pb-8 rounded-3xl border-[#DBE3E9]">
          {renderFields(fields ?? [])}
        </div>
      )}

      {/* <div className={`grid gap-6 ${isTwoColumn ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
          {fields?.map((field) => {
            if (field.type === 'dropdown') {
              return (
                <Controller
                  key={field.name}
                  name={field.name}
                  control={control}
                  render={({ field: ctrl }) => (
                    <div className="flex flex-col gap-1">
                      <label className="text-[16px] font-medium text-[#1A2C50]">
                        {field.label}
                      </label>

                      <FormDropdown
                        placeholder={field.label}
                        options={field.options ?? []}
                        value={ctrl.value}
                        onChange={ctrl.onChange}
                        triggerClassName="pt-0.2"
                      />

                      {errors[field.name] && (
                        <p className="text-xs text-red-500">
                          {errors[field.name]?.message as string}
                        </p>
                      )}
                    </div>
                  )}
                />
              );
            }

            if (!isInputField(field.type)) return null;

            const inputType = inputTypeMap[field.type];

            return (
              <Controller
                key={field.name}
                name={field.name}
                control={control}
                render={({ field: ctrl }) => (
                  <div className="flex flex-col gap-1">
                    <FormField
                      label={field.label}
                      placeholder={field.placeholder}
                      type={inputType}
                      {...ctrl}
                    />

                    {errors[field.name] && (
                      <p className="text-xs text-red-500">
                        {errors[field.name]?.message as string}
                      </p>
                    )}
                  </div>
                )}
              />
            );
          })}
        </div> */}
      {/* </div> */}

      {/* <div className="flex justify-center gap-4">
        <button
          type="submit"
          className=" bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
            !text-white hover:bg-[#6D28D9] py-2 px-4 rounded-[64px]"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Go Next'}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="border border=[#904BFF] px-4 py-2 !text-[#904BFF] rounded-[64px]"
        >
          Cancel
        </button>
      </div> */}
    </>
  );
}
