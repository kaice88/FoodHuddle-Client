import { useState } from 'react'
import { Flex } from '@mantine/core'
import { useParams } from 'react-router-dom'

import FeeInfo from './Components/FeeInfo'
import PaymentSummaryTable from './Components/PaymentSummaryTable'
import YourPayment from './Components/YourPayment'
import PaymentChecklistTable from './Components/PaymentChecklistTable'
import ActionButton from '@/components/ActionButton'
import useSession from '@/hooks/useSession'
import { PaymentStatuses, SessionActions, SessionStatuses } from '@/enums'
import { notificationShow } from '@/components/Notification'

export default function SessionSummary() {
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

  return (
    <div>
      {!hidden && <Flex justify="flex-end"><ActionButton value={SessionActions.FINISH} colorName="orange" handleOnClick={handleChangeStatus}></ActionButton></Flex>}
      <FeeInfo></FeeInfo>
      <PaymentSummaryTable id={sessionId}></PaymentSummaryTable>
      <YourPayment paymentStatus={PaymentStatuses.PENDING} id={sessionId}></YourPayment>
      <PaymentChecklistTable id={sessionId}></PaymentChecklistTable>
    </div>
  )
}
