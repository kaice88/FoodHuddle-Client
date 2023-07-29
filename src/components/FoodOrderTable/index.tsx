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

import useModal from "@/hooks/useModal";
import useFoodStore from "@/store/foodStore";
import { Button } from "antd";
import EditOrderForm from "../FoodOrderForm/Edit";
function FoodOrderTable() {
  const foodOrderList = useFoodStore((state) => state.foodOrderList);
  const { openModal } = useModal(
    "EDIT",
    <EditOrderForm foodOrderItem={foodOrderList[0]} />
  );
  console.log(foodOrderList);
  return (
    <div>
      <Button
        onClick={() => {
          openModal();
        }}
      >
        Edit
      </Button>
    </div>
  );
}

export default FoodOrderTable;
