import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import debounce from 'lodash/debounce'
import { isEmpty } from 'lodash'

import { Button, Center, Flex, Loader, SimpleGrid, Text, Title } from '@mantine/core'
import { IconMoodSad, IconShoppingBagCheck, IconShoppingCartOff } from '@tabler/icons-react'

import EditOrderForm from '../FoodOrderForm/Edit'
import OrderItem from './OrderItem'
import useFoodStore from '@/store/foodStore'
import { fetchFoodOrderList, submitOrderList } from '@/hooks/useOrder'
import useModal from '@/hooks/useModal'
import { moneyFormat } from '@/utils'
import { calculateFoodOrderListTotal } from '@/utils/food'
import useSessionInfoStore from '@/store/sessionInfoStore'
import { SessionStatuses } from '@/enums'
import useAuth from '@/hooks/useAuth'
import { checkIfUserIsHost } from '@/utils/sessions'

function OrderList() {
  const { sessionId } = useParams()
  const { sessionInfoData } = useSessionInfoStore()

  const { status, host } = sessionInfoData
  const [setFoodOrderList, deleteFoodOrderItem, foodOrderList] = useFoodStore(state => [state.setFoodOrderList, state.deleteFoodOrderItem, state.foodOrderList])
  const { userProfile } = useAuth()

  let content
  if (isEmpty(foodOrderList)) {
    content = <Flex align="center" justify="center" direction="column"> <IconMoodSad size={60}/> <Title order={3}>You haven't chosen any food? Let have yourself something good!</Title></Flex>
  }
  else {
    content = <SimpleGrid className="orderList" key = {uuidv4()} cols={1} spacing="md" breakpoints={[{ minWidth: 'md', cols: 2 }]} >
      {foodOrderList.map(orderItem =>
        <OrderItem
          editOrderHandler={() => {
            const { openModal } = useModal(
              <Title order={4}>{'Order Customization'}</Title>,
              <EditOrderForm foodOrderItem={orderItem} sessionId={sessionId!} />,
            )
            openModal()
          }}
          deleteOrderItemHandler={() => { deleteFoodOrderItem(orderItem.id, Number.parseInt(sessionId!)) }}
          orderItem={orderItem}
          key={uuidv4()}
        />,
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

  if (status === SessionStatuses.LOCKED && !checkIfUserIsHost(host, userProfile)) {
    return <Center>
      <Flex direction="column" align="center" justify="center" gap="xl">
        <Loader variant="dots" size="lg"/>
        <Title color="darkLavender" order={3}> Please wait for a sec cause your food is on the way! </Title>
      </Flex>
    </Center>
  }
  return (
    <Flex direction="column" gap={16}>
      <Title order={3}>
        <IconShoppingBagCheck /> What chu got?
      </Title>
      <Center mih={150} pl={32} pr={32}>
        {content}
      </Center>
      <Center mt={16}>
        <Title color="brand" fw={700} order={2}>{`Total: ${moneyFormat(calculateFoodOrderListTotal(foodOrderList), 'VND', 'vi-VN')}`}</Title>
      </Center>
      <Flex align="center" justify="center" gap="lg" >
        <Button className="empty-button" variant="light" onClick={
          debounce(() => {
            submitOrderList({
              sessionId: Number.parseInt(sessionId!),
              foodOrderList: [],
            })
            setFoodOrderList([])
          }, 1000)} >
          <Flex align="center" justify="end" gap={16}>
            <IconShoppingCartOff/>
            <Text size="lg">Empty Cart</Text>
          </Flex>
        </Button></Flex>
    </Flex>
  )
}

export default OrderList
