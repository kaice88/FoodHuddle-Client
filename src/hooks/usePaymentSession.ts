import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

import { notificationShow } from '@/components/Notification'
import { REQUEST_GET_FOOD_ORDER_IN_SUMMARY_TAB, REQUEST_PAYMENT_CHECKLIST, REQUEST_USER_PAYMENT,REQUEST_ORDER_BILL} from '@/constants/apis'
import axios from '@/settings/axios'
import ax from 'axios'

function usePaymentSession(id) {
  const [paymentSummaryData, setPaymentSummaryData] = useState()
  const [paymentChecklistData, setPaymentChecklistData] = useState()

  const handleError = (error) => {
    if (error.code === 'ERR_NETWORK')
      notificationShow('error', 'ERROR', error.message)
    else
      notificationShow('error', 'ERROR', error.response?.data?.message || 'Something went wrong.')
  }

  // request payment
  const requestPaymentMutation = useMutation({
    mutationKey: ['request-payment'],
    mutationFn: (data) => {
      return axios.put(REQUEST_USER_PAYMENT(id), data)
    },
    onError: handleError,
  })

  const requestPayment =  (data, onSuccess) => {
   
    requestPaymentMutation.mutate(data,
      {
        onSuccess,
      })
  }

  // change a specific payment status to APPROVED/REJECT
  const changeStatusPaymentRequestMutation = useMutation({
    mutationKey: ['request-payment'],
    mutationFn: (data) => {
      return axios.put(`/v1/session/${id}/user-payment/change-status`, data)
    },
    onError: handleError,
  })

  const changeStatusPaymentRequest = (data) => {
    changeStatusPaymentRequestMutation.mutate(data,
      {
        onSuccess: (res) => {
          notificationShow('success', 'SUCCESS', res.data.message)
          fetchPaymentChecklist.refetch()
        },
      })
  }

  // change all payment status to APPROVED
  const approveAllPaymentRequestMutation = useMutation({
    mutationKey: ['approve-all'],
    mutationFn: () => {
      return axios.put(`/v1/session/${id}/user-payment/approve-all`)
    },
    onError: handleError,
  })

  const approveAllPaymentRequest = () => {
    approveAllPaymentRequestMutation.mutate(null,
      {
        onSuccess: (res) => {
          notificationShow('success', 'SUCCESS', res.data.message)
          fetchPaymentChecklist.refetch()
        },
      })
  }

  // fetch payment summary data
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
      setPaymentSummaryData(res.data.data)
    },
    onError: handleError,
  })

  // fetch user payment data
  const fetchUserPayment = useQuery({
    queryKey: ['user-payment'],
    queryFn: () => axios.get(REQUEST_USER_PAYMENT(id)),
    enabled: false,
    onError: handleError,
  })
  
  // fetch payment checklist data
  const fetchPaymentChecklist = useQuery({
    queryKey: ['payment-checklist'],
    queryFn: () => axios.get(REQUEST_PAYMENT_CHECKLIST(id)),
    enabled: false,
    onSuccess: (res) => {
      setPaymentChecklistData(res.data.data)
    },
    onError: handleError,
  })

  // fetch order bill date
  const fetchOrderBill = useQuery({
    queryKey: ['order-bill'],
    queryFn: () => axios.get(REQUEST_ORDER_BILL(id)),
    enabled: false,
    onError: handleError,
  })
  return { requestPayment, changeStatusPaymentRequest, fetchUserPayment, fetchPaymentSummary, paymentSummary: paymentSummaryData?.foodOrderList, sessionId: paymentSummaryData?.sessionId, fetchPaymentChecklist, paymentChecklist: paymentChecklistData, approveAllPaymentRequest, fetchOrderBill  }
}
export default usePaymentSession
