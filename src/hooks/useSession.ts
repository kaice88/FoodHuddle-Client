import { useMutation } from '@tanstack/react-query'

import { notificationShow } from '@/components/Notification'
import { REQUEST_UPDATE_SESSION_STATUS, SESSION_BASE_URL } from '@/constants/apis'
import axios from '@/settings/axios'

function useSession(id) {
  const handleError = (error) => {
    if (error.code === 'ERR_NETWORK')
      notificationShow('error', 'ERROR', error.message)
    else
      notificationShow('error', 'ERROR', error.response?.data?.message || 'Something went wrong.')
  }

  const changeStatusMutation = useMutation({
    mutationKey: ['change-status'],
    mutationFn: (status) => {
      return axios.put(REQUEST_UPDATE_SESSION_STATUS(id), {
        status,
      })
    },
    onError: handleError,
  })

  const deleteSessionMutation = useMutation({
    mutationKey: ['delete-session'],
    mutationFn: () => {
      return axios.delete(`${SESSION_BASE_URL}/${id}`)
    },
    onError: handleError,
  })

  const deleteSession = (onSuccess) => {
    deleteSessionMutation.mutate(null, { onSuccess })
  }

  const changeStatus = (status, onSuccess) => {
    changeStatusMutation.mutate(status, {
      onSuccess,
    })
  }
  return { deleteSession, changeStatus }
}
export default useSession
