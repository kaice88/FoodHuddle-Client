import { useEffect, useMemo } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";

import useModal from "@/hooks/useModal";
import useFoodStore from "@/store/foodStore";

import type { FoodOrderItem } from "@/types/food";
import { ActionIcon, Group, Text, Button } from "@mantine/core";
import { IconEditCircle, IconEraser } from "@tabler/icons-react";

import ReusablePopover from "../Popover";
import EditOrderForm from "../FoodOrderForm/Edit";
import { useParams } from "react-router-dom";

import { find } from "lodash";
import { moneyFormat } from "@/utils";
import { calculateFoodOrderListTotal, isOptionsEmpty } from "@/utils/food";
import { fetchFoodOrderList, editFoodOrderList } from "@/hooks/useOrder";
import OptionsList from "../OptionsList";

function FoodOrderTable() {
  const { sessionId } = useParams();
  const setFoodOrderList = useFoodStore((state) => state.setFoodOrderList);
  const foodOrderList = useFoodStore((state) => state.foodOrderList);

  const deleteFoodOrderItem = useFoodStore(
    (state) => state.deleteFoodOrderItem
  );

  const columns: MRT_ColumnDef<FoodOrderItem[]> = useMemo(
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
      {
        accessorKey: "options",
        header: "Options",
        Cell: ({ row }) => {
          const options = row.getValue("options");
          if (isOptionsEmpty(options)) {
            return <Text>No options</Text>;
          }
          return (
            <ReusablePopover
              title={"Options"}
              popoverContent={<OptionsList options={row.getValue("options")} />}
            />
          );
        },
      },
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
    data: foodOrderList,
    state: {
      density: "xs",
    },
    enableTopToolbar: false,
  });

  useEffect(() => {
    const init = async () => {
      try {
        const foodOrderList = await fetchFoodOrderList(parseInt(sessionId!));
        setFoodOrderList(foodOrderList!);
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, []);

  return (
    <>
      {" "}
      <MantineReactTable table={table} />
      <Group position="right">
        <Button
          onClick={() => {
            editFoodOrderList({
              sessionId: parseInt(sessionId!),
              foodOrderList,
            });
          }}
        >
          {"Submit order total of: " +
            moneyFormat(
              calculateFoodOrderListTotal(foodOrderList),
              "VND",
              "vi-VN"
            )}{" "}
        </Button>
      </Group>
    </>
  );
}

export default FoodOrderTable;
