import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { notificationShow } from '@/components/Notification'
import { REQUEST_EDIT_SESSION_INFO, REQUEST_GET_HOST_PAYMENT_INFO, REQUEST_GET_SESSION_INFO, REQUEST_POST_SESSION_INFO } from '@/constants/apis'
import axiosInstance from '@/settings/axios'
import { useRequestProcessor } from '@/settings/react-query'
import useSessionInfoStore from '@/store/sessionInfoStore'

function useSessionInfo(id) {
  const { mutation, query } = useRequestProcessor()
  const { setSessionInfoData } = useSessionInfoStore()

  const navigate = useNavigate()

  const fetchSessionInfo = useQuery(
    ['get-sessionInfo'],
    () => axiosInstance.get(REQUEST_GET_SESSION_INFO(id!)),
    {
      enabled: false,
      onSuccess: (data) => {
        setSessionInfoData(data.data)
      },
      onError: (error) => {
        notificationShow('error', 'Error: ', error.response.data.message)
      },
    },
  )

  const fetchQueryHostPaymentInfo = form => query(
    ['paymentInfo'],
    () => axiosInstance.get(REQUEST_GET_HOST_PAYMENT_INFO),
    {
      enabled: false,
      onSuccess: (data) => {
        form.setFieldValue('hostPaymentInfo', data.data.hostPaymentInfor)
        form.setFieldValue('qrImages', data.data.qrImages)
      },
      onError: (error) => {
        notificationShow('error', 'Error: ', error.response.data.message)
      },
    },
  )

  const mutateEditSessionInfo = (sessionId, close) => mutation(
    ['sessionInfo'],
    async data =>
      await axiosInstance.put(REQUEST_EDIT_SESSION_INFO(sessionId), data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      ),
    {
      onError: (error) => {
        notificationShow('error', 'Error: ', error.response.data.message)
      },
      onSuccess: (data) => {
        const { message } = data.data
        notificationShow('success', 'Success: ', message)
        fetchSessionInfo.refetch()
        close()
        setSessionInfoData(data.data.data)
      },
    },
  )

  const mutateSessionInfo = mutation(
    ['create-sessionInfo'],
    async data =>
      await axiosInstance.post(REQUEST_POST_SESSION_INFO, data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      ),
    {
      onError: (error) => {
        notificationShow('error', 'Error: ', error.response.data.message)
      },
      onSuccess: (data) => {
        const { id, message } = data.data
        notificationShow('success', 'Success: ', message)
        navigate(`/sessions/${id}`)
      },
    },
  )

  return { mutateEditSessionInfo, mutateSessionInfo, fetchQueryHostPaymentInfo, fetchSessionInfo }
}

export default useSessionInfo
