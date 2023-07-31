import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IconShoppingCart, IconSubtask } from '@tabler/icons-react'
import { Loader, Tabs } from '@mantine/core'

import OrderTab from './Components/OrderTab'
import HostActions from './Components/HostActions'
import { SessionStatuses } from '@/enums'
import { notificationShow } from '@/components/Notification'
import useSession from '@/hooks/useSession'
import SessionInfo from '@/components/SessionInfo'
import useSessionData from '@/hooks/useSessionData'
import { isHost } from '@/utils/sessions'
import useAuth from '@/hooks/useAuth'

function SessionPage() {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const { sessionData, isLoading, error } = useSessionData(sessionId!)
  const { deleteSession, changeStatus } = useSession(sessionId)
  const [currentStatus, setCurrentStatus] = useState(sessionData?.status)
  const { userProfile } = useAuth()

  useEffect(() => {
    if (sessionData) {
      setCurrentStatus(sessionData?.status)
      console.log(isHost(sessionData?.host.googleId, userProfile?.googleId))
    }
  }, [sessionData])

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

  if (isLoading)
    return <Loader className="loader"/>

  if (error)
    return <div>This session is not found</div>

  return (
    <>
      <span>{currentStatus}</span>
      {isHost(sessionData?.host.googleId, userProfile?.googleId) && <HostActions status={currentStatus} handleDeleteSession={handleDeleteSession} handlechangeStatus={handlechangeStatus} ></HostActions>}
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
