import { useMutation, useQuery } from '@tanstack/react-query'
import { modals } from '@mantine/modals'

import { notificationShow } from '@/components/Notification'
import { REQUEST_GET_FOOD_ORDER_IN_SUMMARY_TAB, REQUEST_POST_ORDER_BILL } from '@/constants/apis'
import axios from '@/settings/axios'

function usePaymentSession(id) {
  const handleError = (error) => {
    if (error.code === 'ERR_NETWORK')
      notificationShow('error', 'ERROR', error.message)
    else
      notificationShow('error', 'ERROR', error.response?.data?.message || 'Something went wrong.')
  }
  const requestPaymentMutation = useMutation({
    mutationKey: ['request-payment'],
    mutationFn: (data) => {
      return axios.put(`${REQUEST_POST_ORDER_BILL}/20/fee`, data)
    },
    onError: handleError,
  })

  const requestPayment = (data) => {
    const formData = new FormData()
    Object.keys(data).forEach((key) => {
      if (key === 'evidence') {
        data[key].forEach((item) => {
          formData.append(key, item)
        })
      }
      else { formData.append(key, data[key]) }
    })
    requestPaymentMutation.mutate(formData,
      {
        onSuccess: (data) => {
          notificationShow('success', 'SUCCESS', data.data.message)
          modals.closeAll()
        },
      })
  }

  const changeStatusPaymentRequestMutation = useMutation({
    mutationKey: ['request-payment'],
    mutationFn: (data) => {
      return axios.put(`/v1/session/user-payment/${id}/change-statuse`, data)
    },
    onError: handleError,
  })

  const changeStatusPaymentRequest = (data) => {
    changeStatusPaymentRequestMutation.mutate(data,
      {
        onSuccess: (data) => {
          notificationShow('success', 'SUCCESS', data.data.message)
        },
      })
  }

  const fetchPaymentSummary = useQuery({
    queryKey: ['payment-summary'],
    queryFn: () => axios.get(REQUEST_GET_FOOD_ORDER_IN_SUMMARY_TAB, {
      params: {
        sessionId: Number(id),
        groupedBy: 'user',
      },
    }),
    enabled: false,
    onSuccess: (data) => {
      notificationShow('success', 'Success: ', data.data.message)
    },
    onError: handleError,
  })

  return { requestPayment, changeStatusPaymentRequest, fetchPaymentSummary }
}
export default usePaymentSession
