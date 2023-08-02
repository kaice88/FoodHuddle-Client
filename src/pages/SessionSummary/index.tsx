import { useState } from 'react'
import { Flex } from '@mantine/core'
import { useParams } from 'react-router-dom'

import FeeInfo from './Components/FeeInfo'
import PaymentSummaryTable from './Components/PaymentSummaryTable'
import YourPayment from './Components/YourPayment'
import PaymentChecklistTable from './Components/PaymentChecklistTable'
import ActionButton from '@/components/ActionButton'
import useSession from '@/hooks/useSession'
import { SessionActionColor, SessionActions, SessionStatuses } from '@/enums'
import { notificationShow } from '@/components/Notification'
import { checkIfUserIsHost } from '@/utils/sessions'
import useSessionData from '@/hooks/useSessionData'
import useAuth from '@/hooks/useAuth'

export default function SessionSummary() {
  const [hidden, setHidden] = useState(false)
  const { sessionId } = useParams()
  const { changeStatus } = useSession(sessionId)
  const { sessionData, isLoading } = useSessionData(sessionId!)
  const { userProfile } = useAuth()

  const handleChangeStatus = () => {
    changeStatus(SessionStatuses.FINISHED, (data) => {
      notificationShow('success', 'SUCCESS', data.data.message)
      setHidden(true)
    },
    )
  }

  return (
    <>
      {!isLoading && <div>
        {(checkIfUserIsHost(sessionData?.host, userProfile) && !hidden) && (sessionData?.status !== SessionStatuses.FINISHED && <Flex justify="flex-end" py={10}><ActionButton value={SessionActions.FINISH} colorName={SessionActionColor.FINISH} handleOnClick={handleChangeStatus}/></Flex>) }
        <FeeInfo id={sessionId}/>
        <PaymentSummaryTable id={sessionId}/>
        {
          checkIfUserIsHost(sessionData?.host, userProfile)
            ? <PaymentChecklistTable id={sessionId}/>
            : <YourPayment id={sessionId}/>}
      </div> }
    </>

  )
}
