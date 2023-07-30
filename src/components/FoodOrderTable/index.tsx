import { useEffect, useMemo } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";

import useModal from "@/hooks/useModal";
import useFoodStore from "@/store/foodStore";

import { ActionIcon, Group, Loader } from "@mantine/core";
import { IconEditCircle, IconEraser } from "@tabler/icons-react";

import EditOrderForm from "../FoodOrderForm/Edit";
import { FoodOrderItem } from "@/types/food";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import { find, isEmpty } from "lodash";
import { moneyFormat } from "@/utils";
import { calculateFoodOrderListTotal } from "@/utils/food";
import useOrder from "@/hooks/useOrder";

function FoodOrderTable() {
  const { sessionId } = useParams();
  const deleteFoodOrderItem = useFoodStore(
    (state) => state.deleteFoodOrderItem
  );
  const foodOrderList = useFoodStore((state) => state.foodOrderList);

  const { isFetchingFoodOrder, mutate, isSubmitting } = useOrder(
    parseInt(sessionId!)
  );

  console.log(isSubmitting);
  const columns = useMemo<MRT_ColumnDef<FoodOrderItem>[]>(
    () => [
      { accessorKey: "foodName", header: "Food" },
      {
        accessorKey: "originPrice",
        header: "OriginPrice",
        Cell: ({ row }) => {
          return moneyFormat(row.getValue("originPrice"), "VND", "vi-VN");
        },
      },
      { accessorKey: "quantity", header: "Quantity" },
      { accessorKey: "note", header: "Note" },
      {
        accessorKey: "id",
        header: "Actions",
        Cell: ({ row }) => {
          const id = row.getValue("id");
          const { openModal } = useModal(
            "EDIT",
            <EditOrderForm foodOrderItem={find(foodOrderList, { id })} />
          );

          return (
            <Group>
              {" "}
              <ActionIcon
                onClick={() => {
                  openModal();
                }}
              >
                <IconEditCircle />
              </ActionIcon>
              <ActionIcon
                onClick={() => {
                  deleteFoodOrderItem(id);
                }}
              >
                <IconEraser />
              </ActionIcon>
            </Group>
          );
        },
      },
    ],
    [foodOrderList]
  );

  const table = useMantineReactTable({
    columns,
    data: foodOrderList!,
    state: { density: "xs" },
    enableTopToolbar: false,
    enableBottomToolbar: false,
  });

  if (isFetchingFoodOrder) {
    return <Loader />;
  }

  return (
    <>
      {" "}
      <MantineReactTable table={table} />;
      <Group position="right">
        {" "}
        <Button
          loading={isSubmitting}
          onClick={() => {
            mutate({
              sessionId: parseInt(sessionId!),
              foodOrderList,
            });
          }}
        >
          {"Place order total of: " +
            calculateFoodOrderListTotal(foodOrderList)}{" "}
        </Button>
      </Group>
    </>
  );
}

export default FoodOrderTable;
