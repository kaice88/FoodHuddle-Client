import useFoodStore from "@/store/foodStore";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { useRequestProcessor } from "@/settings/react-query";
import type { FoodOrderListData, FoodOrderItem } from "@/types/food";

import axiosInstance from "@/settings/axios";
import {
  REQUEST_EDIT_FOOD_ORDER_LIST,
  REQUEST_GET_FOOD_ORDER_LIST,
} from "@/constants/apis";
import { notificationShow } from "@/components/Notification";

type EditOrderListResponseData = { status: string; message: string };
type GetOrderListResponseData = {
  status: string;
  message: string;
  data: { sessionId: number; foodOrderList: Omit<FoodOrderItem, "id">[] };
};

const { query, mutation } = useRequestProcessor();

export const editFoodOrderList = async (
  foodOrderListData: FoodOrderListData
) => {
  const response = await axiosInstance.put<EditOrderListResponseData>(
    REQUEST_EDIT_FOOD_ORDER_LIST,
    foodOrderListData
  );

  if (response.status == 200) {
    return response.data;
  }
};

export const fetchFoodOrderList = async (sessionId: number) => {
  const response = await axiosInstance.get<GetOrderListResponseData>(
    REQUEST_GET_FOOD_ORDER_LIST(sessionId)
  );

  if (response.status === 200) {
    return response.data.data.foodOrderList.map((orderItem) => ({
      ...orderItem,
      id: uuidv4(),
    }));
  }
};

export const foodOrderListMutation = (foodOrderListData: FoodOrderListData) => {
  return mutation<EditOrderListResponseData, Error, FoodOrderListData>(
    ["editFoodOrderList"],
    () => editFoodOrderList(foodOrderListData),
    {
      onSuccess: () => {
        notificationShow("success", "Food Order", "Submit order successfully");
      },
    }
  );
};

export const foodOrderListQuery = (sessionId: number) => {
  return query<FoodOrderItem[], Error>(["fetchFoodOrderList", sessionId], () =>
    fetchFoodOrderList(sessionId)
  );
};
