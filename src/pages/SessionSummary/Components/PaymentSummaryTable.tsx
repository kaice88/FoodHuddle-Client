import { useEffect, useMemo } from 'react'
import { Flex, Text, Title, useMantineTheme } from '@mantine/core'
import { IconBowl, IconCoin, IconWallet } from '@tabler/icons-react'
import isEmpty from 'lodash/isEmpty'

import Table from '@/components/TableExpandable/TableComponent'
import { calculatePaymentAmount, moneyFormat } from '@/utils/utility'
import usePaymentSession from '@/hooks/usePaymentSession'
import ItemName from '@/components/ItemName'

const paymentSummary2 = [
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

export default function SessionSummary({ id }) {
  const globalTheme = useMantineTheme()
  const { fetchPaymentSummary, paymentSummary } = usePaymentSession(id)
  useEffect(() => {
    const handlefetchPaymentSummary = async () => {
      await fetchPaymentSummary.refetch()
    }
    handlefetchPaymentSummary()
  }, [])

  const columns = useMemo(
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
          <ItemName name={renderedCellValue.name} picture={renderedCellValue.photo} ></ItemName>
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

  const data = !isEmpty(paymentSummary)
    ? paymentSummary.map((item, index) => {
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
    : []

  const dataChild = !isEmpty(paymentSummary)
    ? paymentSummary.map((item) => {
      return item.orders.map((item) => {
        return {
          actualPrice: item.actualPrice,
          note: item.note,
          originPrice: item.originPrice,
          quantity: item.quantity,
          name: item.foodName,
          options: item.options,
          photo: item.foodImage,
        }
      })
    })
    : []

  return (
    <div style={{ padding: '10px 0' }}>
      <Flex align="center" gap="xs">
        <IconWallet size="1.5rem" color={globalTheme.colors.duck[0]}/>
        <Title sx={() => ({ fontWeight: 500, fontSize: '18px' })} color={globalTheme.colors.duck[0]} py={10}>Payment Summary</Title>
      </Flex>
      <Table columns={columns} data={data} elements={dataChild} isLoading={fetchPaymentSummary.isLoading} isTableGroupedByFood={false} />
    </div>
  )
}
