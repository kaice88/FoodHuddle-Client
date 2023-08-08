import { v4 as uuidv4 } from 'uuid'

import type { FoodOrderItem, FoodOrderListData } from '@/types/food'

import axiosInstance from '@/settings/axios'
import { REQUEST_EDIT_FOOD_ORDER_LIST, REQUEST_GET_FOOD_ORDER_LIST } from '@/constants/apis'
import { notificationShow } from '@/components/Notification'

interface EditOrderListResponseData { status: string; message: string }
interface GetOrderListResponseData {
  status: string
  message: string
  data: { sessionId: number; foodOrderList: Omit<FoodOrderItem, 'id'>[] }
}

export const submitOrderList = async (
  foodOrderListData: FoodOrderListData,
) => {
  try {
    const response = await axiosInstance.put<EditOrderListResponseData>(
      REQUEST_EDIT_FOOD_ORDER_LIST,
      foodOrderListData,
    )

    if (response.status === 200) {
      notificationShow('success', 'Food Order', 'Update order successfully')
      return response.data
    }
  }
  catch (error) {
    notificationShow('error', 'Food Order', 'There is a problem updating order. Please try again!')
  }
}

export const fetchFoodOrderList = async (sessionId: number) => {
  const response = await axiosInstance.get<GetOrderListResponseData>(
    REQUEST_GET_FOOD_ORDER_LIST(sessionId),
  )

  if (response.status === 200) {
    return response.data.data.foodOrderList.map(orderItem => ({
      ...orderItem,
      id: uuidv4(),
    }))
  }
}
