import React, { useEffect, useState } from "react";

import { OptionCategory } from "@/types/food";
import { Checkbox, Title, Text } from "@mantine/core";
import { moneyFormat } from "@/utils";
import type { Option } from "@/types/food";
import isNull from "lodash/isNull";

type OptionsGroupProps = {
  optionCategory: OptionCategory;
  setFieldValue: (option: Option | null) => void;
};

function OptionsGroup({ optionCategory, setFieldValue }: OptionsGroupProps) {
  const [selectedOptionItem, setSelectedOptionItem] = useState<Option | null>(
    null
  );

  useEffect(() => {
    setFieldValue(selectedOptionItem);
  }, [selectedOptionItem]);

  return (
    <div>
      <Title order={6}>{optionCategory.name}</Title>
      {optionCategory.optionItems.map((optionItem) => (
        <Checkbox
          key={Math.random().toString(36)}
          labelPosition="left"
          description={moneyFormat(optionItem.price, "VND", "vi-VN")}
          label={optionItem.name}
          checked={
            !isNull(selectedOptionItem) &&
            selectedOptionItem.name === optionItem.name
          }
          onChange={(event) => {
            const checked = event.currentTarget.checked;

            if (checked) setSelectedOptionItem(optionItem);
            if (!checked) setSelectedOptionItem(null);
          }}
        />
      ))}
    </div>
  );
}

export default OptionsGroup;
