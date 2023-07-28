import React, { useEffect, useMemo, useState } from 'react'
import { type MRT_ColumnDef } from 'mantine-react-table'
import { Avatar, Flex, Text, useMantineTheme } from '@mantine/core'
import { IconBowl, IconCoin } from '@tabler/icons-react'
import Table from './TableComponent'
import { useRequestProcessor } from '@/settings/react-query'
import { calculateTotal, moneyFormat } from '@/utils/utility'
import axiosInstance from '@/settings/axios'
import { REQUEST_GET_FOOD_ORDER_IN_SUMMARY_TAB } from '@/constants/apis'
import { notificationShow } from '@/components/Notification'

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
  const { query } = useRequestProcessor()
  const [tableViewData, setTableViewData] = useState([])
  const [childrenTableView, setChildrenTableView] = useState([])

  const handleTransformDataToTableData = (dataBE) => {
    const data = dataBE.map((item, index) => {
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
    return data
  }
  const handleUserName = (name, picture) => {
    return (
      <Flex gap="sm" justify="flex-start" align="center" direction="row" >
        <Avatar src={picture} alt={name} radius="xl" size={35}/>
        <Text color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.3)} style={{ width: 'fix-content' }} >
          {name}
        </Text>
      </Flex>)
  }
  const handleTransformToChildrenTable = (dataBE) => {
    const dataChildren = dataBE.map((item, index) => {
      const child = {
        foodName: item.foodName,
        elements: item.orders.map((item) => {
          return {
            actualPrice: item.actualPrice,
            note: item.note,
            originPrice: item.originPrice,
            quantity: item.quantity,
            name: handleUserName(item.user.name, item.user.photo),
            options: item.options,
          }
        }),
      }
      return child
    })
    return dataChildren
  }

  const dataChild = dataBE.foodOrderSummary.map((item, index) => {
    const elem = {
      foodName: item.foodName,
      elements: item.orders.map((item) => {
        return {
          actualPrice: item.actualPrice,
          note: item.note,
          originPrice: item.originPrice,
          quantity: item.quantity,
          name: handleUserName(item.user.name, item.user.photo),
          options: item.options,
        }
      }),
    }
    return elem
  })

  const fetchQueryTableFoodOrderView = query(
    ['foodOrderView'],
    () => axiosInstance.get(REQUEST_GET_FOOD_ORDER_IN_SUMMARY_TAB, {
      params: {
        sessionId: Number(sessionId),
        groupedBy: 'food',
      },
    }),
    {
      enabled: false,
      onSuccess: (data) => {
        if (data.data.statusCode === 200) {
          notificationShow('success', 'Success: ', data.data.message)
          setTableViewData(() => handleTransformDataToTableData(data.data.foodOrderList))
          setChildrenTableView(() => handleTransformToChildrenTable(data.data.foodOrderList))
        }
        else {
          notificationShow('error', 'Error: ', data.data.message)
        }
      },
      onError: (error) => {
        console.log(error)
        notificationShow('error', 'Error: ', error.response.data.message)
      },
    },
  )

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
              {cell.getValue<number>()}
            </Text>
          </Flex>
        ),
      },
    ],
    [],
  )

  return <Table columns={columns} data={data} elements={dataChild} isLoading={fetchQueryTableFoodOrderView.isLoading} isTableGroupedByFood={true}/>
}

export default ViewTable
