import { List, ThemeIcon } from "@mantine/core";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import type { Option } from "@/types/food";

interface OptionsListProp {
  options: Option[];
}

function OptionsList({ options }: OptionsListProp) {
  return (
    <List
      spacing="xs"
      size="sm"
      center
      icon={
        <ThemeIcon color="teal" size={24} radius="xl">
          <IconShoppingCartPlus size="1rem" />
        </ThemeIcon>
      }
    >
      {options.map((option) => (
        <List.Item>
          {option.name} : {option.price}
        </List.Item>
      ))}
    </List>
  );
}

export default OptionsList;
