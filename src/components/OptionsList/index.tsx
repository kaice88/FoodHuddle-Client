import { List } from "@mantine/core";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import startCase from "lodash/startCase";

import type { OptionDetail, SelectedOptions } from "@/types/food";
import { moneyFormat } from "@/utils";

interface OptionsListProp {
  options: SelectedOptions[];
}

function OptionsList({ options }: OptionsListProp) {
  let selectedOptions: OptionDetail[] = [];

  options
    .filter((o) => o.detail.length > 0)
    .forEach((o) => {
      selectedOptions = selectedOptions.concat(o.detail);
    });

  return (
    <List
      center
      spacing="xs"
      size="xs"
      icon={<IconShoppingCartPlus size={16} />}
    >
      {selectedOptions.map((o) => (
        <List.Item>
          {`${startCase(o.name)} : ${moneyFormat(o.price, "VND", "vi-VN")}`}
        </List.Item>
      ))}
    </List>
  );
}

export default OptionsList;
