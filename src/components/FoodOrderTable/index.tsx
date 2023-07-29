import { useMemo } from "react";
import React from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { modals } from "@mantine/modals";

import ReusablePopover from "../Popover";
import OptionsList from "../OptionsList";
import { ActionIcon, Flex } from "@mantine/core";
import { IconEditCircle, IconEraser } from "@tabler/icons-react";

import useFoodStore from "@/store/foodStore";
function FoodOrderTable() {
  const foodOrderList = useFoodStore((state) => state.foodOrderList);

  return <div>Table</div>;
}

export default FoodOrderTable;
