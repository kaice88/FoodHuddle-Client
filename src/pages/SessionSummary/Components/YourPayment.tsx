import { Button, Flex, Modal, Paper, Text, Title, useMantineTheme } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import isEmpty from 'lodash/isEmpty'

import PaymentModal from './PaymentModal'
import StatusBadge from '@/components/StatusBadge'
import { PaymentStatusColors } from '@/enums'
import { moneyFormat } from '@/utils/utility'
import usePaymentSession from '@/hooks/usePaymentSession'

export default function YourPayment({ paymentStatus, id }) {
  const [userPaymentData, setUserPaymentData] = useState()

  const theme = useMantineTheme()
  const [opened, { open, close }] = useDisclosure(false)
  const { fetchUserPayment } = usePaymentSession(id)

  const handlefetchUserPayment = async () => {
    const res = await fetchUserPayment.refetch()
    if (res.isSuccess)
      setUserPaymentData(res.data.data.data)
  }
  const closeModal = () => {
    handlefetchUserPayment()
    close()
  }

  useEffect(() => {
    handlefetchUserPayment()
  }, [])

  return (
    <>{
      <Paper shadow="md" p="md" className="fee-info" sx={{ height: '20%' }} >
        <Flex gap="lg" align="center" wrap="wrap">
          <Title sx={() => ({ fontWeight: 700, fontSize: '20px' })} color={theme.colors.duck[0]} >Your payment</Title>
          { !isEmpty(userPaymentData) && <StatusBadge status={userPaymentData?.status} colorName={PaymentStatusColors[paymentStatus]}/> }
        </Flex>
        <Flex gap="lg" wrap="wrap" py={10}>
          <Text color={theme.colors.duck[0]} fw={500}>
          Payment amount:
          </Text>
          <Text>{`${moneyFormat('1000000', 'VND', 'en-US', '')} đ`}</Text>
        </Flex>
        <Modal opened={opened} onClose={close} title="Payment" centered>
          <PaymentModal id={id} userPayment ={userPaymentData} closeModal={closeModal}/>
        </Modal>
        <Flex align="center">
          <Button size="xs" onClick={open}>Let's pay</Button>
          {!isEmpty(userPaymentData) && (userPaymentData.status ? <Text px={10}>Payment request sent, awaiting review!</Text> : ' ')}
        </Flex>
      </Paper>
    }
    </>

  )
}
