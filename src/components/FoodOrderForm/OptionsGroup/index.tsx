import React, { useEffect, useState } from "react";

import { Checkbox, Title } from "@mantine/core";
import { moneyFormat } from "@/utils";
import type { OptionDetail, Option, SelectedOptions } from "@/types/food";

import { v4 as uuidv4 } from "uuid";
import isEmpty from "lodash/isEmpty";
import startCase from "lodash/startCase";
interface OptionsGroupProps {
  option: Option;
  optionsChangedHandler: (category: string, detail: OptionDetail[]) => void;
  defaultValue: SelectedOptions;
}

function OptionsGroup({
  option,
  optionsChangedHandler,
  defaultValue,
}: OptionsGroupProps) {
  const [selectedOptionItems, setSelectedOptionItems] = useState<
    OptionDetail[]
  >(() => {
    return !isEmpty(defaultValue) ? defaultValue.detail : [];
  });

  useEffect(() => {
    optionsChangedHandler(option.category, selectedOptionItems);
  }, [selectedOptionItems]);

  const handleCheckboxChange = (optionItem: OptionDetail, checked: boolean) => {
    if (option.mandatory) {
      setSelectedOptionItems(checked ? [optionItem] : []);
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
      <Title order={6}>{startCase(option.category)}</Title>
      {option.detail.map((optionItem) => (
        <Checkbox
          key={uuidv4()}
          labelPosition="left"
          description={moneyFormat(optionItem.price, "VND", "vi-VN")}
          label={startCase(optionItem.name)}
          checked={
            !isEmpty(selectedOptionItems) &&
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
