import { FoodItem } from "@/types/food";
import {
  TextInput,
  Button,
  Group,
  Box,
  NumberInput,
  Textarea,
  Stack,
  Checkbox,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { modals } from "@mantine/modals";
import CheckboxGroup from "../CheckboxGroup";

interface FoodOrderFormProp {
  foodItem: FoodItem;
}

function FoodOrderForm({ foodItem }: FoodOrderFormProp) {
  const form = useForm({
    initialValues: {
      foodName: foodItem.foodName,
      originPrice: foodItem.originPrice,
      quantity: foodItem.quantity,
      note: foodItem.note,
    },
  });

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack spacing={"md"}>
          {" "}
          <TextInput
            disabled
            label="Food"
            {...form.getInputProps("foodName")}
          />
          <NumberInput
            disabled
            label="Origin Price"
            {...form.getInputProps("originPrice")}
          />
          <NumberInput label="Quantity" {...form.getInputProps("quantity")} />
          <Textarea
            label="Notes"
            placeholder="No onions please..."
            {...form.getInputProps("note")}
          />
          <CheckboxGroup
            form={form}
            formFieldName="size"
            label="Size"
            options={[
              { value: "react", label: "React" },
              { value: "svelte", label: "Svelte" },
            ]}
          />
        </Stack>
        <Group position="right" mt="md">
          <Button
            type="submit"
            onClick={() => {
              modals.closeAll();
            }}
          >
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
}

export default FoodOrderForm;
