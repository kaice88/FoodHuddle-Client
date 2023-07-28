import React from 'react'
import { Button, Flex, Popover, Table, Text, useMantineTheme } from '@mantine/core'
import isEmpty from 'lodash/isEmpty'
import { moneyFormat } from '@/utils/utility'

// const totalUSDTransform = moneyFormat(totalUSD);

// const totalVND = new Intl.NumberFormat('en-US').format(totalUSD.mul(usdExchangeRate));

const ChildTable = ({ className, dataChilTable }) => {
  const globalTheme = useMantineTheme()

  const rows = dataChilTable.map((element, idex) => {
    return (
      <tr key={idex}>
        <td><Text color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.3)} >
          {element.name}
        </Text></td>
        <td><Text color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.3)} >
          {moneyFormat(element.originPrice, 'VND', 'en-US', '')} đ
        </Text></td>
        <td><Text color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.3)} style={{ backgroundColor: `${globalTheme.fn.lighten(globalTheme.colors.darkLavender[0], 0.85)}`, borderRadius: '5px', width: 'fit-content', margin: 'auto', padding: '5px' }}>
          {moneyFormat(element.actualPrice, 'VND', 'en-US', '')} đ
        </Text></td>
        <td>
          {
            !isEmpty(element.options)
              ? (
                <Popover width={200} position="bottom" withArrow shadow="md">
                  <Popover.Target>
                    <Button
                      styles={theme => ({
                        root: {
                          backgroundColor: theme.fn.lighten(theme.colors.darkLavender[0], 0.8),
                          color: theme.colors.darkLavender[0],
                          ...theme.fn.hover({
                            backgroundColor: theme.fn.lighten(theme.colors.darkLavender[0], 0.7),
                          }),
                          padding: '10px',

                        },
                      })}> Show
                    </Button>
                  </Popover.Target>
                  <Popover.Dropdown style={{ backgroundColor: `${globalTheme.fn.lighten(globalTheme.colors.darkLavender[0], 0.9)}`, border: `1px solid ${globalTheme.fn.lighten(globalTheme.colors.darkLavender[0], 0.3)}`, boxShadow: '1px 1px 3px 2px grey', padding: '3px' }}>
                    <Flex gap="2px" justify="center" align="flex-start" direction="column" style={{ paddingLeft: '5px' }}>
                      {
                        element.options.map((item, index) => {
                          return (
                            <Text
                              key={index}
                              fz="0.8rem"
                              color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.7)}
                            >
                              {item.name}: {`${moneyFormat(element.originPrice, 'VND', 'en-US', '')} đ`}
                            </Text>
                          )
                        })
                      }

                    </Flex>
                  </Popover.Dropdown>
                </Popover>
                )
              : <Text color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.3)}>
          None
              </Text>
          }
        </td>
        <td
          style={{
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            wordBreak: 'break-all',
            maxWidth: '150px',
          }}
        >
          <div style={{ overflowY: 'auto', maxHeight: '100px' }}><Text color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.3)}>
            {element.note}
          </Text></div>
        </td>
        <td><Text color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.3)}>
          {element.quantity}
        </Text></td>
      </tr>
    )
  })
  const tablechildren = (
    <Table className={className} striped highlightOnHover>
      <thead className="head-title">
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Actual Price</th>
          <th>Options</th>
          <th>Note</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Table>
  )
  return tablechildren
}

export default ChildTable
