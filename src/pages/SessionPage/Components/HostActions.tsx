import { useState } from 'react'
import { Flex } from '@mantine/core'

import { notificationShow } from '@/components/Notification'
import { SessionStatuses } from '@/enums'
import axios from '@/settings/axios'
import { useRequestProcessor } from '@/settings/react-query'
import { REQUEST_SESSION } from '@/constants/apis'
import ActionButton from '@/components/ActionButton'

const HostActions = ({ id }) => {
  const [status, setStatus] = useState('OPEN')
  const { mutation } = useRequestProcessor()

  const handleError = (error) => {
    if (error.code === 'ERR_NETWORK')
      notificationShow('error', 'ERROR', error.message)
    else
      notificationShow('error', 'ERROR', error.response?.data?.message || 'Something went wrong.')
  }

  const changeStatusMutation = mutation(
    'change-status',
    (status) => {
      return axios.put(REQUEST_SESSION(id), {
        status,
      })
    },
    {
      onError: handleError,
      onSuccess: (data) => {
        notificationShow('success', 'SUCCESS', data.data.message)
        setStatus(data.data.statusSession)
      },
    },
  )

  const deleteSessionMutation = mutation(
    'delete-session',
    () => {
      return axios.delete(REQUEST_SESSION(id))
    },
    {
      onError: handleError,
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
    <Flex
      gap="xs"
      justify="flex-end"
      wrap="wrap">
      <ActionButton value="delete" colorName="orange" onClick={handleDeleteSession}></ActionButton>
      <ActionButton
        value={status === 'OPEN' ? 'lock order' : 'split payment'}
        colorName={status === 'OPEN' ? 'bashfulPink' : 'watermelon'}
        onClick={() =>
          handleChangeStatus(
            status === 'OPEN'
              ? SessionStatuses.LOCKED
              : SessionStatuses.PENDING_PAYMENTS,
          )
        }
      />
    </Flex>)
}

export default HostActions
