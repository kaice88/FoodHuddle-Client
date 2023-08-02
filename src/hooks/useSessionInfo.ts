import { useNavigate } from 'react-router-dom'
import { notificationShow } from '@/components/Notification'
import { REQUEST_EDIT_SESSION_INFO, REQUEST_GET_HOST_PAYMENT_INFO, REQUEST_POST_SESSION_INFO } from '@/constants/apis'
import axiosInstance from '@/settings/axios'
import { useRequestProcessor } from '@/settings/react-query'

function useSessionInfo() {
  const { mutation, query } = useRequestProcessor()
  const navigate = useNavigate()
  const fetchQueryHostPaymentInfo = form => query(
    ['paymentInfo'],
    () => axiosInstance.get(REQUEST_GET_HOST_PAYMENT_INFO),
    {
      enabled: false,
      onSuccess: (data) => {
        form.setFieldValue('hostPaymentInfo', data.data.hostPaymentInfor)
        form.setFieldValue('qrImages', data.data.qr_images)
      },
      onError: (error) => {
        notificationShow('error', 'Error: ', error.response.data.message)
      },
    },
  )

  const mutateEditSessionInfo = sessionId => mutation(
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
        const { id, message } = data.data
        notificationShow('success', 'Success: ', message)
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
        navigate(`/sessions-today/${id}`)
      },
    },
  )

  return { mutateEditSessionInfo, mutateSessionInfo, fetchQueryHostPaymentInfo }
}

export default useSessionInfo
