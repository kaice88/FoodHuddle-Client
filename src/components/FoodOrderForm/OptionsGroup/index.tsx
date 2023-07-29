import React, { useEffect, useState } from "react";

import { OptionCategory } from "@/types/food";
import { Checkbox, Title, Text } from "@mantine/core";
import { moneyFormat } from "@/utils";
import type { Option } from "@/types/food";

import isNull from "lodash/isNull";
import { v4 as uuidv4 } from "uuid";

type OptionsGroupProps = {
  optionCategory: OptionCategory;
  optionsChangedHandler: (
    optionCategory: string,
    option: Option[] | null
  ) => void;
};

function OptionsGroup({
  optionCategory,
  optionsChangedHandler,
}: OptionsGroupProps) {
  const [selectedOptionItems, setSelectedOptionItems] = useState<Option[]>([]);

  useEffect(() => {
    console.log(selectedOptionItems);
    optionsChangedHandler(optionCategory.name, selectedOptionItems);
  }, [selectedOptionItems]);

  const handleCheckboxChange = (optionItem: Option, checked: boolean) => {
    if (optionCategory.mandatory) {
      setSelectedOptionItems(checked ? [optionItem] : null);
    } else {
      setSelectedOptionItems((prevSelectedOptionItems) =>
        checked
          ? [...(prevSelectedOptionItems || []), optionItem]
          : (prevSelectedOptionItems || []).filter(
              (option) => option.name !== optionItem.name
            )
      );
    }
  };

  return (
    <div>
      <Title order={6}>{optionCategory.name}</Title>
      {optionCategory.optionItems.map((optionItem) => (
        <Checkbox
          key={uuidv4()}
          labelPosition="left"
          description={moneyFormat(optionItem.price, "VND", "vi-VN")}
          label={optionItem.name}
          checked={
            !isNull(selectedOptionItems) &&
            selectedOptionItems.some(
              (option) => option.name === optionItem.name
            )
          }
          onChange={(event) => {
            const checked = event.currentTarget.checked;
            handleCheckboxChange(optionItem, checked);
          }}
        />
      ))}
    </div>
  );
}

export default OptionsGroup;
