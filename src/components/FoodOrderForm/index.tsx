import { FoodOrderItem, MenuItem, Option } from "@/types/food";
import {
  Button,
  Group,
  Box,
  Textarea,
  ScrollArea,
  Flex,
  Text,
  NumberInput,
  Title,
  em,
  Spoiler,
} from "@mantine/core";

import { UseFormReturnType, useForm } from "@mantine/form";

import useModal from "@/hooks/useModal";
import OptionsGroup from "./OptionsGroup";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import isNull from "lodash/isNull";
import FoodMenuItem, { PriceDisplay } from "../FoodMenu/FoodMenuItem";
import { key } from "localforage";
import useFoodStore from "@/store/foodStore";
const { closeModal } = useModal();
interface FoodOrderFormProps {
  menuItem: MenuItem;
}

function FoodOrderForm({ menuItem }: FoodOrderFormProps) {
  const addFoodOrderItem = useFoodStore((state) => state.addFoodOrderItem);
  const mandatoryOptions = menuItem.options.filter(
    (option) => option.mandatory
  );

  const validate = {};

  mandatoryOptions.forEach((option) => {
    validate[option.name] = (value: Option) =>
      isNull(value) ? `${option.name} is required` : null;
  });

  const form = useForm({
    initialValues: {
      quantity: 1,
      note: "",
    },
    validate,
  });

  const fieldChangeHandler = (field: string, value: any) => {
    form.setFieldValue(field, value);
  };

  const submitHandler = form.onSubmit((values) => {
    const { note, quantity, ...rest } = values;

    const foodOrderItem: FoodOrderItem = {
      id: menuItem.id,
      foodName: menuItem.foodName,
      quantity,
      note,
      originPrice:
        menuItem.discountPrice > 0 ? menuItem.discountPrice : menuItem.price,
      options: Object.entries(rest).map(([key, value]) => ({
        category: key,
        detail: value as Option,
      })),
    };

    addFoodOrderItem(foodOrderItem);
    closeModal();
  });

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={submitHandler}>
        <div className="foodMenuItem menuItemForm">
          <div className="foodMenuItem__imageWrapper">
            {" "}
            <img src={menuItem.photo} />
          </div>
          <div className="foodMenuItem__info">
            <Spoiler maxHeight={40} showLabel="Show more" hideLabel="Hide">
              <Title lineClamp={2} order={6} fw={500}>
                {menuItem.foodName}
              </Title>
              <Text>{menuItem.description}</Text>
            </Spoiler>

            <Flex justify={"space-between"} align="flex-end">
              <PriceDisplay
                discountPrice={menuItem.discountPrice}
                price={menuItem.price}
              />
              <NumberInput
                maw={60}
                min={1}
                size="xs"
                {...form.getInputProps("quantity")}
              />
            </Flex>
          </div>
        </div>

        <Textarea autosize label="Note" {...form.getInputProps("note")} />

        <ScrollArea mt={8} h={200}>
          <Flex direction="column" gap={16}>
            {" "}
            {menuItem.options.map((option) => (
              <Flex key={option.id} direction="column">
                <OptionsGroup
                  key={option.id}
                  setFieldValue={(optionItem) => {
                    fieldChangeHandler(option.name, optionItem);
                  }}
                  optionCategory={option}
                />
                {!isEmpty(get(form.errors, `${option.name}`)) && (
                  <Text color="red" size="sm">
                    {get(form.errors, option.name)}
                  </Text>
                )}
              </Flex>
            ))}
          </Flex>
        </ScrollArea>

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default FoodOrderForm;
