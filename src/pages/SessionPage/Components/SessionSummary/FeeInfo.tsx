import { Flex, Loader, Paper, SimpleGrid, Text, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'

import ImageCarouselModal from './ImageCarouselModal'
import { moneyFormat } from '@/utils/utility'
import usePaymentSession from '@/hooks/usePaymentSession'

function FeeItem({ title, value, color }) {
  return (
    <Flex gap="xs" justify="space-between" direction="column" align="center" wrap="wrap">
      <Text color={color} fw={500}>
        {title}
      </Text>
      <Text>{`${moneyFormat(value, 'VND', 'en-US', '')} đ`}</Text>
    </Flex>
  )
}

export default function FeeInfo({ id }) {
  const theme = useMantineTheme()
  const [opened, { open, close }] = useDisclosure(false)

  const [orderBill, setOrderBill] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { fetchOrderBill } = usePaymentSession(id)

  useEffect(() => {
    const handlefetchPaymentChecklist = async () => {
      const res = await fetchOrderBill.refetch()
      if (res.isSuccess) {
        setOrderBill(res.data.data.data)
        setIsLoading(false)
      }
    }
    handlefetchPaymentChecklist()
  }, [])

  return (
    <div>
      {isLoading
        ? <Flex justify="center"><Loader /></Flex>
        : <Paper className="fee-container" p="xs" shadow="xs" >
          <SimpleGrid
            breakpoints={[
              { minWidth: 1270, cols: 4 },
              { minWidth: 699.3, cols: 2 },
            ]}
            cols={2}
            spacing={'md'}
            verticalSpacing={'md'}
          >
            <FeeItem title="Shipping fee" value={orderBill?.shippingFee} color={theme.colors.duck[0]}/>
            <FeeItem title="Discount" value={orderBill?.discountAmount} color={theme.colors.duck[0]}/>
            <FeeItem title="Other fees" value={orderBill?.otherFee} color={theme.colors.duck[0]}/>
            <ImageCarouselModal opened={opened} close={close} images={orderBill?.receiptScreenshot}/>
            <Flex gap="xs" justify="space-between" direction="column" align="center" wrap="wrap">
              <Text color={theme.colors.duck[0]} fw={500}>
                    Bill screenshots
              </Text>
              {isEmpty(orderBill?.receiptScreenshot)
                ? <Text style={{ textAlign: 'center', fontStyle: 'italic' }} color={theme.colors.duck[0]}>No data found</Text>
                : <Text td="underline" onClick={open}>Show</Text>
              }
            </Flex>
          </SimpleGrid >
        </Paper>
      }
    </div>
  )
}
