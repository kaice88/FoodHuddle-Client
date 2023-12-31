import Decimal from 'decimal.js'
import axios from 'axios'

export function moneyFormat(value,
  currency = 'USD',
  locales = 'en-US',
  options = {
    style: 'currency',
    currency,
  }) {
  const formatter = new Intl.NumberFormat(locales, options)
  return formatter.format(value)
}

export function calculateTotal(total, item) {
  return new Decimal(total).add(item)
}

function getFileNameFromPath(path) {
  return path.split('/').pop()
}

export async function handleFormData(dataForm, values, field, setIsLoading) {
  const promises = values?.map(async (file) => {
    if (typeof file === 'object') {
      dataForm.append(field, file)
    }
    else {
      try {
        const res = await axios.get(file, { responseType: 'blob' })
        const blob = res.data
        const fileName = getFileNameFromPath(file)
        const fileTransform = new File([blob], fileName, { type: blob.type })
        dataForm.append(field, fileTransform)
      }
      catch (error) {
        setIsLoading(false)
      }
    }
  },
  )
  await Promise.all(promises)
  return dataForm
}

export const calculatePaymentAmount = (foodOrders) => {
  return foodOrders.reduce((total, item) => {
    return new Decimal(total).add(new Decimal(item.quantity).mul(item.actualPrice))
  }, 0)
}
