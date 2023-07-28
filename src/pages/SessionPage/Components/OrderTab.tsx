import FoodItemsTable from "@/components/FoodItemsTable";
import React from "react";
import { modals } from "@mantine/modals";
import { Text, Button } from "@mantine/core";
import FoodMenu from "@/components/FoodMenu";

function OrderTab() {
  return (
    <div className="orderTab">
      {" "}
      <FoodMenu />
      <FoodItemsTable />
    </div>
  );
}

export default OrderTab;
