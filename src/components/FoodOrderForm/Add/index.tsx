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

import useModal from "@/hooks/useModal";
import OptionsGroup from "../OptionsGroup";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";

import { PriceDisplay } from "../../FoodMenu/FoodMenuItem";

import useFoodStore from "@/store/foodStore";
const { closeModal } = useModal();
interface AddOrderFormProps {
  menuItem: MenuItem;
}

function AddOrderForm({ menuItem }: AddOrderFormProps) {
  const addFoodOrderItem = useFoodStore((state) => state.addFoodOrderItem);

  const mandatoryOptions = menuItem.options.filter(
    (option) => option.mandatory
  );

  const optionalOptions = menuItem.options.filter(
    (option) => option.mandatory === false
  );

  const validate = {};

  mandatoryOptions.forEach((option) => {
    validate[option.name] = (value) =>
      isEmpty(value) ? `${option.name} is required!` : null;
  });
  const form = useForm({
    initialValues: {
      quantity: 1,
      note: "",
    },
    validate,
  });

  const optionsChangedHandler = (field: string, value: Option[]) => {
    form.setFieldValue(field, value);
  };

  const submitHandler = form.onSubmit((values) => {
    const { note, quantity, ...restOptions } = values;

    const foodOrderItem: FoodOrderItem = {
      foodName: menuItem.foodName,
      originPrice:
        menuItem.discountPrice > 0 ? menuItem.discountPrice : menuItem.price,
      note,
      quantity,
      options: [
        ...Object.entries(restOptions).map(([category, detail]) => ({
          category,
          detail,
        })),
      ],
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
                  optionsChangedHandler={optionsChangedHandler}
                  key={option.id}
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
          <Button type="submit">Add</Button>
        </Group>
      </form>
    </Box>
  );
}

export default AddOrderForm;
