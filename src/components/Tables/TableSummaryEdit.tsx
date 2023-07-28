import { forwardRef, useEffect, useMemo, useState } from 'react'
import {
  type MRT_ColumnDef,
  type MRT_TableOptions,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table'
import { ActionIcon, Avatar, Button, Flex, Group, MultiSelect, Popover, Text, Tooltip, useMantineTheme } from '@mantine/core'
import { ModalsProvider, modals } from '@mantine/modals'
import { IconEdit, IconTrash } from '@tabler/icons-react'

import isEmpty from 'lodash/isEmpty'
import { notificationShow } from '../Notification'
import { useRequestProcessor } from '@/settings/react-query'
import { moneyFormat } from '@/utils/utility'
import axiosInstance from '@/settings/axios'
import { REQUEST_GET_FOOD_ORDER_IN_SUMMARY_TAB, REQUEST_PUT_FOOD_ORDER_ROW } from '@/constants/apis'

export interface DataEdit {
  id: number
  user: any
  foodName: string
  originPrice: number
  actualPrice: number
  note: string | null
  options: any
  quantity: number
}
const dataBE: DataEdit[] = [
  {
    id: 1,
    user: {
      email: 'ngan.phan@nfq.com',
      googleId: '118000667982679358226',
      name: 'Ngan Phan Khanh',
      photo: 'https://lh3.googleusercontent.com/a/AAcHTteJ-0ycB1Gz-fYDFq3OFKcet17Br5M4Mw0c2JGm3n4jUA=s96-c',
    },
    quantity: 2,
    originPrice: 30000,
    actualPrice: 30000,
    note: 'Không hành',
    options: [
      {
        name: 'Size L',
        price: 0,
      }, {
        name: 'Trân châu trắng',
        price: 8000,
      }, {
        name: 'Pudding',
        price: 7000,
      },
    ],
    foodName: 'Cơm gà',

  },
  {
    id: 2,
    user: {
      email: 'nhung.phan@nfq.com',
      googleId: '118000667982679358211',
      name: 'Hong Nhung Phan',
      photo: 'https://lh3.googleusercontent.com/a/AAcHTteJ-0ycB1Gz-fYDFq3OFKcet17Br5M4Mw0c2JGm3n4jUA=s96-c',
    },
    quantity: 2,
    options: [],
    originPrice: 30000,
    actualPrice: 20000,
    note: null,
    foodName: 'Cơm trung',
  },
  {
    id: 3,
    user: {
      email: 'nhung.phan@nfq.com',
      googleId: '118000667982679358211',
      name: 'Hong Nhung Phan',
      photo: 'https://lh3.googleusercontent.com/a/AAcHTteJ-0ycB1Gz-fYDFq3OFKcet17Br5M4Mw0c2JGm3n4jUA=s96-c',
    },
    quantity: 2,
    originPrice: 30000,
    actualPrice: 30000,
    note: 'Không hành',
    options: [
      {
        name: 'Size L',
        price: 0,
      }, {
        name: 'Rau',
        price: 8000,
      }, {
        name: 'Thạch',
        price: 7000,
      },
    ],
    foodName: 'Cháo',

  },
]
// export const toppings = [
//   {
//     name: 'Size L',
//     price: 0,
//   }, {
//     name: 'Rau',
//     price: 8000,
//   }, {
//     name: 'Thạch',
//     price: 7000,
//   },
//   {
//     name: 'Trân châu trắng',
//     price: 8000,
//   }, {
//     name: 'Pudding',
//     price: 7000,
//   },
// ]
const foodsData = [
  {
    label: 'Cơm gà',
    value: 'Cơm gà',
  }, {
    label: 'Cơm trung',
    value: 'Cơm trung',
  },
  {
    label: 'Cháo',
    value: 'Cháo',
  },
  {
    label: 'Cơm',
    value: 'Cơm',
  },
]
export const toppings = [
  {
    label: 'Size L',
    value: 'Size L',
    price: 0,
  }, {
    label: 'Rau',
    value: 'Rau',
    price: 8000,
  }, {
    label: 'Thạch',
    value: 'Thạch',
    price: 7000,
  },
  {
    label: 'Trân châu trắng',
    value: 'Trân châu trắng',
    price: 8000,
  }, {
    label: 'Pudding',
    value: 'Pudding',
    price: 7000,
  },
]
// console.log(item.options)
//  const optionCustome = !isEmpty(item.options)
//  ? item.options.map((item) => {
//    return {
//      label: item.name,
//      value: item.name,
//      price: item.price,
//    }
//  })
//  : []
interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string
  price: number
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, price, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Text>{label}</Text>
        <Text size="xs" color="dimmed">
          {moneyFormat(price, 'VND', 'en-US', '') } đ
        </Text>
      </Group>
    </div>
  ),
)

