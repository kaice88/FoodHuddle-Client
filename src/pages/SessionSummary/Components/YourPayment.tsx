import { Button, Flex, Modal, Paper, Text, Title, useMantineTheme } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'

import PaymentModal from './PaymentModal'
import StatusBadge from '@/components/StatusBadge'
import { PaymentStatusColors, PaymentStatuses } from '@/enums'
import { moneyFormat } from '@/utils/utility'

export default function YourPayment({ paymentStatus, id }) {
  const [files, setFiles] = useState([])
  const theme = useMantineTheme()
  const [opened, { open, close }] = useDisclosure(false)
  const openModal = () => modals.open({
    title: 'Payment',
    centered: true,
    children: <PaymentModal id={id} files={files} setFiles={setFiles} />,
    size: 'lg',
  })

  return (
    <Paper shadow="md" p="md" className="fee-info" sx={{ height: '20%' }} >
      <Flex gap="lg" align="center" wrap="wrap">
        <Title sx={() => ({ fontWeight: 700, fontSize: '20px' })} color={theme.colors.duck[0]} >Your payment</Title>
        {paymentStatus !== PaymentStatuses.NONE && <StatusBadge status={paymentStatus} colorName={PaymentStatusColors[paymentStatus]}></StatusBadge> }
      </Flex>
      <Flex gap="lg" wrap="wrap" py={10}>
        <Text color={theme.colors.duck[0]} fw={500}>
          Payment amount:
        </Text>
        <Text>{`${moneyFormat('1000000', 'VND', 'en-US', '')} đ`}</Text>
      </Flex>
      <Modal opened={opened} onClose={close} title="Payment" centered>
        <PaymentModal id={id} files={files} setFiles={setFiles} />
      </Modal>
      <Button size="xs" onClick={open}>Let's pay</Button>
    </Paper>
  )
}
