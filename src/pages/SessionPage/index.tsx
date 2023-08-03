import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IconShoppingCart, IconSubtask } from '@tabler/icons-react'
import { Loader, Tabs } from '@mantine/core'

import SessionSummary from '../SessionSummary'
import OrderTab from './Components/OrderTab'
import SummaryTab from './Components/SummaryTab'
import HostActions from './Components/HostActions'
import { SessionStatuses } from '@/enums'
import { notificationShow } from '@/components/Notification'
import useSession from '@/hooks/useSession'
import SessionInfo from '@/components/SessionInfo'
import useSessionData from '@/hooks/useSessionData'
import { checkIfUserIsHost } from '@/utils/sessions'
import useAuth from '@/hooks/useAuth'

function SessionPage() {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const { sessionData, isLoading, error } = useSessionData(sessionId!)
  const { deleteSession, changeStatus } = useSession(sessionId)
  const [currentStatus, setCurrentStatus] = useState(sessionData?.status)
  const { userProfile } = useAuth()

  useEffect(() => {
    setCurrentStatus(sessionData?.status)
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
    })
  }

  if (isLoading)
    return <Loader className="loader"/>

  if (error)
    return <div>This session is not found</div>

  return (
    <>
      <span>{currentStatus}</span>
      {checkIfUserIsHost(sessionData?.host, userProfile) && <HostActions status={currentStatus} handleDeleteSession={handleDeleteSession} handlechangeStatus={handlechangeStatus} ></HostActions>}
      <SessionInfo sessionData={sessionData} />
      {(currentStatus === SessionStatuses.PENDING_PAYMENTS || currentStatus === SessionStatuses.FINISHED)
        ? <SessionSummary/>
        : <Tabs defaultValue={'order'}>
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
        </Tabs>}
    </>
  )
}

export default SessionPage
