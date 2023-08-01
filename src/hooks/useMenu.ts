import { useEffect } from 'react'
import { useRequestProcessor } from '@/settings/react-query'
import type { Menu, MenuResponseData } from '@/types/food'

import axiosInstance from '@/settings/axios'
import { REQUEST_GET_FOOD_MENU } from '@/constants/apis'
import useFoodStore from '@/store/foodStore'

const { query } = useRequestProcessor()
const fetchMenuFoodData = async (sessionId: string) => {
  const response = await axiosInstance.get<MenuResponseData>(
    REQUEST_GET_FOOD_MENU,
    { params: { sessionId } },
  )

  if (response.status === 200) {
    const { data: menu } = response.data
    return menu
  }
  return []
}

const menuFoodQuery = (sessionId: string, currentShop: string) => {
  return query<Menu, Error>(['FoodMenu', sessionId, currentShop], () =>
    fetchMenuFoodData(sessionId),
  )
}

function useMenu(sessionId: string) {
  const setCurrentMenu = useFoodStore(state => state.setCurrentMenu)
  const currentShop = useFoodStore(state => state.currentShop)

  const { isLoading, data, error } = menuFoodQuery(sessionId, currentShop)

  useEffect(() => {
    setCurrentMenu(data!)
  }, [isLoading])

  return { isLoading, data, error }
}

export default useMenu