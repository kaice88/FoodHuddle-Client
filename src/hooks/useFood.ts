import { useRequestProcessor } from "@/settings/react-query";
import type { MenuResponseData, Menu } from "@/types/food";

import axiosInstance from "@/settings/axios";
import { REQUEST_GET_FOOD_MENU } from "@/constants/apis";

const { query, mutation } = useRequestProcessor();

const fetchMenuFoodData = async (sessionId: string) => {
  const response = await axiosInstance.get<MenuResponseData>(
    REQUEST_GET_FOOD_MENU,
    { params: { sessionId } }
  );

  if (response.status === 200) {
    const { data: menu } = response.data;
    console.log(menu);
    return menu;
  }
  return [];
};

const getMenuFoodData = (sessionId: string, currentShop: string) => {
  return query<Menu, Error>(["FoodMenu", sessionId, currentShop], () =>
    fetchMenuFoodData(sessionId)
  );
};

function useFood() {
  return { getMenuFoodData };
}

export default useFood;
