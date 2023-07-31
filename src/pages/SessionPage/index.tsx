import { Loader, Tabs } from '@mantine/core'

import { useParams } from 'react-router-dom'
import { IconShoppingCart, IconSubtask } from '@tabler/icons-react'

import OrderTab from './Components/OrderTab'
import SessionInfo from '@/components/SessionInfo'

import useSessionData from '@/hooks/useSessionData'

function SessionPage() {
  const { sessionId } = useParams()
  const { sessionData, isLoading, error } = useSessionData(sessionId!)

  if (isLoading)
    return <Loader className="loader"/>

  if (error)
    return <div>This session is not found</div>

  return (
    <>
      <SessionInfo sessionData={sessionData} />
      <Tabs defaultValue={'order'}>
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
      </Tabs>
    </>
  )
}


export default SessionPage
