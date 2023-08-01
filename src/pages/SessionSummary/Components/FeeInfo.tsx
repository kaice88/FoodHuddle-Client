import { Flex, Grid, Image, Paper, Text, Title, useMantineTheme, Loader } from '@mantine/core'
import { modals } from '@mantine/modals'

import { moneyFormat } from '@/utils/utility'
import usePaymentSession from '@/hooks/usePaymentSession'
import { useEffect, useState } from 'react'


const FeeItem = ({ title, value, color }) => {
  return (
    <Flex gap="lg" justify="space-between" wrap="wrap">
      <Text color={color} fw={500}>
        {`${title}:`}
      </Text>
      <Text>{`${moneyFormat(value, 'VND', 'en-US', '')} đ`}</Text>
    </Flex>
  )
}

const BillItem = ({ srcImage }) => {
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
    />
  )
}

export default function FeeInfo({id}) {
  const theme = useMantineTheme()
  const [orderBill, setOrderBill] = useState({})
  const [isLoading,setIsLoading]= useState(true)
  const {fetchOrderBill} = usePaymentSession(id)

  useEffect(() => {
    const handlefetchPaymentChecklist = async () => {
      const res = await fetchOrderBill.refetch()
      if(res.isSuccess) {
        setOrderBill(res.data.data.data)
        setIsLoading(false)
      }
    }
    handlefetchPaymentChecklist()
  }, [])

  return (
    <>
    {isLoading ? <Flex justify='center'><Loader /></Flex> : <Paper shadow="md" p="md" className="fee-info" sx={{ height: '20%' }} >
      <Grid grow gutter="xl">
        <Grid.Col sm={12} md={6}>
          <Title sx={() => ({ fontWeight: 700, fontSize: '20px' })} color={theme.colors.duck[0]} py={10}>Fees</Title>
          <FeeItem title="Shipping fee" value={orderBill?.shippingFee} color={theme.colors.duck[0]}/>
          <FeeItem title="Discount" value={orderBill?.discountAmount} color={theme.colors.duck[0]}/>
          <FeeItem title="Another fee" value={orderBill?.otherFee} color={theme.colors.duck[0]}/>
        </Grid.Col>
        <Grid.Col sm={12} md={6}>
          <Title sx={() => ({ fontWeight: 700, fontSize: '20px' })} color={theme.colors.duck[0]} py={10}>Bill</Title>
          <Flex wrap="wrap" gap="lg">
            {orderBill?.receiptScreenshot.map((item, index) => <BillItem key={index} srcImage ={item} />)}
          </Flex>
        </Grid.Col>
      </Grid>
    </Paper>}
    </>
  )
}
