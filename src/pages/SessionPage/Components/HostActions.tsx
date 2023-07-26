import { useState } from 'react'
import axios from '@/settings/axios'
import { useRequestProcessor } from '@/settings/react-query'
import ActionButton from '@/components/ActionButton'
import { notificationShow } from '@/components/Notification'
import { SessionStatuses } from '@/enums'

const HostActions = ({ id }) => {
  const [status, setStatus] = useState('OPEN')
  const { mutation } = useRequestProcessor()

  const changeStatusMutation = mutation(
    'change-status',
    (status) => {
      return axios.put(`/v1/session/${id}`, {
        status,
      })
    },
    {
      onError: (error) => {
        if (error.code === 'ERR_NETWORK')
          notificationShow('error', 'ERROR', error.message)
        else notificationShow('error', 'ERROR', error.response.data.message)
      },
      onSuccess: (data) => {
        notificationShow('success', 'SUCCESS', data.data.message)
        setStatus(SessionStatuses.LOCKED)
      },
    },
  )

  const deleteSessionMutation = mutation(
    'delete-session',
    () => {
      return axios.delete(`/v1/session/${id}`)
    },
    {
      onError: (error) => {
        if (error.code === 'ERR_NETWORK')
          notificationShow('error', 'ERROR', error.message)
        else notificationShow('error', 'ERROR', error.response.data.message)
      },
      onSuccess: (data) => {
        notificationShow('success', 'SUCCESS', data.data.message)
      },
    },
  )

  const handleDeleteSession = () => {
    deleteSessionMutation.mutate()
  }

  const handleChangeStatus = (status) => {
    changeStatusMutation.mutate(status)
  }

  return (
    <div>
      OrderPage{id}
      <div>
        {status === 'OPEN'
          ? (
            <ActionButton value="lock order" colorName="bashfulPink" onClick={() => handleChangeStatus(SessionStatuses.LOCKED)}></ActionButton>
            )
          : (
            <ActionButton value="split payment" colorName="watermelon" onClick={() => handleChangeStatus(SessionStatuses.PENDING_PAYMENTS)}></ActionButton>
          )}
        <ActionButton value="delete" colorName="bashfulPink" onClick={handleDeleteSession}></ActionButton>
      </div>
    </div>)
}

export default HostActions
