import React from "react"
import { modals } from "@mantine/modals"
import { Text, Button } from "@mantine/core"
import FoodMenu from "@/components/FoodMenu"
import FoodOrderTable from "@/components/FoodOrderTable"
import OrderList from "@/components/OrderList"
function OrderTab() {
  return (
    <div className="orderTab">
      {" "}
      <FoodMenu />
      <OrderList/>
    </div>
  )
}

export default OrderTab
