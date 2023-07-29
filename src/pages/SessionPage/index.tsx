import React from 'react'
import { Tabs } from '@mantine/core'

import { useParams } from 'react-router-dom'
import { IconShoppingCart, IconSubtask } from '@tabler/icons-react'

import OrderTab from './Components/OrderTab'
import SummaryTab from './Components/SummaryTab'

function SessionPage() {
  const { sessionId } = useParams()
  return (
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
        <SummaryTab sessionId={sessionId}/>
      </Tabs.Panel>
    </Tabs>
  )
}

export default SessionPage
