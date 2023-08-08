import React, { forwardRef, useEffect, useMemo, useState } from 'react'
import {
  type MRT_ColumnDef,
  type MRT_TableOptions,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table'
import { ActionIcon, Avatar, Flex, MultiSelect, Text, Tooltip, useMantineTheme } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconAlertCircle, IconChefHat, IconEdit, IconTrash } from '@tabler/icons-react'
import isEmpty from 'lodash/isEmpty'
import useSummaryTab from '../../../../hooks/useSummaryTab'
import { moneyFormat } from '@/utils/utility'
import MenuOptions from '@/components/MenuOptions'
import { notificationShow } from '@/components/Notification'
import ItemName from '@/components/ItemName'

export interface DataEdit {
  id: number
  user: any
  foodName: string
  foodImage: string
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
  ({ label, price, group, max, ...others }: ItemProps, ref) => (
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
  const globalTheme = useMantineTheme()
  const [tableEditData, setTableEditData] = useState<DataEdit[]>([])
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({})
  const [foodOrderMenu, setFoodOrderMenu] = useState([])
  const [optionsSelect, setOptionsSelect] = useState([])
  const { queryFoodOrderEdit, mutationSaveFoodOrderRow, fetchMutationDeleteFoodOrderRow, fetchQueryFoodOrderMenu, handleFoodNamesSelect, transformDataForMultiSelect, convertOptionsValueToDataTableEdit, updateTableEdit } = useSummaryTab()
  const fetchQueryFoodOrderEdit = queryFoodOrderEdit(sessionId, setTableEditData)
  const queryFoodOrderMenu = fetchQueryFoodOrderMenu(sessionId, setFoodOrderMenu, setOptionsSelect)
  const foodNamesSelect = handleFoodNamesSelect(foodOrderMenu)
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
          return <ItemName name={user.name} picture={user.photo} />
        },
      },
      {
        accessorKey: 'foodImage',
        header: '',
        size: 30,
        enableEditing: false,
        enableSorting: false,
        Cell: ({ cell }) => {
          const foodImage = cell.getValue()
          return foodImage
            ? <Avatar src={foodImage} alt={foodImage} radius="xl" size={35}/>
            : (<Avatar color="violet" radius="sm">
              <IconChefHat size="1.5rem" />
            </Avatar>)
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
            maxDropdownHeight: 200,
            searchable: true,
            onChange: (value) => {
              // ...Update tableEdit...
              const updatedOptions = foodOrderMenu.filter(eachFood =>
                eachFood.foodName === value,
              )[0]
              const originalPrice = updatedOptions.discountPrice === 0 ? updatedOptions.price : updatedOptions.discountPrice
              const rowIndex = cell.row.id
              const currentValueRow = row.original
              const newList = tableEditData.map((item) => {
                if (item.id == rowIndex) {
                  return {
                    ...currentValueRow,
                    options: [],
                    foodName: value,
                    foodImage: updatedOptions.photo,
                    originPrice: originalPrice,
                    actualPrice: originalPrice,
                  }
                }
                else {
                  return item
                }
              })
              setTableEditData(newList)
              // ...Validate...
              if (isEmpty(updatedOptions.options)) {
                setValidationErrors({
                  ...validationErrors,
                  [`${rowIndex}_options`]: undefined,
                })
              }
              else {
                setValidationErrors({
                  ...validationErrors,
                  [`${rowIndex}_options`]: 'Please select the item in required categories.',
                })
              }
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
          return <Text color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.3)} style={{ borderRadius: '5px', width: 'fit-content', padding: '5px' }}>
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
              const newList = updateTableEdit(tableEditData, 'actualPrice', event.currentTarget.value, cell.row.id, row.original)
              setTableEditData(newList)
            },
          }
        },
        Cell: ({ cell }) => {
          return <Text
            color={globalTheme.colors.duck[0]} style={{ backgroundColor: globalTheme.colors.darkLavender[6], borderRadius: '5px', width: 'fit-content', padding: '5px' }}
          >
            {moneyFormat(cell.getValue(), 'VND', 'en-US', '')} đ
          </Text>
        },

      },
      {
        accessorKey: 'options',
        header: 'Options',
        size: 50,
        Edit: ({ cell, row }) => {
          const currentValue = cell.getValue()
          const valueTransform = !isEmpty(currentValue)
            ? currentValue.flatMap(category =>
              category.detail.map((detailItem, index) => {
                return `${category.category}-${detailItem.name}-${detailItem.price}`
              },
              ))
            : []
          const currentFoodName = row.original.foodName
          const data = transformDataForMultiSelect(currentFoodName, optionsSelect, currentValue, valueTransform)
          const error = validationErrors[cell.id]
          return (
            <MultiSelect
              required={true}
              className="table-edit-summary-tab__multiselect-cell"
              w={200}
              placeholder="Pick"
              value={valueTransform}
              error= {error && <Tooltip
                label={`${error}`}
                color={`${globalTheme.colors.watermelon[0]}`}
                withArrow
                position="top-start"
              >
                <IconAlertCircle size={15} style={{ color: `${globalTheme.colors.watermelon[0]}` }}/>
              </Tooltip>}
              onChange={(selectedOptions) => {
                // ...Validate...//
                const requiredGroups = data
                  .filter(item => item.group.includes('[required]'))
                  .map(item => item.group.split(' [required]')[0])
                const uniqueRequiredGroups = [...new Set(requiredGroups)]
                const containsAllRequiredGroups = uniqueRequiredGroups.every((requiredGroup) => {
                  return selectedOptions.some((selectedOption) => {
                    const group = selectedOption.split('-')[0]
                    return group === requiredGroup
                  })
                })
                if (!containsAllRequiredGroups) {
                  setValidationErrors({
                    ...validationErrors,
                    [cell.id]: 'Please select the item in required categories.',
                  })
                }
                else {
                  setValidationErrors({
                    ...validationErrors,
                    [cell.id]: undefined,
                  })
                }
                // ...Update tableEdit...
                const rowIndex = cell.row.id
                const currentValueRow = row.original
                const newList = convertOptionsValueToDataTableEdit(selectedOptions, rowIndex, currentValueRow, tableEditData)
                setTableEditData(newList)
              }}
              itemComponent={SelectItem}
              data={data}
              searchable
              nothingFound="No option"
              maxDropdownHeight={100}
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
              const newList = updateTableEdit(tableEditData, 'note', event.currentTarget.value, cell.row.id, row.original)
              setTableEditData(newList)
            },
          }
        },

      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        size: 35,
        mantineEditTextInputProps: ({ cell, row }) => {
          const currentValue = cell.getValue()
          const error = validationErrors[cell.id]
          return {
            type: 'number',
            required: true,
            className: 'table-edit-summary-tab__quantity-cell',
            value: currentValue,
            error: error && <Tooltip
              label={`${error}`}
              color={`${globalTheme.colors.watermelon[0]}`}
              withArrow
              position="top-start"
            >
              <IconAlertCircle size={15} style={{ color: `${globalTheme.colors.watermelon[0]}` }}/>
            </Tooltip>,
            onChange: (event) => {
              event.preventDefault()
              const value = event.currentTarget.value
              // ...Validate...
              if (!value || Number(value) < 1) {
                setValidationErrors({
                  ...validationErrors,
                  [cell.id]: 'The quantity must be a valid number greater than 0.',
                })
              }
              else {
                setValidationErrors({
                  ...validationErrors,
                  [cell.id]: undefined,
                })
              }
              // ...Update tableEdit...
              const newList = updateTableEdit(tableEditData, 'quantity', value, cell.row.id, row.original)
              setTableEditData(newList)
            },
          }
        },

      },
    ],
    [!isEmpty(foodNamesSelect), !isEmpty(optionsSelect), !isEmpty(tableEditData), optionsSelect, validationErrors],
  )
  // ...Save one Row...
  const handleSaveRow: MRT_TableOptions<DataEdit>['onEditingRowSave'] = async ({
    exitEditingMode,
    row,
    values,
  }) => {
    if (!validationErrors[`${values.id}_options`] && !validationErrors[`${values.id}_quantity`]) {
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
    else {
      validationErrors[`${values.id}_options`] && notificationShow('error', 'Error: ', 'Please select the item in required categories before saving')
      validationErrors[`${values.id}_quantity`] && notificationShow('error', 'Error: ', 'The quantity must be a valid number greater than 0.')
    }
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
    mantineTableHeadCellProps: ({ table }) => ({
      sx: {
        padding: '10px 10px 10px 0px',
        width: 'fit-content',
        textAlign: 'left',
      },
    }),
    mantineTableContainerProps: ({ table }) => ({
      style: {
        overflow: 'auto',
        maxHeight: '600px',
      },
      className: 'table-edit-summary-tab',
    }),
    mantineTableBodyCellProps: ({ row }) => ({
      style: {
        padding: '7px 5px 7px 5px',
        width: 'fit-content',
      },
    }),
    getRowId: row => row.id,
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
    enableBottomToolbar: false,
    state: {
      isLoading: fetchQueryFoodOrderEdit.isLoading,
      showProgressBars: fetchQueryFoodOrderEdit.isFetching,
    },
  })

  return <MantineReactTable table={table}/>
}

export default EditTable
