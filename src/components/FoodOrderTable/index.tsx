import { useEffect, useMemo } from 'react'
import {
  type MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table'

import { ActionIcon, Button, Flex, Group, Image, Text, Title } from '@mantine/core'
import {
  IconEditCircle,
  IconEraser,
  IconShoppingBagCheck,
} from '@tabler/icons-react'
import { useParams } from 'react-router-dom'
import { find } from 'lodash'
import EditOrderForm from '../FoodOrderForm/Edit'
import MenuOptions from '../MenuOptions'
import useModal from '@/hooks/useModal'
import useFoodStore from '@/store/foodStore'

import type { FoodOrderItem } from '@/types/food'

import { moneyFormat } from '@/utils'
import {
  calculateFoodOrderItemTotal,
  calculateFoodOrderListTotal,
  isOptionsEmpty,
} from '@/utils/food'
import { editFoodOrderList, fetchFoodOrderList } from '@/hooks/useOrder'

function FoodOrderTable() {
  const { sessionId } = useParams()
  const setFoodOrderList = useFoodStore(state => state.setFoodOrderList)
  const foodOrderList = useFoodStore(state => state.foodOrderList)

  const deleteFoodOrderItem = useFoodStore(
    state => state.deleteFoodOrderItem,
  )

  const columns: MRT_ColumnDef<FoodOrderItem[]> = useMemo(
    () => [
      { accessorKey: 'foodImage', header: 'Food',Cell:(({row})=>{
        return <Image   src={row.getValue("foodImage")}/>
      }) },
      { accessorKey: 'foodName', header: 'Food' },
      {
        accessorKey: 'originPrice',
        header: 'OriginPrice',
        Cell: ({ row }) => {
          return moneyFormat(row.getValue('originPrice'), 'VND', 'vi-VN')
        },
        mantineTableHeadCellProps: {
          align: 'center',
        },
        mantineTableBodyCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        mantineTableHeadCellProps: {
          align: 'center',
        },
        mantineTableBodyCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'options',
        header: 'Options',
        mantineTableHeadCellProps: {
          align: 'center',
        },
        mantineTableBodyCellProps: {
          align: 'center',
        },
        Cell: ({ row }) => {
          const options = row.getValue('options')
          if (isOptionsEmpty(options))
            return <Text>No options</Text>

          return <MenuOptions options={row.getValue('options')} />
        },
      },
      {
        accessorKey: 'total',
        header: 'Total',
        mantineTableHeadCellProps: {
          align: 'center',
        },
        mantineTableBodyCellProps: {
          align: 'center',
        },
        Cell: ({ row }) => {
          return (
            <Text fw={700} sx={{ color: '#FF6B00' }}>
              {moneyFormat(
                calculateFoodOrderItemTotal(row._valuesCache),
                'VND',
                'vi-VN',
              )}
            </Text>
          )
        },

      },
      { accessorKey: 'note', header: 'Note' , mantineTableHeadCellProps: {
        align: 'center',
      }},
      {
        accessorKey: 'id',
        mantineTableHeadCellProps: {
          align: 'center',
        },
        mantineTableBodyCellProps: {
          align: 'center',
        },
        header: 'Actions',
        Cell: ({ row }) => {
          const id = row.getValue('id')
          const { openModal } = useModal(
            <Title order={4}>{'Order Customization'}</Title>,
            <EditOrderForm foodOrderItem={find(foodOrderList, { id })} />,
          )

          return (
            <Flex align="center" justify="center">
              {' '}
              <ActionIcon
                color="blue"
                onClick={() => {
                  openModal()
                }}
              >
                <IconEditCircle />
              </ActionIcon>
              <ActionIcon
                onClick={() => {
                  deleteFoodOrderItem(id)
                }}
                color="red"
              >
                <IconEraser />
              </ActionIcon>
            </Flex>
          )
        },
      },
    ],
    [foodOrderList],
  )

  const table = useMantineReactTable({
    columns,
    data: foodOrderList,
    state: {
      density: "xs",
      columnSizing:{
        "quantity": 100,
        "note":150,
        "total":150,
        "id":120,
        "originPrice":130,
        "options":120,
      }
    },
    enableSorting:false,
    enableColumnActions:false,
    enableColumnResizing:true,
    enableTopToolbar: false,
    enableBottomToolbar: false,
  })

  useEffect(() => {
    const init = async () => {
      try {
        const foodOrderList = await fetchFoodOrderList(Number.parseInt(sessionId!))
        setFoodOrderList(foodOrderList!)
      }
      catch (error) {
        console.log(error)
      }
    }
    init()
  }, [])

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
              sessionId: Number.parseInt(sessionId!),
              foodOrderList,
            })
          }}
        >
          {`Submit order total of: ${
            moneyFormat(
              calculateFoodOrderListTotal(foodOrderList),
              'VND',
              'vi-VN',
            )}`}{' '}
        </Button>
      </Group>
    </Flex>
  )
}

export default FoodOrderTable
