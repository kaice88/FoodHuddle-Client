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
  Spoiler,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { v4 as uuidv4 } from "uuid";

import useModal from "@/hooks/useModal";
import OptionsGroup from "../OptionsGroup";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import find from "lodash/find";

import { PriceDisplay } from "../../FoodMenu/FoodMenuItem";

import useFoodStore from "@/store/foodStore";
import { useMemo } from "react";
import { options } from "@/components/Navbar/Options";
const { closeModal } = useModal();
interface EditOrderFormProps {
  foodOrderItem: FoodOrderItem;
}

function EditOrderForm({ foodOrderItem }: EditOrderFormProps) {
  const currentMenu = useFoodStore((state) => state.currentMenu);
  const menuItem = useMemo(() => {
    const menuItem = find(currentMenu, { foodName: foodOrderItem.foodName });

    return menuItem;
  }, []);

  const updateFoodOrderItem = useFoodStore(
    (state) => state.updateFoodOrderItem
  );

  const mandatoryOptions = menuItem!.options.filter(
    (option) => option.mandatory
  );

  const validate = {};

  mandatoryOptions.forEach((option) => {
    validate[option.name] = (value) =>
      isEmpty(value) ? `${option.name} is required!` : null;
  });

  const form = useForm({
    initialValues: {
      quantity: foodOrderItem.quantity,
      note: foodOrderItem.note,
    },
    validate,
  });

  const optionsChangedHandler = (field: string, value: Option[]) => {
    form.setFieldValue(field, value);
  };

  const submitHandler = form.onSubmit((values) => {
    const { note, quantity, ...restOptions } = values;

    const updatedFoodOrderItem: FoodOrderItem = {
      ...foodOrderItem,
      note,
      quantity,
      options: [
        ...Object.entries(restOptions).map(([category, detail]) => ({
          category,
          detail,
        })),
      ],
    };
    console.log(foodOrderItem);
    updateFoodOrderItem(foodOrderItem);
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
                  optionsChangedHandler={optionsChangedHandler}
                  key={option.id}
                  optionCategory={option}
                  defaultValue={find(get(foodOrderItem, "options"), {
                    category: option.name,
                  })}
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
          <Button color="blue" type="submit">
            Edit
          </Button>
        </Group>
      </form>
    </Box>
  );
}

export default EditOrderForm;
