import { ActionIcon, Flex, Text, Title } from '@mantine/core'
import { IconEdit, IconShoppingCartOff } from '@tabler/icons-react'
import { isEmpty } from 'lodash'

import type { FoodOrderItem } from '@/types/food'
import { moneyFormat } from '@/utils'
import { calculateFoodOrderItemTotal } from '@/utils/food'

interface OrderItemProps {
  orderItem: FoodOrderItem
  editOrderHandler: () => void
  deleteOrderItemHandler: () => void
}

function OrderItem({ orderItem, deleteOrderItemHandler, editOrderHandler }: OrderItemProps) {
  const { foodImage, foodName, note, quantity, options } = orderItem
  return (
    <div className="foodOrderItem">
      <div className="foodOrderItem__image">
        <img src={foodImage} alt="foodName" />
      </div>
      <div className="foodOrderItem__info">
        <Text fw={600} size="md" className="foodOrderItem__name">{foodName}</Text>
        {!isEmpty(options)
        && <Text sx={{ wordWrap: 'break-word' }} c="dimmed" size="sm" className="foodOrderItem__options">
          {options.flatMap(option => option.detail.map(detail => detail.name)).join(', ')}
        </Text>}
        {!isEmpty(note)
        && <Text lineClamp={3} className="foodOrderItem__note" >{note}
        </Text>
        }
        <Flex align="center" gap={2} justify="start">
          <Text fw={600} size="xs" className="foodOrderItem__quantity__x">x</Text>
          <Text color="brand" size="md" fw={600} className="foodOrderItem__quantity">{quantity}</Text>
        </Flex>
        <Title color="brand" className="foodOrderItem__total" order={4}>{moneyFormat(calculateFoodOrderItemTotal(orderItem), 'VND', 'vi-VN')}</Title>
        <Flex gap={8} align="center" justify="flex-end">
          <ActionIcon color="brand.5" size="xs" onClick={editOrderHandler}>
            <IconEdit/>
          </ActionIcon>
          <ActionIcon color="brand.5" onClick={deleteOrderItemHandler} size="xs">
            <IconShoppingCartOff />
          </ActionIcon>
        </Flex>
      </div>
    </div>
  )
}

export default OrderItem
