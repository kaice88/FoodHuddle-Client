import { useParams } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { Flex, Title, useMantineTheme } from '@mantine/core'
import { IconWallet } from '@tabler/icons-react'

import FeeInfo from './FeeInfo'
import PaymentSummaryTable from './PaymentSummaryTable'
import YourPayment from './YourPayment'
import PaymentChecklistTable from './PaymentChecklistTable'
import { checkIfUserIsHost } from '@/utils/sessions'
import useAuth from '@/hooks/useAuth'

export default function SessionSummary({ sessionData }) {
  const { sessionId } = useParams()
  const { userProfile } = useAuth()
  const globalTheme = useMantineTheme()

  return (
    <>
      {!isEmpty(sessionData) && <div>
        <Flex align="center" gap="xs">
          <IconWallet size="1.5rem" color={globalTheme.colors.duck[0]}/>
          <Title sx={() => ({ fontWeight: 500, fontSize: '18px' })} color={globalTheme.colors.duck[0]} py={10}>Payment Summary</Title>
        </Flex>
        <Flex justify="flex-start"><FeeInfo id={sessionId}/></Flex>
        <PaymentSummaryTable id={sessionId}/>
        {
          checkIfUserIsHost(sessionData?.host, userProfile)
            ? <PaymentChecklistTable id={sessionId} sessionData ={sessionData}/>
            : <YourPayment id={sessionId}/>}
      </div> }
    </>

  )
}
