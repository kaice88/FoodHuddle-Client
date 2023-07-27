import { useMemo } from "react";
import React from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { modals } from "@mantine/modals";

import type { FoodItem } from "@/types/food";

import ReusablePopover from "../Popover";
import OptionsList from "../OptionsList";
import { ActionIcon, Flex } from "@mantine/core";
import { IconEditCircle, IconEraser } from "@tabler/icons-react";
import FoodOrderForm from "../FoodOrderForm/FoodOrderForm";

const data: FoodItem[] = [
  {
    foodName: "Fish",
    originPrice: 10,
    quantity: 1,
    note: "Fresh fish",
    options: [
      { name: "Fresh", price: 0 },
      { name: "Not Fresh", price: 0 },
    ],
  },
  {
    foodName: "Burger",
    originPrice: 8,
    quantity: 2,
    note: "Burger without chips",
    options: [
      { name: "With Chips", price: 1.5 },
      { name: "Without Chips", price: 0 },
    ],
  },
  {
    foodName: "Pizza",
    originPrice: 12,
    quantity: 1,
    note: "Large Pizza",
    options: [
      { name: "Extra Cheese", price: 2 },
      { name: "Pepperoni", price: 2 },
      { name: "Mushrooms", price: 1.5 },
    ],
  },
  {
    foodName: "Salad",
    originPrice: 6,
    quantity: 1,
    note: "Caesar Salad",
    options: [
      { name: "Chicken", price: 3 },
      { name: "Shrimp", price: 4 },
    ],
  },
  {
    foodName: "Sushi",
    originPrice: 15,
    quantity: 2,
    note: "Assorted Sushi Rolls",
    options: [
      { name: "Soy Sauce", price: 0 },
      { name: "Wasabi", price: 0.5 },
      { name: "Ginger", price: 0.5 },
    ],
  },
  {
    foodName: "Pasta",
    originPrice: 9,
    quantity: 1,
    note: "Spaghetti Carbonara",
    options: [
      { name: "Garlic Bread", price: 2 },
      { name: "Parmesan Cheese", price: 1.5 },
    ],
  },
  {
    foodName: "Ice Cream",
    originPrice: 4,
    quantity: 3,
    note: "Vanilla Ice Cream",
    options: [
      { name: "Chocolate Syrup", price: 1 },
      { name: "Sprinkles", price: 0.5 },
    ],
  },
  {
    foodName: "Chicken Wings",
    originPrice: 8,
    quantity: 1,
    note: "Buffalo Wings",
    options: [
      { name: "Mild", price: 0 },
      { name: "Hot", price: 0 },
      { name: "BBQ", price: 0 },
    ],
  },
  {
    foodName: "Steak",
    originPrice: 20,
    quantity: 1,
    note: "Ribeye Steak",
    options: [
      { name: "Rare", price: 0 },
      { name: "Medium Rare", price: 0 },
      { name: "Medium", price: 0 },
      { name: "Well Done", price: 0 },
    ],
  },
  {
    foodName: "Fries",
    originPrice: 3,
    quantity: 2,
    note: "Crispy French Fries",
    options: [
      { name: "Ketchup", price: 0 },
      { name: "Mayonnaise", price: 0 },
      { name: "Cheese", price: 1 },
    ],
  },
];

function FoodItemsTable() {
  const columns = useMemo<MRT_ColumnDef<FoodItem>[]>(
    () => [
      {
        header: "Actions",
        enableEditing: false,
        Cell: ({ row }) => {
          console.log(row._valuesCache);
          return (
            <Flex
              mih={50}
              gap="md"
              justify="center"
              align="center"
              direction="row"
              wrap="nowrap"
            >
              <ActionIcon
                onClick={() => {
                  modals.open({
                    title: "Edit Food Order",
                    children: <FoodOrderForm foodItem={row._valuesCache} />,
                  });
                }}
                color="blue"
              >
                <IconEditCircle />
              </ActionIcon>
              <ActionIcon>
                <IconEraser color="red" />
              </ActionIcon>
            </Flex>
          );
        },
        mantineTableHeadCellProps: {
          align: "center",
        },
        mantineTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "foodName", //access nested data with dot notation
        header: "Food",
        mantineTableHeadCellProps: {
          align: "center",
        },
        mantineTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "originPrice", //access nested data with dot notation
        header: "Original Price",
        size: 30,
        mantineTableHeadCellProps: {
          align: "center",
        },
        mantineTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
        size: 30,
        mantineTableHeadCellProps: {
          align: "center",
        },
        mantineTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "note", //normal accessorKey
        header: "Note",
        mantineTableHeadCellProps: {
          align: "center",
        },
        mantineTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "options",
        header: "Options Name",
        Cell: ({ cell }) => {
          const options: Option[] = cell.getValue();
          return (
            <ReusablePopover
              buttonText="Show Options"
              popoverContent={<OptionsList options={options} />}
            />
          );
        },
        mantineTableHeadCellProps: {
          align: "center",
        },
        mantineTableBodyCellProps: {
          align: "center",
        },
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data,
    enableTopToolbar: false,
  });

  return <MantineReactTable table={table} />;
}

export default FoodItemsTable;
