import { Flex, Input, Typography } from 'antd';
import { InputType } from '../components/ui/form.type';

type Props = {
  name?: string;
  label: string;
  placeholder?: string;
  type: InputType;

  // RHF
  register?: (name: string) => any;

  // Controller support
  value?: any;
  onChange?: (...event: any[]) => void;
  onBlur?: () => void;
};

export default function FormField({
  name,
  label,
  placeholder,
  type,
  register,
  value,
  onChange,
  onBlur,
}: Props) {
  return (
    <div className="flex  flex-col gap-1">
      {/* <Flex vertical gap={12}>
        <div>
          <Typography.Title level={5}>{label}</Typography.Title>
          <Input
            type={type}
            placeholder={placeholder ?? label}
            {...(register && name
              ? register(name) // ✅ register mode
              : {
                  value,
                  onChange,
                  onBlur, // ✅ controller mode
                })}
            variant="underlined"
            style={{
              paddingLeft: 4,
              paddingRight: 4,
            }}
          />
        </div>
      </Flex> */}
      <label className="text-sm  !text-[#0F172A]">{label}</label>

      <Input
        type={type}
        placeholder={placeholder ?? label}
        {...(register && name
          ? register(name) // ✅ register mode
          : {
              value,
              onChange,
              onBlur, // ✅ controller mode
            })}
        variant="underlined"
        style={{
          paddingLeft: 4,
          paddingRight: 4,
        }}
      />
    </div>
  );
}
