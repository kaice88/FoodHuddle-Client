import { FoodOrderItem } from "@/types/food";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  currentShop: string;
  foodOrderList: FoodOrderItem[];
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
    updateFoodOrderItem: (item) => {},
    deleteFoodOrderItem: (item) => {},
    addFoodOrderItem: (item) => {},
    setCurrentShop: (currentShop: string) => {
      set((state) => {
        state.currentShop = currentShop;
      });
    },
  }))
);

export default useFoodStore;
