import { useMantineTheme } from '@mantine/core'
import isEmpty from 'lodash/isEmpty'
import { notificationShow } from '@/components/Notification'
import { REQUEST_GET_FOOD_ORDER_IN_SUMMARY_TAB, REQUEST_GET_FOOD_ORDER_MENU, REQUEST_POST_ORDER_BILL, REQUEST_PUT_FOOD_ORDER_ROW } from '@/constants/apis'
import axiosInstance from '@/settings/axios'
import { useRequestProcessor } from '@/settings/react-query'
import { calculateTotal } from '@/utils/utility'

function useSummaryTab() {
  const globalTheme = useMantineTheme()

  const { mutation, query } = useRequestProcessor()

  const mutateBill = sessionId =>
    mutation(
      ['save-bill'],
      async data => await axiosInstance.put(`${REQUEST_POST_ORDER_BILL}/${sessionId}/fee`, data),
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

  const fetchQueryFormFees = (sessionId, setFormFees) => query(
    ['get-bill'],
    () => axiosInstance.get(`${REQUEST_POST_ORDER_BILL}/${sessionId}/fee`),
    {
      enabled: false,
      onSuccess: (data) => {
        if (data.data.statusCode === 200) {
          notificationShow('success', 'Success: ', data.data.message)
          setFormFees(() => data.data)
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
  const handleFoodNamesSelect = (dataMenu) => {
    const foodNames = !isEmpty(dataMenu)
      ? dataMenu.map((item, index) => {
        return item.foodName
      })
      : []
    return foodNames
  }

  // const handleOptionsSelect = (dataMenu) => {
  //   const optionsList = !isEmpty(dataMenu)
  //     ? dataMenu.flatMap((item, idx) => {
  //         return
  //       const dataSelects = !isEmpty(item.options)
  //         ? item.options.flatMap(option =>
  //           option.detail.map((detailItem, index) => ({
  //             value: `${option.category}-${detailItem.name}-${detailItem.price}`,
  //             label: detailItem.name,
  //             group: option.mandatory ? `${option.category} [required]` : option.category,
  //             price: detailItem.price,
  //             key: `${option.category}-${detailItem.name}-${detailItem.price}-${idx}`,
  //           })),
  //         )
  //         : []
  //       return dataSelects
  //     })
  //     : []
  const handleSelect = (options, idx) => {
    const dataSelects = !isEmpty(options)
      ? options.flatMap(option =>
        option.detail.map((detailItem, index) => ({
          value: `${option.category}-${detailItem.name}-${detailItem.price}`,
          label: detailItem.name,
          group: option.mandatory ? `${option.category} [required]` : option.category,
          price: detailItem.price,
          key: `${option.category}-${detailItem.name}-${detailItem.price}-${idx}`,
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
    // // Filter out duplicate items based on value, label, group, and price
    // const uniqueOptionsList = []
    // const uniqueKeys = new Set()

    // optionsList.forEach((item) => {
    //   const key = `${item.value}-${item.label}-${item.group}-${item.price}`
    //   if (!uniqueKeys.has(key)) {
    //     uniqueKeys.add(key)
    //     uniqueOptionsList.push(item)
    //   }
    // })

    // // console.log('OptionsList', uniqueOptionsList)
    // return uniqueOptionsList
  }

  const fetchQueryFoodOrderMenu = (sessionId, setFoodOrderMenu, setOptionsSelect) => query(
    ['get-all-menu'],
    () => axiosInstance.get(REQUEST_GET_FOOD_ORDER_MENU, {
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
          notificationShow('success', 'Success: ', data.data.message)
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
        const totalMoneyEachFood = item.orders.reduce((total, item) => {
          return calculateTotal(total, item.quantity * item.actualPrice)
        }, 0)
        const quantityOrderEachFood = item.orders.reduce((acc, item) => {
          return acc + item.quantity
        }, 0)
        return (
          {
            id: Number(index) + 1,
            foodName: item.foodName,
            total: Number(totalMoneyEachFood),
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
        if (data.data.statusCode === 400) {
          notificationShow('error', 'Error: ', data.data.message)
        }
        else {
          notificationShow('success', 'Success: ', data.data.message)
          setTableViewData(() => handleTransformDataToTableData(data.data.data.foodOrderList))
          setChildrenTableView(() => handleTransformToChildrenTable(data.data.data.foodOrderList))
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
        console.log(333333333333)
        if (data.data.statusCode === 400) {
          notificationShow('error', 'Error: ', data.data.message)
        }
        else {
          notificationShow('success', 'Success: ', data.data.message)
          setTableEditData(handleTransformTableEdit(data.data.data.foodOrderList))
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
      await axiosInstance.delete(`${REQUEST_PUT_FOOD_ORDER_ROW}/${data.rowId}`, {
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

  return { mutateBill, queryTableFoodOrderView: fetchQueryTableFoodOrderView, queryFoodOrderEdit: fetchQueryFoodOrderEdit, mutationSaveFoodOrderRow: fetchMutationSaveFoodOrderRow, fetchMutationDeleteFoodOrderRow, fetchQueryFormFees, fetchQueryFoodOrderMenu, handleFoodNamesSelect }
}

export default useSummaryTab
