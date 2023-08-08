import { useEffect } from 'react'
import { isEmpty } from 'lodash'

import { useRequestProcessor } from '@/settings/react-query'
import type { Menu, MenuResponseData } from '@/types/food'

import axiosInstance from '@/settings/axios'
import { REQUEST_GET_FOOD_MENU } from '@/constants/apis'
import useFoodStore from '@/store/foodStore'

async function fetchMenuFoodData(sessionId: string) {
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

function menuFoodQuery(sessionId: string, currentShop: string) {
  const { query } = useRequestProcessor()
  return query<Menu, Error>(['FoodMenu', sessionId, currentShop], () =>
    fetchMenuFoodData(sessionId),
  )
}

function useMenu(sessionId: string) {
  const setCurrentMenu = useFoodStore(state => state.setCurrentMenu)
  const currentShop = useFoodStore(state => state.currentShop)

  const { isLoading, data, error } = menuFoodQuery(sessionId, currentShop)

  useEffect(() => {
    if (!isEmpty(data))
      setCurrentMenu(data!)
  }, [data, setCurrentMenu])

  return { isLoading, data, error }
}

export default useMenu
