import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import trim from 'lodash/trim'
import type { FoodOrderItem, Menu, MenuItem } from '@/types/food'
import { isSameSelectedOptions } from '@/utils/food'
import { submitOrderList } from '@/hooks/useOrder'

interface State {
  currentShop: string
  foodOrderList: FoodOrderItem[]
  currentMenu: MenuItem[]
  areChangesUnsaved: boolean
}

interface Actions {
  updateFoodOrderItem: (foodOrderItem: FoodOrderItem, sessionId: number) => Promise<void>
  deleteFoodOrderItem: (id: string, sessionId: number) => Promise<void>
  addFoodOrderItem: (foodOrderItem: FoodOrderItem, sessionId: number) => Promise<void>
  setCurrentShop: (currentShop: string) => void
  setCurrentMenu: (currentMenu: Menu) => void
  setFoodOrderList: (foodOrderList: FoodOrderItem[]) => void
  setAreChangesUnsaved: (areChangesUnsaved: boolean) => void
}

const useFoodStore = create(
  immer<State & Actions>((set, get) => ({
    currentShop: '',
    foodOrderList: [],
    currentMenu: [],
    areChangesUnsaved: false,
    setAreChangesUnsaved: (areChangesUnsaved: boolean) => set((state) => {
      state.areChangesUnsaved = areChangesUnsaved
    }),
    updateFoodOrderItem: async (updatedItem: FoodOrderItem, sessionId: number) => {
      set((state) => {
        const index = state.foodOrderList.findIndex(
          item => item.id === updatedItem.id,
        )

        if (index !== -1)
          state.foodOrderList[index] = updatedItem
        state.areChangesUnsaved = true
      })

      await submitOrderList({ sessionId, foodOrderList: get().foodOrderList })
    },
    deleteFoodOrderItem: async (id: string, sessionId: number) => {
      set((state) => {
        state.foodOrderList = state.foodOrderList.filter(
          item => item.id !== id,
        )
      })
      await submitOrderList({ sessionId, foodOrderList: get().foodOrderList })
    },
    addFoodOrderItem: async (item: FoodOrderItem, sessionId: number) => {
      const foodOrderList = get().foodOrderList
      const existingFoodOrderItem = foodOrderList.find(
        foodOrderItem => foodOrderItem.foodName === item.foodName && foodOrderItem.foodId === item.foodId,
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
      else {
        set((state) => {
          state.foodOrderList.push(item)
        })
      }

      await submitOrderList({ sessionId, foodOrderList: get().foodOrderList })
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
