import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

import { useNavigate } from 'react-router-dom'
import { notificationShow } from '@/components/Notification'
import { REQUEST_GET_FOOD_ORDER_IN_SUMMARY_TAB, REQUEST_USER_PAYMENT } from '@/constants/apis'
import axios from '@/settings/axios'

function usePaymentSession(id) {
  const [paymentSummaryData, setPaymentSummaryData] = useState()
  // const [userPaymentData, setUserPaymentData] = useState()

  const navigate = useNavigate()
  const handleError = (error) => {
    if (error.code === 'ERR_NETWORK')
      notificationShow('error', 'ERROR', error.message)
    else
      notificationShow('error', 'ERROR', error.response?.data?.message || 'Something went wrong.')
  }
  const requestPaymentMutation = useMutation({
    mutationKey: ['request-payment'],
    mutationFn: (data) => {
      return axios.put(REQUEST_USER_PAYMENT(id), data)
    },
    onError: handleError,
  })

  const requestPayment = (data, onSuccess) => {
    const formData = new FormData()
    Object.keys(data).forEach((key) => {
      if (key === 'evidence') {
        data[key].forEach((item) => {
          formData.append(key, item)
        })
      }
      else { formData.append(key, data[key]) }
    })
    const finalPayment = 50
    formData.append('finalPayment', finalPayment)
    requestPaymentMutation.mutate(formData,
      {
        onSuccess,
      })
  }

  const changeStatusPaymentRequestMutation = useMutation({
    mutationKey: ['request-payment'],
    mutationFn: (data) => {
      return axios.put(`/v1/session/user-payment/${id}/change-status`, data)
    },
    onError: handleError,
  })

  const changeStatusPaymentRequest = (data) => {
    changeStatusPaymentRequestMutation.mutate(data,
      {
        onSuccess: (res) => {
          notificationShow('success', 'SUCCESS', res.data.message)
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
    onSuccess: (res) => {
      // notificationShow('success', 'Success: ', res.data.message)
      setPaymentSummaryData(res.data.data)
    },
    onError: handleError,
  })

  const fetchUserPayment = useQuery({
    queryKey: ['user-payment'],
    queryFn: () => axios.get(REQUEST_USER_PAYMENT(id)),
    enabled: false,
    // onSuccess: (res) => {
    //   // notificationShow('success', 'Success: ', res.data.message)
    //   setUserPaymentData(res.data.data)
    //   console.log(res.data.data)
    // },
    onError: handleError,
  })

  return { requestPayment, changeStatusPaymentRequest, fetchUserPayment, fetchPaymentSummary, paymentSummary: paymentSummaryData?.foodOrderList, sessionId: paymentSummaryData?.sessionId }
}
export default usePaymentSession
