import React, { forwardRef, useEffect, useMemo, useState } from 'react'
import {
  type MRT_ColumnDef,
  type MRT_TableOptions,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table'
import { ActionIcon, Avatar, Flex, MultiSelect, Text, Tooltip, useMantineTheme } from '@mantine/core'
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
interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string
  price: number
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, price, group, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others} >
      <Flex gap="sm" justify="space-between" align="center" direction="row">
        <Text>{label}</Text>
        <Text size="xs" color="dimmed">
          {moneyFormat(price, 'VND', 'en-US', '') } đ
        </Text>
      </Flex>
    </div>
  ),
)

const EditTable = ({ sessionId }) => {
  const [tableEditData, setTableEditData] = useState<DataEdit[]>([])
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({})
  const [foodOrderMenu, setFoodOrderMenu] = useState([])
  const [optionsSelect, setOptionsSelect] = useState([])
  const { queryFoodOrderEdit, mutationSaveFoodOrderRow, fetchMutationDeleteFoodOrderRow, fetchQueryFoodOrderMenu, handleFoodNamesSelect } = useSummaryTab()
  const fetchQueryFoodOrderEdit = queryFoodOrderEdit(sessionId, setTableEditData)
  const queryFoodOrderMenu = fetchQueryFoodOrderMenu(sessionId, setFoodOrderMenu, setOptionsSelect)
  const foodNamesSelect = handleFoodNamesSelect(foodOrderMenu)
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
      await queryFoodOrderMenu.refetch()
      await fetchQueryFoodOrderEdit.refetch()
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
        mantineEditSelectProps: ({ cell, column, row, table }) => {
          const currentValue = cell.getValue()

          return {
            required: true,
            value: currentValue,
            data: foodNamesSelect,
            error: validationErrors?.foodName,
            onChange: (value) => {
              const updatedOptions = foodOrderMenu.filter(eachFood =>
                eachFood.foodName === value,
              )[0]
              const originalPrice = updatedOptions.price === 0 ? updatedOptions.price : updatedOptions.discountPrice
              const rowIndex = cell.row.id
              const currentValueRow = row.original
              const newList = tableEditData.map((item) => {
                if (item.id == rowIndex) {
                  return {
                    ...currentValueRow,
                    options: [],
                    foodName: value,
                    originPrice: originalPrice,
                    actualPrice: originalPrice,
                  }
                }
                else {
                  return item
                }
              })
              setTableEditData(newList)
            },
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
        mantineEditTextInputProps: ({ cell, row }) => {
          const currentValue = cell.getValue()
          return {
            type: 'number',
            required: true,
            value: currentValue,
            error: validationErrors?.actualPrice,
            onChange: (event) => {
              event.preventDefault()
              const value = event.currentTarget.value
              const rowIndex = cell.row.id
              const currentValueRow = row.original
              const newList = tableEditData.map((item) => {
                if (item.id == rowIndex) {
                  return {
                    ...currentValueRow,
                    actualPrice: value,
                  }
                }
                else {
                  return item
                }
              })
              setTableEditData(newList)
            },
            onFocus: () =>
              setValidationErrors({
                ...validationErrors,
                actualPrice: undefined,
              }),
          }
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

        Edit: ({ cell, column, table, row }) => {
          const currentValue = cell.getValue()
          const valueTransform = !isEmpty(currentValue)
            ? currentValue.flatMap(category =>
              category.detail.map((detailItem, index) => {
                return `${category.category}-${detailItem.name}-${detailItem.price}`
              },
              ))
            : []
          const currentFoodName = row.original.foodName
          const data = optionsSelect.filter(item => item.foodName === currentFoodName)[0].dataSelects
          return (
            <MultiSelect
              style={{
              }}
              w={200}
              placeholder="Pick"
              value={valueTransform}
              onChange={(selectedOptions) => {
                console.log('selectedOptions', selectedOptions)

                // const transformOptionData = !isEmpty(updatedOptions)
                //   ? updatedOptions.map((item) => {
                //     return {
                //       name: item.label,
                //       price: item.price,
                //     }
                //   })
                //   : []
                const convertData = (selectedOptions) => {
                  const result = []

                  !isEmpty(selectedOptions) && selectedOptions.forEach((item) => {
                    const [category, name, price] = item.split('-')

                    const existingCategory = result.find(c => c.category === category)

                    if (existingCategory) {
                      // If the category exists, add the detail to its detail array
                      existingCategory.detail.push({ name, price: Number(price) })
                    }
                    else {
                      // If the category does not exist, create a new category object
                      result.push({
                        category,
                        detail: [{ name, price: Number(price) }],
                      })
                    }
                  })

                  return result
                }
                console.log('convertData', convertData(selectedOptions))

                const rowIndex = cell.row.id
                const currentValueRow = row.original
                const newList = tableEditData.map((item) => {
                  if (item.id == rowIndex) {
                    return {
                      ...currentValueRow,
                      options: convertData(selectedOptions),
                    }
                  }
                  else {
                    return item
                  }
                })
                setTableEditData(newList)
              }}
              itemComponent={SelectItem}
              data={data}
              searchable
              nothingFound="No option"
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
        mantineEditTextInputProps: ({ cell, row }) => {
          const currentValue = cell.getValue()
          return {
            type: 'text',
            required: true,
            value: currentValue,
            error: validationErrors?.note,
            onChange: (event) => {
              event.preventDefault()
              const value = event.currentTarget.value
              const rowIndex = cell.row.id
              const currentValueRow = row.original
              const newList = tableEditData.map((item) => {
                if (item.id == rowIndex) {
                  return {
                    ...currentValueRow,
                    note: value,
                  }
                }
                else {
                  return item
                }
              })
              setTableEditData(newList)
            },
          }
        },

      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        size: 30,
        mantineEditTextInputProps: ({ cell, row }) => {
          const currentValue = cell.getValue()
          return {
            type: 'number',
            required: true,
            value: currentValue,
            error: validationErrors?.quantity,
            onChange: (event) => {
              event.preventDefault()
              const value = event.currentTarget.value
              const rowIndex = cell.row.id
              const currentValueRow = row.original
              const newList = tableEditData.map((item) => {
                if (item.id == rowIndex) {
                  return {
                    ...currentValueRow,
                    quantity: value,
                  }
                }
                else {
                  return item
                }
              })
              setTableEditData(newList)
            },
          }
        },

      },
    ],
    [!isEmpty(foodNamesSelect), !isEmpty(optionsSelect), !isEmpty(tableEditData), optionsSelect],
  )

  const handleSaveRow: MRT_TableOptions<DataEdit>['onEditingRowSave'] = async ({
    exitEditingMode,
    row,
    values,
  }) => {
    console.log('submit', values)
    const { actualPrice, quantity, ...others } = values
    const dataOneRow = {
      rowId: values.id,
      rowData: {
        sessionId: Number(sessionId),
        ...others,
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
    const newList = tableEditData.filter(item => item.id !== rowId)
    await fetchMutationDeleteFoodOrderRow.mutate(dataOneRow)
    setTableEditData(newList)
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
      style: {
        overflow: 'initial',
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

export default EditTable

// function validateUser(user: User) {
//   return {
//     firstName: !validateRequired(user.firstName) ? 'First Name is Required' : '',
//     lastName: !validateRequired(user.lastName) ? 'Last Name is Required' : '',
//   }
// }
