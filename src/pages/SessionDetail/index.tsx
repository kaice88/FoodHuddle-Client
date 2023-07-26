import React from "react";
import { Tabs } from "@mantine/core";

import { useParams } from "react-router-dom";
import { IconShoppingCart, IconSubtask } from "@tabler/icons-react";

import OrderTab from "./Components/OrderTab";
function SessionDetail() {
  const { sessionId } = useParams();
  return (
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
  );
}

export default SessionDetail;
