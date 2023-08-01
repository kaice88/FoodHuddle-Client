import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import trim from 'lodash/trim'
import type { FoodOrderItem, Menu, MenuItem } from '@/types/food'
import { isSameSelectedOptions } from '@/utils/food'

interface State {
  currentShop: string
  foodOrderList: FoodOrderItem[]
  currentMenu: MenuItem[]
}

interface Actions {
  updateFoodOrderItem: (foodOrderItem: FoodOrderItem) => void
  deleteFoodOrderItem: (id: string) => void
  addFoodOrderItem: (foodOrderItem: FoodOrderItem) => void
  setCurrentShop: (currentShop: string) => void
  setCurrentMenu: (currentMenu: Menu) => void
  setFoodOrderList: (foodOrderList: FoodOrderItem[]) => void
}

const useFoodStore = create(
  immer<State & Actions>((set, get) => ({
    currentShop: '',
    foodOrderList: [],
    currentMenu: [],
    updateFoodOrderItem: (updatedItem: FoodOrderItem) =>
      set((state) => {
        const index = state.foodOrderList.findIndex(
          item => item.id === updatedItem.id,
        )

        if (index !== -1)
          state.foodOrderList[index] = updatedItem
      }),
    deleteFoodOrderItem: (id: string) =>
      set((state) => {
        state.foodOrderList = state.foodOrderList.filter(
          item => item.id !== id,
        )
      }),
    addFoodOrderItem: (item: FoodOrderItem) => {
      const foodOrderList = get().foodOrderList
      const existingFoodOrderItem = foodOrderList.find(
        foodOrderItem => foodOrderItem.foodName === item.foodName,
      )

      if (
        existingFoodOrderItem
        && isSameSelectedOptions(existingFoodOrderItem, item)
        && trim(existingFoodOrderItem.note) === trim(item.note)
      ) {
        set((state) => {
          const existingFoodOrderItem = state.foodOrderList.find(
            foodOrderItem => foodOrderItem.foodName === item.foodName,
          )
          existingFoodOrderItem!.quantity += item.quantity
        })
        return
      }

      set((state) => {
        state.foodOrderList.push(item)
      })
    },
    setCurrentShop: (shop: string) => {
      set((state) => {
        state.currentShop = shop
      })
    },
    setCurrentMenu: (menu: Menu) => {
      set((state) => {
        state.currentMenu = menu
      })
    },
    setFoodOrderList: (foodOrderList) => {
      set((state) => {
        state.foodOrderList = foodOrderList
      })
    },
  })),
)

export default useFoodStore
