import { useMemo, useState } from 'react'
import { Avatar, Flex, Text, useMantineTheme } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { type MRT_ColumnDef } from 'mantine-react-table'
import { IconBowl, IconCoin } from '@tabler/icons-react'

import ActionButton from '@/components/ActionButton'
import useSession from '@/hooks/useSession'
import { SessionActions, SessionStatuses } from '@/enums'
import { notificationShow } from '@/components/Notification'
import FeeInfo from '@/components/FeeInfo'
import PaymentSummaryTable from '@/components/Tables/TableExpandable/TableComponent'
import { calculatePaymentAmount, moneyFormat } from '@/utils/utility'

export default function SessionSummary() {
  const globalTheme = useMantineTheme()
  const [hidden, setHidden] = useState(false)
  const { sessionId } = useParams()
  const { changeStatus } = useSession(sessionId)

  const handleChangeStatus = () => {
    changeStatus(SessionStatuses.FINISHED, (data) => {
      notificationShow('success', 'SUCCESS', data.data.message)
      setHidden(true)
    },
    )
  }

  interface UserPaymentRow {
    no: number
    user: object
    quantity: number
    paymentAmount: number
  }

  const columns = useMemo<MRT_ColumnDef<UserPaymentRow>[]>(
    () => [
      {
        accessorKey: 'no',
        header: '',
        size: 50,
        Cell: ({ renderedCellValue }) => (
          <Text fw={700} color={globalTheme.fn.darken(globalTheme.colors.orange[0], 0.1)}>
            {renderedCellValue}
          </Text>
        ),
      },
      {
        accessorKey: 'user',
        size: 200,
        header: '',
        Cell: ({ renderedCellValue }) => (
          // <Text
          //   fw={700}
          //   color={globalTheme.fn.darken(globalTheme.colors.orange[0], 0.1)}
          //   style={{ textTransform: 'capitalize' }}
          // >
          //   {renderedCellValue}
          // </Text>
          <Flex gap="sm" justify="flex-start" align="center" direction="row" >
            <Avatar src={renderedCellValue.photo} alt={renderedCellValue.name} radius="xl" size={35}/>
            <Text color={globalTheme.fn.darken(globalTheme.colors.orange[0], 0.1)} style={{ width: 'fix-content' }} >
              {renderedCellValue.name}
            </Text>
          </Flex>
        ),
      },
      {
        accessorKey: 'quantity',
        header: '',
        size: 100,
        Cell: ({ cell }) => (
          <Flex gap="sm" justify="flex-start" align="center">
            <IconBowl
              size="1rem"
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
        accessorKey: 'paymentAmount',
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

  const dataBE = [
    {
      user: {
        googleId: '118000667982679358226',
        email: 'ngan.phan@nfq.com',
        name: 'Ngan Phan Khanh',
        photo: 'https://lh3.googleusercontent.com/a/AAcHTteJ-0ycB1Gz-fYDFq3OFKcet17Br5M4Mw0c2JGm3n4jUA=s96-c',
      },
      orders: [
        {
          id: 2,
          foodName: 'Bú',
          originPrice: 222,
          quantity: 3,
          note: 'ac',
          options: [
            {
              category: 'SIZE',
              detail: [
                {
                  name: 'Size L',
                  price: 70,
                },
              ],
            },
            {
              category: 'TOPPING',
              detail: [
                {
                  name: 'Pudding',
                  price: 222,
                },
                {
                  name: '50% đá',
                  price: 0,
                },
              ],
            },
          ],
          actualPrice: 30,
        },
        {
          id: 2,
          foodName: 'Mì quả',
          originPrice: 222,
          quantity: 1,
          note: 'ac',
          options: [],
          actualPrice: 200,
        },
      ],
    },
    {
      user: {
        googleId: '118000667982679358226',
        email: 'ngan.phan@nfq.com',
        name: 'Ngan Phan Khanh',
        photo: 'https://lh3.googleusercontent.com/a/AAcHTteJ-0ycB1Gz-fYDFq3OFKcet17Br5M4Mw0c2JGm3n4jUA=s96-c',
      },
      orders: [
        {
          id: 2,
          foodName: 'Bún',
          originPrice: 222,
          quantity: 1,
          note: 'ac',
          options: [
            {
              category: 'SIZE',
              detail: [
                {
                  name: 'Size L',
                  price: 70,
                },
              ],
            },
            {
              category: 'TOPPING',
              detail: [
                {
                  name: 'Pudding',
                  price: 222,
                },
                {
                  name: '50% đá',
                  price: 0,
                },
              ],
            },
          ],
          actualPrice: 222,
        },
        {
          id: 2,
          foodName: 'Mì quảng',
          originPrice: 222,
          quantity: 1,
          note: 'ac',
          options: [],
          actualPrice: 222,
        },
      ],
    },
  ]

  const data = dataBE.map((item, index) => {
    const numberOfOrderItems = item.orders.reduce((total, item) => {
      return total + item.quantity
    }, 0)
    const paymentAmount = calculatePaymentAmount(item.orders)
    return {
      no: index + 1,
      user: item.user,
      quantity: numberOfOrderItems,
      paymentAmount: `${moneyFormat(paymentAmount, 'VND', 'en-US', '')} đ`,
    }
  })

  const dataChild = dataBE.map((item, index) => {
    return item.orders.map((item) => {
      return {
        actualPrice: item.actualPrice,
        note: item.note,
        originPrice: item.originPrice,
        quantity: item.quantity,
        name: item.foodName,
        options: item.options,
      }
    })
  })

  return (
    <div>
      {!hidden && <Flex justify="flex-end"><ActionButton value={SessionActions.FINISH} colorName="orange" handleOnClick={handleChangeStatus}></ActionButton></Flex>}
      <FeeInfo></FeeInfo>
      {/* <PaymentSummaryTable columns={columns} data={data} elements={dataChild} isLoading={fetchQueryTableFoodOrderView.isLoading} isTableGroupedByFood={true}/> */}
      <PaymentSummaryTable columns={columns} data={data} elements={dataChild} isLoading={false} isTableGroupedByFood={false} ></PaymentSummaryTable>
    </div>
  )
}
