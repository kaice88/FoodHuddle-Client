import isEmpty from 'lodash/isEmpty'
import { notificationShow } from '@/components/Notification'
import { REQUEST_FOOD_ORDER_ROW, REQUEST_GET_FOOD_MENU, REQUEST_GET_FOOD_ORDER_IN_SUMMARY_TAB, REQUEST_ORDER_BILL } from '@/constants/apis'
import axiosInstance from '@/settings/axios'
import { useRequestProcessor } from '@/settings/react-query'

function useSummaryTab() {
  const { mutation, query } = useRequestProcessor()

  const mutateBill = sessionId =>
    mutation(
      ['save-bill'],
      async data => await axiosInstance.put(REQUEST_ORDER_BILL(sessionId), data),
      {
        onSuccess: (data) => {
          if (data.data.status === 'success')
            notificationShow('success', 'Success: ', data.data.message)

          else
            notificationShow('error', 'Error: ', data.data.message)
        },
        onError: (error) => {
          notificationShow('error', 'Error: ', error.response.data.message)
        },
      },
    )

  const fetchQueryFormFees = (sessionId, setFormFees) => query(
    ['get-bill'],
    () => axiosInstance.get(REQUEST_ORDER_BILL(sessionId)),
    {
      enabled: false,
      onSuccess: (data) => {
        if (data.data.status === 'success')
          setFormFees(() => data.data.data)

        else
          notificationShow('error', 'Error: ', data.data.message)
      },
      onError: (error) => {
        notificationShow('error', 'Error: ', error.response.data.message)
      },
    },
  )
  const handleFoodNamesSelect = (dataMenu) => {
    const foodNames = !isEmpty(dataMenu)
      ? dataMenu.map((item, index) => {
        return item.foodName
      })
      : []
    return foodNames
  }

  const handleSelect = (options, idx) => {
    const dataSelects = !isEmpty(options)
      ? options.flatMap(option =>
        option.detail.map((detailItem, index) => ({
          value: `${option.category}-${detailItem.name}-${detailItem.price}`,
          label: detailItem.name,
          group: option.mandatory ? `${option.category} [required]` : option.category,
          price: detailItem.price,
          key: `${option.category}-${detailItem.name}-${detailItem.price}-${idx}`,
          max: option.maxSelection,
        })),
      )
      : []
    return dataSelects
  }
  const handleOptionsSelect = (dataMenu) => {
    const optionsList = !isEmpty(dataMenu)
      ? dataMenu.flatMap((item, idx) => {
        return {
          foodName: item.foodName,
          dataSelects: handleSelect(item.options, idx),
        }
      })
      : []
    return optionsList
  }

  const fetchQueryFoodOrderMenu = (sessionId, setFoodOrderMenu, setOptionsSelect) => query(
    ['get-all-menu'],
    () => axiosInstance.get(REQUEST_GET_FOOD_MENU, {
      params: {
        sessionId: Number(sessionId),
      },
    }),
    {
      enabled: false,
      onSuccess: (data) => {
        if (data.data.statusCode === 400) {
          notificationShow('error', 'Error: ', data.data.message)
        }
        else {
          setFoodOrderMenu(() => data.data.data)
          setOptionsSelect(handleOptionsSelect(data.data.data))
        }
      },
      onError: (error) => {
        notificationShow('error', 'Error: ', error.response.data.message)
      },
    },
  )

  const handleTransformDataToTableData = (dataBE) => {
    const data = !isEmpty(dataBE)
      ? dataBE.map((item, index) => {
        const quantityOrderEachFood = item.orders.reduce((acc, item) => {
          return acc + item.quantity
        }, 0)
        return (
          {
            id: Number(index) + 1,
            foodName: {
              name: item.foodName,
              image: item.foodImage,
            },
            total: Number(item.total),
            quantity: quantityOrderEachFood,
          }
        )
      })
      : []
    return data
  }
  const handleTransformToChildrenTable = (dataBE) => {
    const dataChildren = !isEmpty(dataBE)
      ? dataBE.map((item, index) => {
        const child = {
          foodName: item.foodName,
          elements: item.orders.map((item) => {
            return {
              actualPrice: item.actualPrice,
              note: item.note,
              originPrice: item.originPrice,
              quantity: item.quantity,
              name: item.user,
              options: item.options,
            }
          }),
        }
        return child
      })
      : []
    return dataChildren
  }

  const fetchQueryTableFoodOrderView = (sessionId, setChildrenTableView, setTableViewData) => query(
    ['foodOrderView'],
    () => axiosInstance.get(REQUEST_GET_FOOD_ORDER_IN_SUMMARY_TAB, {
      params: {
        sessionId: Number(sessionId),
        groupedBy: 'food',
      },
    }),
    {
      enabled: false,
      onSuccess: (data) => {
        if (data.data.status === 'success') {
          setTableViewData(() => handleTransformDataToTableData(data.data.data.foodOrderList))
          setChildrenTableView(() => handleTransformToChildrenTable(data.data.data.foodOrderList))
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
  const handleTransformTableEdit = (dataBE) => {
    const dataChild = !isEmpty(dataBE)
      ? dataBE.map((item, index) => {
        return ({
          id: item.id,
          foodImage: item.foodImage,
          foodName: item.foodName,
          actualPrice: item.actualPrice,
          note: item.note,
          originPrice: item.originPrice,
          quantity: item.quantity,
          user: item.user,
          options: item.options,
        })
      })
      : []
    return dataChild
  }
  const fetchQueryFoodOrderEdit = (sessionId, setTableEditData) => query(
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
        if (data.data.status === 'success')
          setTableEditData(handleTransformTableEdit(data.data.data.foodOrderList))

        else
          notificationShow('error', 'Error: ', data.data.message)
      },
      onError: (error) => {
        notificationShow('error', 'Error: ', error.response.data.message)
      },
    },
  )

  const fetchMutationSaveFoodOrderRow = mutation(
    ['foodOrderSave'],
    async data =>
      await axiosInstance.put(REQUEST_FOOD_ORDER_ROW(data.rowId), data.rowData),
    {
      onSuccess: (data) => {
        if (data.data.status === 'success')
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
    ['foodOrderDelete'],
    async data =>
      await axiosInstance.delete(REQUEST_FOOD_ORDER_ROW(data.rowId), {
        data: { sessionId: data.sessionId },
      }),
    {
      onSuccess: (data) => {
        if (data.data.status === 'success')
          notificationShow('success', 'Success: ', data.data.message)

        else
          notificationShow('error', 'Error: ', data.data.message)
      },
      onError: (error) => {
        notificationShow('error', 'Error: ', error.response.data.message)
      },
    },
  )

  const transformDataForMultiSelect = (currentFoodName, optionsSelect, currentValue, valueTransform) => {
    // ...Get options only for current foodName...
    const data = optionsSelect.filter(item => item.foodName === currentFoodName)[0].dataSelects
    const optionsNoSlected = data.filter(item => !valueTransform.includes(item.value))
    const optionSelected = data.filter(item => valueTransform.includes(item.value))

    const getTotalQuantityInGroup = (group) => {
      let totalQuantity = 0
      optionSelected.forEach((item) => {
        if (item.group === group)
          totalQuantity += 1
      })
      return totalQuantity
    }

    const dataCheckDisabled = optionsNoSlected.map((item) => {
      const quantity = getTotalQuantityInGroup(item.group)
      if (quantity >= item.max) {
        return {
          ...item,
          disabled: true,
        }
      }
      else {
        return item
      }
    })
    const dataSelectFinal = [
      ...dataCheckDisabled,
      ...optionSelected,
    ]
    return dataSelectFinal
  }

  const convertOptionsValueToDataTableEdit = (selectedOptions, rowIndex, currentValueRow, tableEditData) => {
    const convertData = (selectedOptions) => {
      const result = []
      !isEmpty(selectedOptions) && selectedOptions.forEach((item) => {
        const [category, name, price] = item.split('-')
        const existingCategory = result.find(c => c.category === category)
        if (existingCategory) {
          existingCategory.detail.push({ name, price: Number(price) })
        }
        else {
          result.push({
            category,
            detail: [{ name, price: Number(price) }],
          })
        }
      })
      return result
    }

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
    return newList
  }

  const updateTableEdit = (tableEditData, name, value, rowIndex, currentValueRow) => {
    const newList = tableEditData.map((item) => {
      if (item.id === rowIndex) {
        return {
          ...currentValueRow,
          [name]: value,
        }
      }
      else {
        return item
      }
    })
    return newList
  }
  return { mutateBill, queryTableFoodOrderView: fetchQueryTableFoodOrderView, queryFoodOrderEdit: fetchQueryFoodOrderEdit, mutationSaveFoodOrderRow: fetchMutationSaveFoodOrderRow, fetchMutationDeleteFoodOrderRow, fetchQueryFormFees, fetchQueryFoodOrderMenu, handleFoodNamesSelect, transformDataForMultiSelect, convertOptionsValueToDataTableEdit, updateTableEdit }
}

export default useSummaryTab
