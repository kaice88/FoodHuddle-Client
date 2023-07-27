import axiosInstance from "@/settings/axios";
import type { FoodItem } from "@/types/food";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  foodList: FoodItem[];
};

type Actions = {
  increment: (qty: number) => void;
  decrement: (qty: number) => void;
};

export const useCountStore = create(
  immer<State & Actions>((set) => ({
    count: 0,
    increment: (qty: number) =>
      set((state) => {
        state.count += qty;
      }),
    decrement: (qty: number) =>
      set((state) => {
        state.count -= qty;
      }),
  }))
);
