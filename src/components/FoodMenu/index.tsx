import React, { useEffect } from "react";
import axiosInstance from "@/settings/axios";
import { REQUEST_GET_FOOD_MENU } from "@/constants/apis";

type Props = { sessionId: string | number };

function FoodMenu({ sessionId }: Props) {
  useEffect(() => {
    axiosInstance
      .get(REQUEST_GET_FOOD_MENU, {
        params: { sessionId: sessionId },
      })
      .then((res) => console.log(res));
  });
  return <div>FoodMenu</div>;
}

export default FoodMenu;
