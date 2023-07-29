import { FoodOrderItem, MenuItem } from "@/types/food";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  currentShop: string;
  foodOrderList: FoodOrderItem[];
  foodMenu: MenuItem[];
};

type Actions = {
  updateFoodOrderItem: (foodOrderItem: FoodOrderItem) => void;
  deleteFoodOrderItem: (foodOrderItem: FoodOrderItem) => void;
  addFoodOrderItem: (foodOrderItem: FoodOrderItem) => void;
  setCurrentShop: (currentShop: string) => void;
};

const useFoodStore = create(
  immer<State & Actions>((set) => ({
    currentShop: "",
    foodOrderList: [],
    foodMenu: [],
    updateFoodOrderItem: (item) => {},
    deleteFoodOrderItem: (item) => {},
    addFoodOrderItem: (item) =>
      set((state) => {
        state.foodOrderList.push(item);
      }),
    setCurrentShop: (currentShop: string) => {
      set((state) => {
        state.currentShop = currentShop;
      });
    },
  }))
);

export default useFoodStore;
