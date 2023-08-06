import { ActionIcon, Flex, Text, Title } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import type { MenuItem } from '@/types/food'
import { moneyFormat } from '@/utils'
import useModal from '@/hooks/useModal'
import AddOrderForm from '@/components/FoodOrderForm/Add'
import { SessionStatuses } from '@/enums'
import useSessionInfoStore from '@/store/sessionInfoStore'
import useAuth from '@/hooks/useAuth'
import { checkIfUserIsHost } from '@/utils/sessions'

interface FoodItemProps {
  foodMenuItem: MenuItem
}

export function PriceDisplay({
  price,
  discountPrice,
}: {
  price: number
  discountPrice: number
}) {
  if (discountPrice > 0) {
    return (
      <div>
        <Text size="xs" td="line-through">
          {moneyFormat(price, 'VND', 'vi-VN')}
        </Text>
        <Text fw={700} size="md" style={{ color: '#FF6B00' }}>
          {moneyFormat(discountPrice, 'VND', 'vi-VN')}
        </Text>
      </div>
    )
  }
  else {
    return (
      <Text size="md" fw={700} style={{ color: '#FF6B00' }}>
        {moneyFormat(price, 'VND', 'vi-VN')}
      </Text>
    )
  }
}

function FoodMenuItem({ foodMenuItem }: FoodItemProps) {
  const { sessionInfoData } = useSessionInfoStore()
  const { userProfile } = useAuth()

  const { status, host } = sessionInfoData
  const { openModal } = useModal(
    <Title order={4}>{'Order Customization'}</Title>,
    <AddOrderForm menuItem={foodMenuItem} />,
  )

  const orderHandler = () => {
    openModal()
  }
  return (
    <div className="foodMenuItem">
      <div className="foodMenuItem__imageWrapper">
        <img src={foodMenuItem.photo} />
      </div>
      <div className="foodMenuItem__info">
        <Title lineClamp={2} order={6} fw={500}>
          {foodMenuItem.foodName}
        </Title>

        <Flex justify={'space-between'} align={'flex-end'}>
          <PriceDisplay
            discountPrice={foodMenuItem.discountPrice}
            price={foodMenuItem.price}
          />
          {(status === SessionStatuses.OPEN || checkIfUserIsHost(host, userProfile)) && <ActionIcon
            aria-label="Add to list of order items"
            className="button-addOrder"
            onClick={orderHandler}
            variant="filled"
            size={'sm'}
            color="brand"
          >
            <IconPlus stroke={2.2} />
          </ActionIcon>}
        </Flex>
      </div>
    </div>
  )
}

export default FoodMenuItem
