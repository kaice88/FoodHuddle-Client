import Decimal from 'decimal.js'

export const moneyFormat = (
  value,
  currency = 'USD',
  locales = 'en-US',
  options = {
    style: 'currency',
    currency,
  },
) => {
  const formatter = new Intl.NumberFormat(locales, options)
  return formatter.format(value)
}

export const calculateTotal = (total, item) => {
  return new Decimal(total).add(item)
}