const EditTable = ({ sessionId }) => {
  const globalTheme = useMantineTheme()
  const dataChild = dataBE.map((item, index) => {
    return ({
      id: item.id,
      foodName: item.foodName,
      actualPrice: item.actualPrice,
      note: item.note,
      originPrice: item.originPrice,
      quantity: item.quantity,
      user: item.user,
      options: item.options,
    })
  })
  const [tableEditData, setTableEditData] = useState<DataEdit[]>(() => dataChild)
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({})
  const [additionalOptions, setAdditionalOptions] = useState([])
  const { query, mutation } = useRequestProcessor()
  const handleUserName = (name, picture) => {
    return (
      <Flex gap="sm" justify="flex-start" align="center" direction="row">
        <Avatar src={picture} alt={name} radius="xl" size={35}/>
        <Text color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.3)} style={{ width: 'fix-content' }} >
          {name}
        </Text>
      </Flex>)
  }

  const handleTransformDataToTableData = (dataBE) => {
    const dataChild = dataBE.map((item, index) => {
      return ({
        id: item.id,
        foodName: item.foodName,
        actualPrice: item.actualPrice,
        note: item.note,
        originPrice: item.originPrice,
        quantity: item.quantity,
        user: item.user,
        options: item.options,
      })
    })
    return dataChild
  }
  const fetchQueryFoodOrderEdit = query(
    ['foodOrderEdit'],
    () => axiosInstance.get(REQUEST_GET_FOOD_ORDER_IN_SUMMARY_TAB, {
      params: {
        sessionId: Number(sessionId),
        groupedBy: 'none',
      },
    }),
    {
      enabled: false,
      onSuccess: (data) => {
        if (data.data.statusCode === 200) {
          notificationShow('success', 'Success: ', data.data.message)
          setTableEditData(handleTransformDataToTableData(data.data.foodOrderList))
        }
        else {
          notificationShow('error', 'Error: ', data.data.message)
        }
      },
      onError: (error) => {
        notificationShow('error', 'Error: ', error.response.data.message)
      },
    },
  )

  const fetchMutationSaveFoodOrderRow = mutation(
    ['foodOrderSave'],
    async data =>
      await axiosInstance.put(`${REQUEST_PUT_FOOD_ORDER_ROW}/${data.rowId}`, data.rowData),
    {
      onSuccess: (data) => {
        if (data.data.statusCode === 200)
          notificationShow('success', 'Success: ', data.data.message)

        else
          notificationShow('error', 'Error: ', data.data.message)
      },
      onError: (error) => {
        notificationShow('error', 'Error: ', error.response.data.message)
      },
    },
  )

  const fetchMutationDeleteFoodOrderRow = mutation(
    ['foodOrderSave'],
    async data =>
      await axiosInstance.delete(`${REQUEST_PUT_FOOD_ORDER_ROW}/${data.rowId}`, data),
    {
      onSuccess: (data) => {
        if (data.data.statusCode === 200)
          notificationShow('success', 'Success: ', data.data.message)

        else
          notificationShow('error', 'Error: ', data.data.message)
      },
      onError: (error) => {
        notificationShow('error', 'Error: ', error.response.data.message)
      },
    },
  )

  useEffect(() => {
    const handleFetchQueryFoodOrderEdit = async () => {
      await fetchQueryFoodOrderEdit.refetch()
    }
    // handleFetchQueryFoodOrderEdit()
  }, [])

  const columns = useMemo<MRT_ColumnDef<DataEdit>[]>(
    () => [
      {
        accessorKey: 'id',
        header: '#',
        enableEditing: false,
        size: 20,
        // Cell: ({ cell }) => cell.getValue(),

      },
      {
        accessorKey: 'user',
        header: 'Name',
        size: 200,
        enableEditing: false,
        Cell: ({ cell }) => {
          const user = cell.getValue()
          return handleUserName(user.name, user.photo)
        },
      },
      {
        accessorKey: 'foodName',
        header: 'Food',
        editVariant: 'select',
        size: 150,
        mantineEditSelectProps: {
          required: true,
          // defaultValue: currentValue,
          data: foodsData,
          error: validationErrors?.foodName,
        },
        // mantineEditSelectProps: ({ cell, column, row, table }) => {
        //   const currentValue = cell.getValue()
        //   console.log('foodName', currentValue)
        //   return {
        //     defaultValue: currentValue,
        //     data: foodsData,
        //     error: validationErrors?.foodName,
        //     // style: {
        //     //   item: {
        //     //     '&[data-selected]': {
        //     //       '&, &:hover': {
        //     //         backgroundColor:
        //     //           globalTheme.colorScheme === 'dark' ? globalTheme.colors.teal[9] : globalTheme.colors.teal[1],
        //     //         color: globalTheme.colorScheme === 'dark' ? globalTheme.white : globalTheme.colors.teal[9],
        //     //       },
        //     //     },

        //     //     // applies styles to hovered item (with mouse or keyboard)
        //     //     '&[data-hovered]': {},
        //     //   },
        //     // },
        //   }
        // },
      },

      {
        accessorKey: 'originPrice',
        header: 'Origin Price',
        size: 120,
        enableEditing: false,
        Cell: ({ cell }) => {
          return <Text color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.3)} style={{ backgroundColor: `${globalTheme.fn.lighten(globalTheme.colors.darkLavender[0], 0.85)}`, borderRadius: '5px', width: 'fit-content', padding: '5px' }}>
            {moneyFormat(cell.getValue(), 'VND', 'en-US', '')} đ
          </Text>
        },
      },
      {
        accessorKey: 'actualPrice',
        header: 'Actual Price',
        size: 120,
        mantineEditTextInputProps: {
          type: 'number',
          required: true,
          error: validationErrors?.actualPrice,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              actualPrice: undefined,
            }),
        },
        Cell: ({ cell }) => {
          return <Text color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.3)} style={{ backgroundColor: `${globalTheme.fn.lighten(globalTheme.colors.darkLavender[0], 0.85)}`, borderRadius: '5px', width: 'fit-content', padding: '5px' }}>
            {moneyFormat(cell.getValue(), 'VND', 'en-US', '')} đ
          </Text>
        },

      },
      {
        accessorKey: 'options',
        header: 'Options',
        size: 70,
        // editVariant: 'select',
        // mantineEditSelectProps: ({ cell, column, row, table }) => {
        //   console.log('hdsfjdaf', cell.getValue())
        //   return {
        //     value: cell.getValue(),
        //     data: toppings,
        //     error: validationErrors?.options,
        //   }
        // },
        Edit: ({ cell, column, table }) => {
          const currentValue = cell.getValue()
          const valueTransform = !isEmpty(currentValue)
            ? currentValue.map((item) => {
              return item.name
            })
            : []
          return (
            <MultiSelect
              style={{
              }}
              w={250}
              placeholder="Pick"
              defaultValue={valueTransform}
              onChange={(selectedOptions) => {
                const updatedOptions = toppings.filter(toppings =>
                  selectedOptions.includes(toppings.label),
                )
                const transformOptionData = !isEmpty(updatedOptions)
                  ? updatedOptions.map((item) => {
                    return {
                      name: item.label,
                      price: item.price,
                    }
                  })
                  : []

                setAdditionalOptions(transformOptionData)
                // const rowIndex = cell.row.id
                // console.log('rowIndex', rowIndex)
                // const rowIndexToUpdate = tableData.findIndex(item => item.id === rowIndex)
                // console.log('tableData', tableData)
                // console.log('dfsfafs', rowIndexToUpdate, tableData[rowIndexToUpdate])
                // const updatedRow = {
                //   ...tableData[rowIndexToUpdate],
                //   options: transformOptionData,
                // }
                // console.log('updatedRow', updatedRow)
                // const updatedTableData = [
                //   ...tableData.slice(0, rowIndexToUpdate),
                //   updatedRow,
                //   ...tableData.slice(rowIndexToUpdate + 1),
                // ]
                // setTableData(updatedTableData)
              }}
              itemComponent={SelectItem}
              data={toppings}
              searchable
              nothingFound="Nobody here"
              maxDropdownHeight={200}
            />)
        },
        Cell: ({ cell }) => {
          const options = cell.getValue()
          return !isEmpty(options)
            ? (
              <Popover width={'fit-content'} position="bottom" withArrow shadow="md">
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
                <Popover.Dropdown style={{ backgroundColor: `${globalTheme.fn.lighten(globalTheme.colors.darkLavender[0], 0.9)}`, border: `1px solid ${globalTheme.fn.lighten(globalTheme.colors.darkLavender[0], 0.3)}`, boxShadow: '1px 1px 5px 0px grey', padding: '10px' }}>
                  <Flex gap="2px" justify="center" align="flex-start" direction="column" >
                    {
                      options.map((item, index) => {
                        return (
                          <Flex gap="sm" justify="space-between" align="flex-start" direction="row" key={`${index}-${item.name}`} style={{ width: '100%' }}>
                            <Text
                              fz="0.8rem"
                              weight={450}
                              color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.9)}
                            >
                              {item.name}:
                            </Text>
                            <Text
                              fz="0.8rem"
                              weight={450}
                              color={globalTheme.colors.darkLavender[0]}
                            >
                              {`${moneyFormat(item.price, 'VND', 'en-US', '')} đ`}
                            </Text>

                          </Flex>
                        )
                      })
                    }

                  </Flex>
                </Popover.Dropdown>
              </Popover>
            )
            : <Text color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.3)} >
          No
            </Text>
        },
      },
      {
        accessorKey: 'note',
        header: 'Note',
        mantineEditTextInputProps: {
          type: 'text',
          required: true,
          error: validationErrors?.note,

        },

      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        size: 30,
        mantineEditTextInputProps: {
          type: 'number',
          required: true,
          error: validationErrors?.quantity,

        },

      },

    ],
    [validationErrors],
  )

  const handleSaveRow: MRT_TableOptions<DataEdit>['onEditingRowSave'] = async ({
    exitEditingMode,
    row,
    values,
  }) => {
    const { actualPrice, quantity, options, ...others } = values
    const dataOneRow = {
      rowId: values.id,
      rowData: {
        sessionId: Number(sessionId),
        ...others,
        options: additionalOptions,
        actualPrice: Number(actualPrice),
        quantity: Number(quantity),
      },
    }
    // send/receive api updates here
    await fetchMutationSaveFoodOrderRow.mutate(dataOneRow)
    exitEditingMode() // required to exit editing mode
  }
  const deleteRowFoodOrder = async (rowId) => {
    const dataOneRow = {
      rowId: Number(rowId),
      sessionId: Number(sessionId),
    }
    await fetchMutationDeleteFoodOrderRow.mutate(dataOneRow)
  }

  // DELETE action
  const openDeleteConfirmModal = (row) => {
    modals.openConfirmModal({
      title: 'Are you sure you want to delete this user?',
      children: (
        <Text style={{ lineHeight: '30px' }}>
          Are you sure you want to delete <span style={{ color: ` ${globalTheme.colors.bashfulPink[0]}`, fontWeight: 'bold' }}>{row.original.foodName}</span> order of <span style={{ color: ` ${globalTheme.colors.bashfulPink[0]}`, fontWeight: 'bold' }}>{row.original.user.name}</span>? This
          action cannot be <span style={{ color: 'red', fontWeight: 'bold', textTransform: 'uppercase' }}>undone</span>.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => deleteRowFoodOrder(row.original.id),
    })
  }

  const table = useMantineReactTable({
    columns,
    data: tableEditData,
    editDisplayMode: 'row',
    enableEditing: true,
    enableColumnActions: false,
    enableStickyHeader: true,
    enablePagination: false,
    positionActionsColumn: 'last',
    getRowId: row => row.id,
    mantineTableHeadCellProps: ({ table }) => ({
      sx: {
        padding: '16px 16px 16px 3px',
        backgroundColor: ` ${globalTheme.fn.lighten(globalTheme.colors.darkLavender[0], 0.8)}`,
      },
    }),
    mantineTableContainerProps: ({ table }) => ({
      sx: {
        maxHeight: '600px',
        border: `2px solid ${globalTheme.fn.lighten(globalTheme.colors.darkLavender[0], 0.8)}`,
      },
    }),
    mantineTableBodyCellProps: ({ row }) => ({
      style: {
        padding: '5px',
        borderBottom: `2px solid ${globalTheme.fn.lighten(globalTheme.colors.darkLavender[0], 0.8)}`,

      },
    }),
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveRow,
    renderRowActions: ({ row, table }) => (
      <Flex gap="md">
        <Tooltip label="Edit">
          <ActionIcon onClick={() => {
            return table.setEditingRow(row)
          }}>
            <IconEdit />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete">
          <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row)}>
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
    mantineBottomToolbarProps: ({ table }) => ({
      style: {
        border: 'none',
        boxShadow: 'none',
        outline: 'none',
        backgroundColor: '#f8f9fa',
      },
    }),
    state: {
      // isLoading: fetchQueryFoodOrderEdit.isLoading,
    // isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
    // showAlertBanner: isLoadingUsersError,
    // showProgressBars: isFetchingUsers,
    },
  })

  return <MantineReactTable table={table}/>
}

const EditTableWithProviders = ({ sessionId }) => (
  <ModalsProvider>
    <EditTable sessionId={sessionId}/>
  </ModalsProvider>
)

export default EditTableWithProviders

// function validateUser(user: User) {
//   return {
//     firstName: !validateRequired(user.firstName) ? 'First Name is Required' : '',
//     lastName: !validateRequired(user.lastName) ? 'Last Name is Required' : '',
//   }
// }
