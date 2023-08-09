import { useEffect, useMemo } from 'react'
import { Flex, Text, Tooltip, useMantineTheme } from '@mantine/core'
import { IconAlertCircle, IconCoin } from '@tabler/icons-react'
import isEmpty from 'lodash/isEmpty'

import Table from '@/components/TableExpandable/TableComponent'
import usePaymentSession from '@/hooks/usePaymentSession'
import ItemName from '@/components/ItemName'
import { moneyFormat } from '@/utils'

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
        header: 'No',
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
        header: 'Joiner',
        Cell: ({ renderedCellValue }) => (
          <ItemName name={renderedCellValue.name} picture={renderedCellValue.photo} ></ItemName>
        ),
      },
      {
        accessorKey: 'totalPayment',
        header: 'Total Payment',
        size: 200,
        Cell: ({ renderedCellValue }) => (
          <Flex gap="md" justify="flex-start" align="center">
            <IconCoin
              size="1.3rem"
              color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.5)}
            />
            <Text
              fw={700}
              color={globalTheme.fn.darken(globalTheme.colors.orange[0], 0.1)}
            >
              {`${moneyFormat(renderedCellValue, 'VND', 'en-US', '')} đ`}
            </Text>
          </Flex>
        ),
      },
      {
        accessorKey: 'finalPayment',
      
        header: <>
          <Text>Final Payment</Text>
          <Tooltip
            position="top-start"
            label="This price includes the extra fee"
            styles={theme => ({
              tooltip: {
                color: 'white',
                fontWeight: '300',
                backgroundColor: theme.fn.lighten(theme.colors.darkLavender[0], 0.3),
              },
            })}
          >
            <IconAlertCircle size={15} style={{ color: `${globalTheme.colors.darkLavender[0]}` }}/>
          </Tooltip>
        </>,
        size: 200,
        Cell: ({ renderedCellValue }) => (
          <Flex gap="md" justify="flex-start" align="center">
            <IconCoin
              size="1.3rem"
              color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.5)}
            />
            <Text
              fw={700}
              color={globalTheme.fn.darken(globalTheme.colors.orange[0], 0.1)}
            >
              {`${moneyFormat(renderedCellValue, 'VND', 'en-US', '')} đ`}
            </Text>
          </Flex>
        ),
      },
    ],
    [],
  )

  const data = !isEmpty(paymentSummary)
    ? paymentSummary.map((item, index) => {
      return {
        no: index + 1,
        user: item.user,
        totalPayment: item.totalPayment,
        finalPayment: item.finalPayment,
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
      <Table columns={columns} data={data} elements={dataChild} isLoading={fetchPaymentSummary.isLoading} isTableGroupedByFood={false} />
    </div>
  )
}
