import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IconShoppingCart, IconSubtask } from '@tabler/icons-react'
import { Flex, Loader, Tabs } from '@mantine/core'

import isEmpty from 'lodash/isEmpty'
import OrderTab from './Components/OrderTab'
import SummaryTab from './Components/SummaryTab'
import HostActions from './Components/HostActions'
import SessionSummary from './Components/SessionSummary'
import { notificationShow } from '@/components/Notification'
import useSession from '@/hooks/useSession'
import SessionInfo from '@/components/SessionInfo'
import useAuth from '@/hooks/useAuth'
import useSessionInfo from '@/hooks/useSessionInfo'
import { checkIfUserIsHost } from '@/utils/sessions'
import { SessionStatuses } from '@/enums'
import useSessionInfoStore from '@/store/sessionInfoStore'

function SessionPage() {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const { sessionInfoData } = useSessionInfoStore()
  const { fetchSessionInfo } = useSessionInfo(sessionId)
  const { deleteSession, changeStatus } = useSession(sessionId)
  const { userProfile } = useAuth()

  useEffect(() => {
    const handleGetSessionInfo = async () => {
      await fetchSessionInfo.refetch()
    }
    handleGetSessionInfo()
  }, [])

  const handleDeleteSession = () => {
    deleteSession((data) => {
      notificationShow('success', 'SUCCESS', data.data.message)
      navigate('/sessions-today')
    })
  }

  const handlechangeStatus = (status) => {
    changeStatus(status, (data) => {
      notificationShow('success', 'SUCCESS', data.data.message)
      fetchSessionInfo.refetch()
    })
  }

  // if (fetchSessionInfo)
  //   return <Loader className="loader"/>

  // if (fetchSessionInfo.error)
  //   return <div>This session is not found</div>

  // const isHosted = !isEmpty(sessionInfoData) && checkIfUserIsHost(sessionInfoData?.host, userProfile)
  return (
    <>
      {
        !isEmpty(sessionInfoData)
          ? <>
            {checkIfUserIsHost(sessionInfoData?.host, userProfile) && <HostActions status={sessionInfoData.status} handleDeleteSession={handleDeleteSession} handlechangeStatus={handlechangeStatus} ></HostActions>}
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
                    {!isEmpty(sessionInfoData) && <SummaryTab sessionId={sessionId} isHosted={checkIfUserIsHost(sessionInfoData?.host, userProfile)}/>}
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
