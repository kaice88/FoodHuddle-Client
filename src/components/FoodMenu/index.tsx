import { v4 as uuidv4 } from 'uuid'
import { useParams } from 'react-router-dom'
import { useMediaQuery } from '@mantine/hooks'
import { Carousel } from '@mantine/carousel'
import { Center, Container, Loader, SimpleGrid, Title, rem } from '@mantine/core'

import {
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
  const sm = useMediaQuery('(min-width: 699.3px)')
  const xs = useMediaQuery('(min-width: 320.2px)')
  if (isLoading) {
    return <Center h={sm ? 320 : xs ? 490 : 760}>
      <Loader/>
    </Center>
  }
  let menuGroups = divideElementsIntoGroups(menu, 3)

  if (sm)
    menuGroups = divideElementsIntoGroups(menu, 4)
  if (md)
    menuGroups = divideElementsIntoGroups(menu, 6)
  if (xl)
    menuGroups = divideElementsIntoGroups(menu, 8)

  return (
    <Container miw={rem('100%')}>
      <Title order={3}>
        <IconMeat /> What's popping?
      </Title>
      <Carousel
        mt={16}
        orientation={sm ? 'horizontal' : 'vertical'}
        height={sm ? 320 : xs ? 490 : 800}
        className="menu"
        withControls = {!!sm}
        loop
        controlSize={32}
        slideGap={rem('32px')}
        slideSize={rem('97%')}
      >
        {menuGroups.map((menu) => {
          return (
            <Carousel.Slide key={uuidv4()}>
              {' '}
              <SimpleGrid
                breakpoints={[
                  { minWidth: 1500, cols: 4 },
                  { minWidth: 1270, cols: 3 },
                  { minWidth: 699.3, cols: 2 },
                ]}
                cols={1}
                spacing={'md'}
                verticalSpacing={'md'}
                p={16}
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
    </Container>
  )
}

export default FoodMenu
