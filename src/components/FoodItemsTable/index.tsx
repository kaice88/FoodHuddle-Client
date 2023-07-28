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

import FoodOrderForm from "../FoodOrderForm";

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
];

function FoodItemsTable() {
  const columns = useMemo<MRT_ColumnDef<FoodItem>[]>(
    () => [
      {
        header: "Actions",
        enableEditing: false,
        Cell: ({ row }) => {
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
        size: 30,
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
        size: 30,
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
        size: 30,
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
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data,
    enableTopToolbar: false,
    enableColumnResizing: false,
  });

  return <MantineReactTable table={table} />;
}

export default FoodItemsTable;
