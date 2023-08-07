import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { IconShoppingCart, IconSubtask } from '@tabler/icons-react'
import { Flex, Loader, Tabs } from '@mantine/core'

import isEmpty from 'lodash/isEmpty'
import OrderTab from './Components/OrderTab'
import SessionInfo from '@/components/SessionInfo'
import useAuth from '@/hooks/useAuth'
import useSessionInfo from '@/hooks/useSessionInfo'
import { SessionStatuses } from '@/enums'
import useSessionInfoStore from '@/store/sessionInfoStore'
import { checkIfUserIsHost } from '@/utils/sessions'

function SessionPage() {
  const { sessionId } = useParams()
  const { sessionInfoData } = useSessionInfoStore()
  const { fetchSessionInfo } = useSessionInfo(sessionId)

  const { userProfile } = useAuth()

  useEffect(() => {
    const handleGetSessionInfo = async () => {
      await fetchSessionInfo.refetch()
    }
    handleGetSessionInfo()
  }, [])

  return (
    <>
      {
        !isEmpty(sessionInfoData)
          ? <>
            {/* {checkIfUserIsHost(sessionInfoData?.host, userProfile) && <HostActions status={sessionInfoData.status} handleDeleteSession={handleDeleteSession} handlechangeStatus={handlechangeStatus} ></HostActions>} */}
            <SessionInfo sessionData={sessionInfoData} sessionId={sessionId} isHosted={checkIfUserIsHost(sessionInfoData?.host, userProfile)} />
            {
              (sessionInfoData.status === SessionStatuses.PENDING_PAYMENTS || sessionInfoData.status === SessionStatuses.FINISHED)
                ? <SessionSummary sessionData={sessionInfoData}/>
                : <Tabs keepMounted={false} defaultValue={'order'}>
                  <Tabs.List>
                    <Tabs.Tab value="order" icon={<IconShoppingCart />}>
                    Order
                    </Tabs.Tab>
                    <Tabs.Tab value="summary" icon={<IconSubtask />}>
                    Summary
                    </Tabs.Tab>
                  </Tabs.List>
                  <Tabs.Panel value="order">
                    <OrderTab />
                  </Tabs.Panel>
                  <Tabs.Panel value="summary">
                  </Tabs.Panel>
                </Tabs>
            }
          </>
          : <Flex justify="center" align="center">
            <Loader/>
          </Flex>
      }
    </>
  )
}

export default SessionPage
