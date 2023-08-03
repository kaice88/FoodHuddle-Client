import { useParams } from 'react-router-dom'

import FeeInfo from './FeeInfo'
import PaymentSummaryTable from './PaymentSummaryTable'
import YourPayment from './YourPayment'
import PaymentChecklistTable from './PaymentChecklistTable'
import { checkIfUserIsHost } from '@/utils/sessions'
import useSessionData from '@/hooks/useSessionData'
import useAuth from '@/hooks/useAuth'

export default function SessionSummary() {
  const { sessionId } = useParams()
  const { sessionData, isLoading } = useSessionData(sessionId!)
  const { userProfile } = useAuth()

  return (
    <>
      {!isLoading && <div>
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
