import { Loader, Tabs } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { IconShoppingCart, IconSubtask } from '@tabler/icons-react'
import { useEffect } from 'react'
import { isEmpty } from 'lodash'
import OrderTab from './Components/OrderTab'
import SummaryTab from './Components/SummaryTab'
import SessionInfo from '@/components/SessionInfo'
import { isHost } from '@/utils/sessions'
import useAuth from '@/hooks/useAuth'
import useSessionInfo from '@/hooks/useSessionInfo'
import useSessionInfoStore from '@/store/sessionInfoStore'

function SessionPage() {
  const { sessionId } = useParams()
  const { sessionInfoData } = useSessionInfoStore()
  const { fetchSessionInfo } = useSessionInfo()
  const fetchQuerySessionInfo = fetchSessionInfo(sessionId)

  useEffect(() => {
    const handleGetSessionInfo = async () => {
      await fetchQuerySessionInfo.refetch()
    }
    handleGetSessionInfo()
  }, [])
  const { userProfile } = useAuth()

  if (fetchQuerySessionInfo.isLoading)
    return <Loader className="loader"/>

  if (fetchQuerySessionInfo.error)
    return <div>This session is not found</div>

  const isHosted = !isEmpty(sessionInfoData) && isHost(sessionInfoData.host.googleId, userProfile?.googleId)

  return (
    <>
      {!isEmpty(sessionInfoData) && <SessionInfo sessionData={sessionInfoData} sessionId={sessionId} isHosted={isHosted} />}
      <Tabs keepMounted={false} defaultValue={'order'}>
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
          {!isEmpty(sessionInfoData) && <SummaryTab sessionId={sessionId} isHosted={isHosted}/>}
        </Tabs.Panel>
      </Tabs>
    </>

  )
}

export default SessionPage
