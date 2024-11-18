import { Form, Input, InputProps } from "antd";

import { Rule } from "rc-field-form/lib/interface";
import { Key, useState } from "react";

interface KzmInputProps extends InputProps {
  key?: Key | null | undefined;
  label: string;
  value?: string;
  rules?: Rule[];
  hasFeedback?: boolean;
}

const KzmInput = (props: KzmInputProps) => {
  const {
    key,
    inputMode,
    className = "",
    value = "",
    disabled,
    name,
    label,
    hasFeedback,
    placeholder,
    rules = [
      {
        required: true,
        message: (
          <div className="flex justify-end text-red-500 p-1">该项为必选项</div>
        ),
      },
    ],
  } = props;

  // const [content,setContet] = useState<string>(value)

  return (
    <Form.Item
      key={key}
      className={"m-0 border-none " + className}
      rules={rules}
      name={name}
      initialValue={value}
    >
      <Input
      key={key}
      value={value}
      disabled={disabled}
        inputMode={inputMode}
        placeholder={placeholder}
        prefix={
          <div style={{ minWidth: "9rem" }} className="text-secondary7">
            {label}
          </div>
        }
        className="bg-secondary1 pl-4 pt-3 pb-3 text-lg text-secondary7 m-0 border-none"
      />
    </Form.Item>
  );
};

export default KzmInput;
