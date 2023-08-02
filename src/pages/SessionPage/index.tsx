import { Loader, Tabs } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { IconShoppingCart, IconSubtask } from '@tabler/icons-react'
import OrderTab from './Components/OrderTab'
import SummaryTab from './Components/SummaryTab'
import SessionInfo from '@/components/SessionInfo'
import useSessionData from '@/hooks/useSessionData'
import { isHost } from '@/utils/sessions'
import useAuth from '@/hooks/useAuth'

function SessionPage() {
  const { sessionId } = useParams()
  const { sessionData, isLoading, error } = useSessionData(sessionId!)
  const { userProfile } = useAuth()

  if (isLoading)
    return <Loader className="loader"/>

  if (error)
    return <div>This session is not found</div>

  const isHosted = isHost(sessionData?.host.googleId, userProfile?.googleId)

  return (
    <>
      <SessionInfo sessionData={sessionData} sessionId={sessionId} isHosted={isHosted}/>
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
          <SummaryTab sessionId={sessionId} isHosted={isHosted}/>
        </Tabs.Panel>
      </Tabs>
    </>

  )
}

export default SessionPage
