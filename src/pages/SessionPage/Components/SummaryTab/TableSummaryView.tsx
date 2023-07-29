import React, { useEffect, useMemo, useState } from 'react'
import { type MRT_ColumnDef } from 'mantine-react-table'
import { Flex, Text, useMantineTheme } from '@mantine/core'
import { IconBowl, IconCoin } from '@tabler/icons-react'
import Table from '../../../../components/TableExpandable/TableComponent'
import { calculateTotal, moneyFormat } from '@/utils/utility'
import useSummaryTab from '@/hooks/useSummaryTab'

const dataBE = {
  status: 'success',
  message: 'Get food order summary successfully',
  foodOrderSummary: [
    {
      foodName: 'Cơm sườn',
      orders: [
        {
          user: {
            email: 'ngan.phan@nfq.com',
            googleId: '118000667982679358226',
            name: 'Ngan Phan Khanh',
            photo: 'https://lh3.googleusercontent.com/a/AAcHTteJ-0ycB1Gz-fYDFq3OFKcet17Br5M4Mw0c2JGm3n4jUA=s96-c',
          },
          quantity: 2,
          originPrice: 30000,
          actualPrice: 30000,
          note: 'Không hành',
          options: [
            {
              name: 'Size L',
              price: 0,
            }, {
              name: 'Trân châu trắng',
              price: 8000,
            }, {
              name: 'Pudding',
              price: 7000,
            },
          ],

        },
        {
          user: {
            email: 'nhung.phan@nfq.com',
            googleId: '118000667982679358211',
            name: 'Hong Nhung Phan',
            photo: 'https://lh3.googleusercontent.com/a/AAcHTteJ-0ycB1Gz-fYDFq3OFKcet17Br5M4Mw0c2JGm3n4jUA=s96-c',
          },
          quantity: 2,
          options: [],
          originPrice: 30000,
          actualPrice: 20000,
          note: null,
        },
      ],
    },
    {
      foodName: 'Cơm gà',
      orders: [
        {
          user: {
            email: 'ngan.phan@nfq.com',
            googleId: '118000667982679358226',
            name: 'Ngan Phan Khanh',
            photo: 'https://lh3.googleusercontent.com/a/AAcHTteJ-0ycB1Gz-fYDFq3OFKcet17Br5M4Mw0c2JGm3n4jUA=s96-c',
          },
          note: null,
          quantity: 10,
          originPrice: 80000,
          actualPrice: 30000,
          options: [],
        },
        {
          user: {
            email: 'nhung.phan@nfq.com',
            googleId: '118000667982679358211',
            name: 'Hong Nhung Phan',
            photo: 'https://lh3.googleusercontent.com/a/AAcHTteJ-0ycB1Gz-fYDFq3OFKcet17Br5M4Mw0c2JGm3n4jUA=s96-c',
          },
          quantity: 2,
          originPrice: 40000,
          actualPrice: 60000,
          note: 'Không đường',
          options: [
            {
              name: 'Size L',
              price: 0,
            }, {
              name: 'Trân châu trắng',
              price: 8000,
            }, {
              name: 'Pudding',
              price: 7000,
            },
          ],
        },
      ],
    },
  ],
}

const data = dataBE.foodOrderSummary.map((item, index) => {
  const totalMoneyEachFood = item.orders.reduce((total, item) => {
    return calculateTotal(total, item.quantity * item.actualPrice)
  }, 0)
  const quantityOrderEachFood = item.orders.reduce((acc, item) => {
    return acc + item.quantity
  }, 0)
  return (
    {
      id: Number(index) + 1,
      foodName: item.foodName,
      total: `${moneyFormat(totalMoneyEachFood, 'VND', 'en-US', '')} đ`,
      quantity: quantityOrderEachFood,
    }
  )
})

export interface FoodRowCover {
  id: number
  foodName: string
  total: number
  quantity: number
}

const ViewTable = ({ sessionId }) => {
  const globalTheme = useMantineTheme()
  const [tableViewData, setTableViewData] = useState([])
  const [childrenTableView, setChildrenTableView] = useState([])
  const { queryTableFoodOrderView } = useSummaryTab()
  const fetchQueryTableFoodOrderView = queryTableFoodOrderView(sessionId, setChildrenTableView, setTableViewData)
  useEffect(() => {
    const handlefetchTableFoodOrderView = async () => {
      await fetchQueryTableFoodOrderView.refetch()
    }
    handlefetchTableFoodOrderView()
  }, [])

  const columns = useMemo<MRT_ColumnDef<FoodRowCover>[]>(
    () => [
      {
        accessorKey: 'id',
        header: '',
        size: 50,
        Cell: ({ renderedCellValue, row }) => (
          <Text fw={700} color={globalTheme.fn.darken(globalTheme.colors.orange[0], 0.1)}>
            {renderedCellValue}
          </Text>
        ),
      },
      {
        accessorKey: 'foodName',
        size: 200,
        header: '',
        Cell: ({ renderedCellValue, row }) => (
          <Text
            fw={700}
            color={globalTheme.fn.darken(globalTheme.colors.orange[0], 0.1)}
            style={{ textTransform: 'capitalize' }}
          >
            {renderedCellValue}
          </Text>
        ),
      },
      {
        accessorKey: 'quantity',
        header: '',
        size: 100,
        Cell: ({ cell }) => (
          <Flex gap="sm" justify="flex-start" align="center">
            <IconBowl
              size="1.3rem"
              color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.5)}
            />
            <Text
              fw={700}
              color={globalTheme.fn.darken(globalTheme.colors.orange[0], 0.1)}
            >
              {cell.getValue<number>()}
            </Text>
          </Flex>
        ),
      },
      {
        accessorKey: 'total',
        header: '',
        size: 200,
        Cell: ({ cell }) => (
          <Flex gap="md" justify="center" align="center">
            <IconCoin
              size="1.3rem"
              color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.5)}
            />
            <Text
              fw={700}
              color={globalTheme.fn.darken(globalTheme.colors.orange[0], 0.1)}
            >
              {`${moneyFormat(cell.getValue<number>(), 'VND', 'en-US', '')} đ`}
            </Text>
          </Flex>
        ),
      },
    ],
    [],
  )

  // return <Table columns={columns} data={data} elements={dataChild} isLoading={fetchQueryTableFoodOrderView.isLoading} isTableGroupedByFood={true}/>
  return <Table columns={columns} data={tableViewData} elements={childrenTableView} isLoading={fetchQueryTableFoodOrderView.isLoading} isTableGroupedByFood={true}/>
}

export default ViewTable
