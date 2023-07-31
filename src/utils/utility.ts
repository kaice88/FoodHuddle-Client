import Decimal from 'decimal.js'

export const getUrlParameter = (sParam) => {
  const sPageURL = window.location.search.substring(1)
  const sURLVariables = sPageURL.split('&')

  let sParameterName

  for (let i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=')

    if (sParameterName[0] === sParam)
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1])
  }

  return null
}

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
