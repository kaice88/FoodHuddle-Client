import { useState, useEffect } from "react";
import { Tabs } from "@mantine/core";

import { useParams } from "react-router-dom";
import { IconShoppingCart, IconSubtask } from "@tabler/icons-react";

import OrderTab from "./Components/OrderTab";
import SessionInfo from "@/components/SessionInfo";
import axiosInstance from "@/settings/axios";

import { REQUEST_GET_SESSION_INFO } from "@/constants/apis";
import type { SessionInfoData } from "@/types/sessions";
import useFoodStore from "@/store/foodStore";

function SessionPage() {
  const { sessionId } = useParams();
  const setCurrentShop = useFoodStore((state) => state.setCurrentShop);
  const [sessionData, setSessionData] = useState<SessionInfoData | null>(null);

  useEffect(() => {
    axiosInstance
      .get<SessionInfoData>(REQUEST_GET_SESSION_INFO(sessionId!))
      .then((response) => {
        setSessionData(response.data);
        setCurrentShop(response.data.shopLink);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <SessionInfo sessionData={sessionData} />
      <Tabs defaultValue={"order"}>
        <Tabs.List>
          <Tabs.Tab value="order" icon={<IconShoppingCart />}>
            Order
          </Tabs.Tab>
          <Tabs.Tab value="summary" icon={<IconSubtask />}>
            Summary
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="order">
          <OrderTab />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

export default SessionPage;
