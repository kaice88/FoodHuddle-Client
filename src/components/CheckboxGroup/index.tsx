import React, { useEffect, useState } from "react";
import { Checkbox, Group, Title } from "@mantine/core";

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  label: string;
  formFieldName: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  label,
  formFieldName,
  ...restProps
}) => {
  const [value, setValue] = useState<string>("");
  const { form } = restProps;

  useEffect(() => {
    form.setValues({
      [label]: value,
    });
  }, [value]);

  return (
    <div>
      <Title order={5}>{label}</Title>
      <Group>
        {options.map((option) => (
          <Checkbox
            checked={value === option.value}
            onChange={() => {
              setValue(option.value);
            }}
            label={option.label}
          />
        ))}
      </Group>
    </div>
  );
};

export default CheckboxGroup;
