import React from 'react'
import FoodMenu from '@/components/FoodMenu'
import FoodOrderTable from '@/components/FoodOrderTable'

function OrderTab() {
  return (
    <div className="orderTab">
      {' '}
      <FoodMenu />
      <FoodOrderTable />
    </div>
  )
}

export default OrderTab
