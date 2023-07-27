import { FoodItem } from "@/types/food";
import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  NumberInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";

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
        <TextInput disabled label="Food" {...form.getInputProps("foodName")} />
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

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default FoodOrderForm;
