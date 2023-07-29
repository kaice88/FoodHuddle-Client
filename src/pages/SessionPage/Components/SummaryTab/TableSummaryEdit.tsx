import React, { forwardRef, useEffect, useMemo, useState } from 'react'
import {
  type MRT_ColumnDef,
  type MRT_TableOptions,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table'
import { ActionIcon, Avatar, Flex, Group, MultiSelect, Text, Tooltip, useMantineTheme } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import isEmpty from 'lodash/isEmpty'
import { moneyFormat } from '@/utils/utility'
import useSummaryTab from '@/hooks/useSummaryTab'
import MenuOptions from '@/components/MenuOptions'

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
  const [tableEditData, setTableEditData] = useState<DataEdit[]>([])
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({})
  const [additionalOptions, setAdditionalOptions] = useState([])
  const [foodOrderMenu, setFoodOrderMenu] = useState([])
  const { queryFoodOrderEdit, mutationSaveFoodOrderRow, fetchMutationDeleteFoodOrderRow, fetchQueryFoodOrderMenu, handleFoodNamesSelect, handleOptionsSelect } = useSummaryTab()
  const fetchQueryFoodOrderEdit = queryFoodOrderEdit(sessionId, setTableEditData)
  const queryFoodOrderMenu = fetchQueryFoodOrderMenu(sessionId, setFoodOrderMenu)
  const optionsSelect = handleOptionsSelect(foodOrderMenu)
  const foodNamesSelect = handleFoodNamesSelect(foodOrderMenu)

  console.log(333, optionsSelect)
  console.log(666, foodNamesSelect)
  console.log(tableEditData)
  const globalTheme = useMantineTheme()

  const handleUserName = (name, picture) => {
    return (
      <Flex gap="sm" justify="flex-start" align="center" direction="row">
        <Avatar src={picture} alt={name} radius="xl" size={35}/>
        <Text color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.3)} style={{ width: 'fix-content' }} >
          {name}
        </Text>
      </Flex>)
  }

  useEffect(() => {
    const handleFetchQueryFoodOrderEdit = async () => {
      await fetchQueryFoodOrderEdit.refetch()
      await queryFoodOrderMenu.refetch()
    }
    handleFetchQueryFoodOrderEdit()
  }, [])

  const columns = useMemo<MRT_ColumnDef<DataEdit>[]>(
    () => [
      {
        accessorKey: 'id',
        header: '#',
        enableEditing: false,
        size: 20,
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
        // mantineEditSelectProps: {
        //   required: true,
        //   // defaultValue: currentValue,
        //   data: foodsData,
        //   error: validationErrors?.foodName,
        // },
        mantineEditSelectProps: ({ cell, column, row, table }) => {
          const currentValue = cell.getValue()
          return {
            defaultValue: currentValue,
            data: foodNamesSelect,
            error: validationErrors?.foodName,
            // style: {
            //   item: {
            //     '&[data-selected]': {
            //       '&, &:hover': {
            //         backgroundColor:
            //           globalTheme.colorScheme === 'dark' ? globalTheme.colors.teal[9] : globalTheme.colors.teal[1],
            //         color: globalTheme.colorScheme === 'dark' ? globalTheme.white : globalTheme.colors.teal[9],
            //       },
            //     },

            //     // applies styles to hovered item (with mouse or keyboard)
            //     '&[data-hovered]': {},
            //   },
            // },
          }
        },
      },

      {
        accessorKey: 'originPrice',
        header: 'Origin Price',
        size: 100,
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
        size: 100,
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
        size: 50,
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
              w={200}
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
          return <MenuOptions options={options} />
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
    await mutationSaveFoodOrderRow.mutate(dataOneRow)
    exitEditingMode()
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
        padding: '10px 10px 10px 0px',
        width: 'fit-content',
        backgroundColor: ` ${globalTheme.fn.lighten(globalTheme.colors.darkLavender[0], 0.8)}`,
        textAlign: 'left',
      },
    }),
    mantineTableContainerProps: ({ table }) => ({
      sx: {
        maxHeight: '600px',
        border: `2px solid ${globalTheme.fn.lighten(globalTheme.colors.darkLavender[0], 0.8)}`,
      },
      className: 'table-edit-summary-tab',
    }),
    mantineTableBodyCellProps: ({ row }) => ({
      style: {
        padding: '7px 5px 7px 5px',
        width: 'fit-content',
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
      isLoading: fetchQueryFoodOrderEdit.isLoading,
    // isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
    // showAlertBanner: isLoadingUsersError,
    // showProgressBars: isFetchingUsers,
    },
  })

  return <MantineReactTable table={table}/>
}

const EditTableWithProviders = ({ sessionId }) => (
  // <ModalsProvider>
  <EditTable sessionId={sessionId}/>
  // </ModalsProvider>
)

export default EditTableWithProviders

// function validateUser(user: User) {
//   return {
//     firstName: !validateRequired(user.firstName) ? 'First Name is Required' : '',
//     lastName: !validateRequired(user.lastName) ? 'Last Name is Required' : '',
//   }
// }
