import React from 'react'
import FoodMenu from '@/components/FoodMenu'
import OrderList from '@/components/OrderList'

function OrderTab() {
  return (
    <div className="orderTab">
      <FoodMenu />
      <OrderList/>
    </div>
  )
}

export default OrderTab
