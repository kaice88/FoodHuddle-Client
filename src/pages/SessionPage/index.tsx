import { useEffect, useState } from 'react'
import { Tabs } from '@mantine/core'
import { useNavigate, useParams } from 'react-router-dom'
import { IconShoppingCart, IconSubtask } from '@tabler/icons-react'

import OrderTab from './Components/OrderTab'
import HostActions from './Components/HostActions'
import { SessionStatuses } from '@/enums'
import { notificationShow } from '@/components/Notification'
import useSession from '@/hooks/useSession'
import SessionInfo from '@/components/SessionInfo'
import axiosInstance from '@/settings/axios'

import { REQUEST_GET_SESSION_INFO } from '@/constants/apis'
import type { SessionInfoData } from '@/types/sessions'
import useFoodStore from '@/store/foodStore'

function SessionPage() {
  const { sessionId } = useParams()
  const [currentStatus, setCurrentStatus] = useState('OPEN')
  const setCurrentShop = useFoodStore(state => state.setCurrentShop)
  const [sessionData, setSessionData] = useState<SessionInfoData | null>(null)
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

  useEffect(() => {
    axiosInstance
      .get<SessionInfoData>(REQUEST_GET_SESSION_INFO(sessionId!))
      .then((response) => {
        setSessionData(response.data)
        setCurrentShop(response.data.shopLink)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <>
      <HostActions status={currentStatus} handleDeleteSession={handleDeleteSession} handlechangeStatus={handlechangeStatus} ></HostActions>
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
