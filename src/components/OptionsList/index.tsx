import { List, ThemeIcon } from "@mantine/core";
import { IconCategory, IconShoppingCartPlus } from "@tabler/icons-react";
import type { SelectedOptions } from "@/types/food";
import { startCase } from "lodash";

interface OptionsListProp {
  options: SelectedOptions[];
}

function OptionsList({ options }: OptionsListProp) {
  const selectedOptions = options.filter((o) => o.detail.length > 0);
  return (
    <List
      spacing="xs"
      size="sm"
      center
      icon={
        <ThemeIcon>
          <IconCategory />
        </ThemeIcon>
      }
    >
      {selectedOptions.map((category) => (
        <List.Item>
          {category.category}
          <List
            icon={
              <ThemeIcon>
                <IconShoppingCartPlus />
              </ThemeIcon>
            }
          >
            {" "}
            {category.detail.map((o) => (
              <List.Item>
                {o.name} : {o.price}
              </List.Item>
            ))}
          </List>
        </List.Item>
      ))}
    </List>
  );
}

export default OptionsList;
