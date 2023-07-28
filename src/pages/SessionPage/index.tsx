import { useState } from 'react'
import { Tabs } from '@mantine/core'
import { useNavigate, useParams } from 'react-router-dom'

import { IconShoppingCart, IconSubtask } from '@tabler/icons-react'

import OrderTab from './Components/OrderTab'
import SummaryTab from './Components/SummaryTab'
import HostActions from './Components/HostActions'
import { notificationShow } from '@/components/Notification'
import useSession from '@/hooks/useSession'
import { SessionStatuses } from '@/enums'

function SessionPage() {
  const { sessionId } = useParams()
  const [currentStatus, setCurrentStatus] = useState('OPEN')
  const navigate = useNavigate()

  const { deleteSession, changeStatus } = useSession(sessionId)

  const handleDeleteSession = () => {
    deleteSession((data) => {
      notificationShow('success', 'SUCCESS', data.data.message)
      navigate('/sessions-today')
    })
  }

  const handlechangeStatus = (status) => {
    changeStatus(status, (data) => {
      notificationShow('success', 'SUCCESS', data.data.message)
      setCurrentStatus(data.data.statusSession)
      if (status === SessionStatuses.PENDING_PAYMENTS)
        navigate(`/sessions-today/${sessionId}/session-summary`)
    })
  }

  return (
    <>
      <HostActions status={currentStatus} handleDeleteSession={handleDeleteSession} handlechangeStatus={handlechangeStatus} ></HostActions>
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
        <Tabs.Panel value="summary">
          <SummaryTab sessionId={sessionId}/>
        </Tabs.Panel>
      </Tabs>
    </>
  )
}

export default SessionPage
