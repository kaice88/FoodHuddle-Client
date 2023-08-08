import React from 'react'
import { Button, Menu, Text, useMantineTheme } from '@mantine/core'
import isEmpty from 'lodash/isEmpty'
import { IconDice1Filled } from '@tabler/icons-react'
import { moneyFormat } from '@/utils'

import type { SelectedOptions } from '@/types/food'

interface MenuOptionsProps {
    options: SelectedOptions[]
}

const MenuOptions = ({ options }: MenuOptionsProps) => {
  const globalTheme = useMantineTheme()
  const menuItemDrop = !isEmpty(options) && options.map((item, index) => {
    return (
      <React.Fragment key={`${item.category}-${index}`}>
        {
          item.detail.map((item, index) => {
            return (
              <Menu.Item
                key={`${item.name}-${index}`}
                icon={<IconDice1Filled size={10} style={{ color: `${globalTheme.colors.darkLavender[6]}` }} />}
                rightSection={<Text size="xs" color="dimmed"> {moneyFormat(item.price, 'VND', 'en-US', '')} đ</Text>}
              >
                {item.name}
              </Menu.Item>
            )
          })
        }
        <Menu.Divider />
      </React.Fragment>
    )
  })
  return (
    !isEmpty(options)
      ? (
        <Menu shadow="md" width={200} >
          <Menu.Target>
            <Button
              styles={theme => ({
                root: {
                  padding: '10px',

                },
              })}> Show
            </Button>
          </Menu.Target>

          <Menu.Dropdown className="menu-container" >
            {menuItemDrop}
          </Menu.Dropdown>
        </Menu>
      )
      : <Text color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.3)} >
          No
      </Text>
  )
}

export default MenuOptions
