import { Button, Center, Flex, SimpleGrid, Text, Title } from '@mantine/core'
import { isEmpty } from 'lodash'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { IconMoodSad, IconShoppingBagCheck, IconShoppingCart, IconShoppingCartOff } from '@tabler/icons-react'
import EditOrderForm from '../FoodOrderForm/Edit'
import OrderItem from './OrderItem'
import useFoodStore from '@/store/foodStore'
import { fetchFoodOrderList, submitOrderList } from '@/hooks/useOrder'
import useModal from '@/hooks/useModal'
import { moneyFormat } from '@/utils'
import { calculateFoodOrderListTotal } from '@/utils/food'

function OrderList() {
  const { sessionId } = useParams()
  const [setFoodOrderList, deleteFoodOrderItem, foodOrderList] = useFoodStore(state => [state.setFoodOrderList, state.deleteFoodOrderItem, state.foodOrderList])

  let content

  if (isEmpty(foodOrderList)) {
    content = <Flex align="center" justify="center" direction="column"> <IconMoodSad size={60}/> <Title order={3}>You haven't chosen any food? Let have yourself something good!</Title></Flex>
  }
  else {
    content = <SimpleGrid cols={1} spacing="md" breakpoints={[{ minWidth: 968, cols: 2 }]}> {foodOrderList.map(orderItem =>
      <OrderItem editOrderHandler={() => {
        const { openModal } = useModal(
          <Title order={4}>{'Order Customization'}</Title>,
          <EditOrderForm foodOrderItem={orderItem} />,
        )
        openModal()
      }}
      deleteOrderItemHandler={() => { deleteFoodOrderItem(orderItem.id) }}
      orderItem={orderItem}/>,
    )}</SimpleGrid>
  }

  useEffect(() => {
    const init = async () => {
      try {
        const foodOrderList = await fetchFoodOrderList(Number.parseInt(sessionId!))
        setFoodOrderList(foodOrderList!)
      }
      catch (error) {
        console.log(error)
      }
    }
    init()
  }, [])

  return (
    <Flex direction="column" gap={16}>
      <Title order={3}>
        <IconShoppingBagCheck /> What chu got?
      </Title>
      <Center mih={300}>
        {content}
      </Center>
      <Flex align="center" justify="center" gap="lg" >
        <Button className="empty-button" variant="outline" onClick={() => {
          submitOrderList({
            sessionId: Number.parseInt(sessionId!),
            foodOrderList: [],
          })
          setFoodOrderList([])
        }}>
          <Flex align="center" justify="end" gap={16}>
            <IconShoppingCartOff/>
            <Text size="lg">Empty Cart</Text>
          </Flex>
        </Button>
        <Button className="submit-button" onClick={() => {
          submitOrderList({
            sessionId: Number.parseInt(sessionId!),
            foodOrderList,
          })
        }}>
          <Flex align="center" justify="end" gap={16}>
            <IconShoppingCart/>
            <Text size="lg">{`${moneyFormat(calculateFoodOrderListTotal(foodOrderList), 'VND', 'vi-VN')}`}</Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  )
}

export default OrderList
