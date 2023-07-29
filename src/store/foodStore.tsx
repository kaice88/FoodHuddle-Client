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
  deleteFoodOrderItem: (foodOrderItem: FoodOrderItem) => void;
  addFoodOrderItem: (foodOrderItem: FoodOrderItem) => void;
  setCurrentShop: (currentShop: string) => void;
  setCurrentMenu: (currentMenu: Menu) => void;
};

const useFoodStore = create(
  immer<State & Actions>((set) => ({
    currentShop: "",
    foodOrderList: [],
    currentMenu: [],
    updateFoodOrderItem: (item: FoodOrderItem) => {
      console.log("UPDATED");
    },
    deleteFoodOrderItem: (item: FoodOrderItem) => {},
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
  }))
);

export default useFoodStore;
