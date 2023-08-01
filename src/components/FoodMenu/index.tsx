import { useParams } from 'react-router-dom'
import { ActionIcon, Loader, SimpleGrid, Title } from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import { useMediaQuery } from '@mantine/hooks'
import { v4 as uuidv4 } from 'uuid'

import {
  IconArrowBigLeftFilled,
  IconArrowBigRightFilled,
  IconMeat,
} from '@tabler/icons-react'
import FoodMenuItem from './FoodMenuItem'
import { divideElementsIntoGroups } from '@/utils'
import useMenu from '@/hooks/useMenu'

function FoodMenu() {
  const { sessionId } = useParams()
  const { data: menu, isLoading } = useMenu(sessionId!)

  const xl = useMediaQuery('(min-width: 1500px)')
  const md = useMediaQuery('(min-width: 1270px)')
  const sm = useMediaQuery('(min-width: 500px)')

  const menuGroups = xl
    ? divideElementsIntoGroups(menu, 8)
    : md
      ? divideElementsIntoGroups(menu, 6)
      : sm
        ? divideElementsIntoGroups(menu, 4)
        : divideElementsIntoGroups(menu, 2)

  if (isLoading)
    return <Loader className="loader"/>

  return (
    <>
      <Title order={3}>
        <IconMeat /> What's popping?
      </Title>
      <Carousel
        controlsOffset={-50}
        controlSize={16}
        align={'center'}
        className="menu"
        withIndicators
        withControls
        nextControlIcon={
          <ActionIcon sx={{ color: '#FF6B00' }}>
            {' '}
            <IconArrowBigRightFilled />
          </ActionIcon>
        }
        previousControlIcon={
          <ActionIcon sx={{ color: '#FF6B00' }}>
            {' '}
            <IconArrowBigLeftFilled />
          </ActionIcon>
        }
      >
        {menuGroups.map((menu) => {
          return (
            <Carousel.Slide key={uuidv4()}>
              {' '}
              <SimpleGrid
                breakpoints={[
                  { minWidth: 1500, cols: 4, spacing: 'md' },
                  { minWidth: 1270, cols: 3, spacing: 'md' },
                  { minWidth: 500, cols: 2, spacing: 'md' },
                ]}
                cols={1}
                key={uuidv4()}
              >
                {menu.map(item => (
                  <FoodMenuItem key={uuidv4()} foodMenuItem={item} />
                ))}
              </SimpleGrid>
            </Carousel.Slide>
          )
        })}
      </Carousel>
    </>
  )
}

export default FoodMenu
