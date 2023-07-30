import { FoodOrderItem, Menu, MenuItem } from "@/types/food";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  currentShop: string;
  foodOrderList: FoodOrderItem[];
  currentMenu: MenuItem[];
};

type Actions = {
  updateFoodOrderItem: (foodOrderItem: FoodOrderItem) => void;
  deleteFoodOrderItem: (id: string) => void;
  addFoodOrderItem: (foodOrderItem: FoodOrderItem) => void;
  setCurrentShop: (currentShop: string) => void;
  setCurrentMenu: (currentMenu: Menu) => void;
  setFoodOrderList: (foodOrderList: FoodOrderItem[]) => void;
};

const useFoodStore = create(
  immer<State & Actions>((set) => ({
    currentShop: "",
    foodOrderList: [],
    currentMenu: [],
    updateFoodOrderItem: (updatedItem: FoodOrderItem) =>
      set((state) => {
        let index = state.foodOrderList.findIndex(
          (item) => item.id === updatedItem.id
        );

        console.log(index);
        if (index !== -1) {
          state.foodOrderList[index] = updatedItem;
        }
      }),
    deleteFoodOrderItem: (id: string) =>
      set((state) => {
        state.foodOrderList = state.foodOrderList.filter(
          (item) => item.id !== id
        );
      }),
    addFoodOrderItem: (item: FoodOrderItem) =>
      set((state) => {
        state.foodOrderList.push(item);
      }),
    setCurrentShop: (shop: string) => {
      set((state) => {
        state.currentShop = shop;
      });
    },
    setCurrentMenu: (menu: Menu) => {
      set((state) => {
        state.currentMenu = menu;
      });
    },
    setFoodOrderList: (foodOrderList) => {
      set((state) => {
        state.foodOrderList = foodOrderList;
      });
    },
  }))
);

export default useFoodStore;
