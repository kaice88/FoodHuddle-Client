import { Button, Flex, Modal, Paper, Text, Title, useMantineTheme } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import isEmpty from 'lodash/isEmpty'

import PaymentModal from './PaymentModal'
import StatusBadge from '@/components/StatusBadge'
import { PaymentStatusColors, PaymentStatuses, SessionStatuses } from '@/enums'
import usePaymentSession from '@/hooks/usePaymentSession'
import useSessionInfoStore from '@/store/sessionInfoStore'

export default function YourPayment({ id }) {
  const [userPaymentData, setUserPaymentData] = useState()
  const theme = useMantineTheme()
  const [opened, { open, close }] = useDisclosure(false)
  const { fetchUserPayment } = usePaymentSession(id)
  const { sessionInfoData } = useSessionInfoStore()

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

  const RequestMessage = ({ status = PaymentStatuses.NONE }) => {
    let content = 'Request your payment now!'
    if (status === PaymentStatuses.APPROVED)
      content = 'Your payment request has been approved successfully!'

    else if (status === PaymentStatuses.REJECTED)
      content = 'Your payment request has been rejected. Please remake the request!'

    else if (status === PaymentStatuses.PENDING)
      content = 'Your payment request has been sent, awaiting approve!'

    return <Text color={ PaymentStatusColors[status] ? theme.colors[PaymentStatusColors[status]][0] : 'blue'}>{content}</Text>
  }
  return (
    <>
      <Paper shadow="xs" p="md" my="md" className="fee-info" sx={{ height: '20%' }} >
        <Flex gap="lg" align="center" wrap="wrap">
          <Title sx={() => ({ fontWeight: 700, fontSize: '20px' })} color={theme.colors.duck[0]} >Your payment</Title>
          { !isEmpty(userPaymentData) && <StatusBadge status={userPaymentData?.status} colorName={PaymentStatusColors[userPaymentData.status]}/> }
        </Flex>
        <Flex gap="lg" wrap="wrap" py={10}>
          {!isEmpty(userPaymentData) ? <RequestMessage status={userPaymentData.status}/> : <RequestMessage />}
        </Flex>
        <Modal opened={opened}
          onClose={close}
          title={<Text fw={700} fz="lg">Payment</Text>}
          centered>
          <PaymentModal id={id} userPayment ={userPaymentData} closeModal={closeModal}/>
        </Modal>
        {sessionInfoData.status === SessionStatuses.PENDING_PAYMENTS
        && <Flex align="center">
          <Button size="xs" onClick={open}>Request</Button>
        </Flex> }
      </Paper>
    </>

  )
}
