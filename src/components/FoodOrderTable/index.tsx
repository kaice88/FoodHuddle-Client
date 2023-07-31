import { useEffect, useMemo } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";

import useModal from "@/hooks/useModal";
import useFoodStore from "@/store/foodStore";

import type { FoodOrderItem } from "@/types/food";
import { ActionIcon, Group, Text, Button, Title, Flex } from "@mantine/core";
import {
  IconEditCircle,
  IconEraser,
  IconShoppingBagCheck,
} from "@tabler/icons-react";

import ReusablePopover from "../Popover";
import EditOrderForm from "../FoodOrderForm/Edit";
import { useParams } from "react-router-dom";

import { find } from "lodash";
import { moneyFormat } from "@/utils";
import {
  calculateFoodOrderItemTotal,
  calculateFoodOrderListTotal,
  isOptionsEmpty,
} from "@/utils/food";
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
        size: 100,
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
        mantineTableHeadCellProps: {
          align: "center",
        },
        mantineTableBodyCellProps: {
          align: "center",
        },
        size: 100,
      },
      {
        accessorKey: "options",
        header: "Options",
        size: 250,
        mantineTableHeadCellProps: {
          align: "center",
        },
        mantineTableBodyCellProps: {
          align: "left",
        },
        Cell: ({ row }) => {
          const options = row.getValue("options");
          if (isOptionsEmpty(options)) {
            return <Text>No options</Text>;
          }
          return <OptionsList options={row.getValue("options")} />;
          // return (
          //   <ReusablePopover
          //     title="Options"
          //     popoverContent={<OptionsList options={row.getValue("options")} />}
          //   />
          // );
        },
      },
      {
        accessorKey: "total",
        header: "Total",
        mantineTableHeadCellProps: {
          align: "center",
        },
        mantineTableBodyCellProps: {
          align: "center",
        },
        Cell: ({ row }) => {
          return (
            <Text fw={700} sx={{ color: "#FF6B00" }}>
              {moneyFormat(
                calculateFoodOrderItemTotal(row._valuesCache),
                "VND",
                "vi-VN"
              )}
            </Text>
          );
        },
        size: 100,
      },
      { accessorKey: "note", header: "Note" },
      {
        accessorKey: "id",
        mantineTableHeadCellProps: {
          align: "center",
        },
        mantineTableBodyCellProps: {
          align: "center",
        },
        header: "Actions",
        Cell: ({ row }) => {
          const id = row.getValue("id");
          const { openModal } = useModal(
            <Title order={4}>{"Order Customization"}</Title>,
            <EditOrderForm foodOrderItem={find(foodOrderList, { id })} />
          );

          return (
            <Flex align="center" justify="center">
              {" "}
              <ActionIcon
                color="blue"
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
                color="red"
              >
                <IconEraser />
              </ActionIcon>
            </Flex>
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
      density: "xl",
    },
    enableTopToolbar: false,
    enableBottomToolbar: false,
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
    <Flex direction="column" mt={8} gap={16}>
      <Title order={3}>
        <IconShoppingBagCheck /> What chu got?
      </Title>
      <MantineReactTable
        table={table}
        mantineTableProps={{
          striped: true,
        }}
      />
      <Group position="right">
        <Button
          radius="sm"
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
    </Flex>
  );
}

export default FoodOrderTable;
