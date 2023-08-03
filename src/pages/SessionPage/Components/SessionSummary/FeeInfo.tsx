import { Flex, Grid, Image, Loader, Paper, Text, Title, useMantineTheme } from '@mantine/core'
import { modals } from '@mantine/modals'

import { useEffect, useState } from 'react'
import { moneyFormat } from '@/utils/utility'
import usePaymentSession from '@/hooks/usePaymentSession'

function FeeItem({ title, value, color }) {
  return (
    <Flex gap="lg" justify="space-between" wrap="wrap">
      <Text color={color} fw={500}>
        {`${title}:`}
      </Text>
      <Text>{`${moneyFormat(value, 'VND', 'en-US', '')} đ`}</Text>
    </Flex>
  )
}

function BillItem({ srcImage }) {
  const handleImage = () => modals.open({
    title: 'Image preview',
    centered: true,
    children: (
      <Image
        src= {srcImage}
        alt="Bill image"
        onClick={handleImage}
      />
    ),
  })
  return (
    <Image
      width={70}
      height={70}
      src= {srcImage}
      alt="Bill image"
      onClick={handleImage}
      style={{
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
      }}
      radius="md"
    />
  )
}

export default function FeeInfo({ id }) {
  const theme = useMantineTheme()
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
    <>
      {isLoading
        ? <Flex justify="center"><Loader /></Flex>
        : <Paper className="fee-container" p="xs" shadow="xs" >
          <Grid grow gutter="xs">
            <Grid.Col sm={12} md={6}>
              {/* <Paper className="fee-container" p="xs" shadow="xs" > */}
              <Title sx={() => ({ fontWeight: 700, fontSize: '20px', textAlign: 'center' })} color={theme.colors.duck[0]} pb={10}>Fees</Title>
              <FeeItem title="Shipping fee" value={orderBill?.shippingFee} color={theme.colors.duck[0]}/>
              <FeeItem title="Discount" value={orderBill?.discountAmount} color={theme.colors.duck[0]}/>
              <FeeItem title="Another fee" value={orderBill?.otherFee} color={theme.colors.duck[0]}/>
              {/* </Paper> */}
            </Grid.Col>
            <Grid.Col sm={12} md={6}>
              {/* <Paper className="fee-container" p="xs" shadow="xs" > */}
              <Title sx={() => ({ fontWeight: 700, fontSize: '20px', textAlign: 'center' })} color={theme.colors.duck[0]} pb={10}>Bill</Title>
              {orderBill?.receiptScreenshot.length === 0
                ? <Text style={{ textAlign: 'center', fontStyle: 'italic' }} color={theme.colors.duck[0]}>No data found</Text>
                : <Flex wrap="wrap" gap="lg" >
                  {orderBill?.receiptScreenshot.map((item, index) => <BillItem key={index} srcImage ={item} />)}
                </Flex> }
              {/* </Paper> */}
            </Grid.Col>
          </Grid>
        </Paper>
      }
    </>
  )
}
