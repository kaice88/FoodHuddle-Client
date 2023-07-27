import FoodItemsTable from "@/components/FoodItemsTable";
import React from "react";
import { modals } from "@mantine/modals";
import { Text, Button } from "@mantine/core";

function OrderTab() {
  return (
    <div className="orderTab">
      <div className="orderTab__tableWrapper">
        {" "}
        <FoodItemsTable />
      </div>
    </div>
  );
}

export default OrderTab;
