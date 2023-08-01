import { isEmpty } from 'lodash'

export const moneyFormat = (
  value: number,
  currency = 'USD',
  locales = 'en-US',
  options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
  },
): string => {
  const formatter = new Intl.NumberFormat(locales, options)
  return formatter.format(value)
}

export function divideElementsIntoGroups<T>(
  elements: T[],
  maxElementsPerGroup: number,
): T[][] {
  if (isEmpty(elements))
    return []

  if (maxElementsPerGroup <= 0)
    throw new Error('maxElementsPerGroup must be a positive integer.')

  const numGroups = Math.ceil(elements.length / maxElementsPerGroup)
  const groups: T[][] = []

  for (let i = 0; i < numGroups; i++) {
    const startIndex = i * maxElementsPerGroup
    const endIndex = startIndex + maxElementsPerGroup
    const group = elements.slice(startIndex, endIndex)
    groups.push(group)
  }

  return groups
}
