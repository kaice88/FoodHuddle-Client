import { useParams } from 'react-router-dom'

import isEmpty from 'lodash/isEmpty'
import FeeInfo from './FeeInfo'
import PaymentSummaryTable from './PaymentSummaryTable'
import YourPayment from './YourPayment'
import PaymentChecklistTable from './PaymentChecklistTable'
import { checkIfUserIsHost } from '@/utils/sessions'
import useAuth from '@/hooks/useAuth'

export default function SessionSummary({ sessionData }) {
  const { sessionId } = useParams()
  const { userProfile } = useAuth()

  return (
    <>
      {!isEmpty(sessionData) && <div>
        <FeeInfo id={sessionId}/>
        <PaymentSummaryTable id={sessionId}/>
        {
          checkIfUserIsHost(sessionData?.host, userProfile)
            ? <PaymentChecklistTable id={sessionId} sessionData ={sessionData}/>
            : <YourPayment id={sessionId}/>}
      </div> }
    </>

  )
}
