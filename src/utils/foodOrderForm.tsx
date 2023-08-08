import isEmpty from 'lodash/isEmpty'
import { Flex, Highlight, List, ScrollArea } from '@mantine/core'
import find from 'lodash/find'
import get from 'lodash/get'
import { v4 as uuidv4 } from 'uuid'
import { isOptionsEmpty } from './food'
import type { FoodOrderItem, FoodOrderItemFormValues, MenuItem, OptionDetail, SelectedOptions } from '@/types/food'
import OptionsGroup from '@/components/FoodOrderForm/OptionsGroup'

export function renderErrors(optionErrors: string[]) {
  if (!isEmpty(optionErrors)) {
    return (
      <List mt={16}>
        {optionErrors.map(err => (
          <List.Item key={err}>
            <Highlight sx={{ display: 'inline' }} highlightColor="red" highlight={err}>
              {err}
            </Highlight>{' '}
            is required!
          </List.Item>
        ))}
      </List>
    )
  }
}

export function renderOptions(menuItem: MenuItem, optionsChangedHandler: (category: string, detail: OptionDetail[]) => void, optionErrors: string[], foodOrderItem?: FoodOrderItem) {
  if (!isEmpty(menuItem.options)) {
    return (
      <ScrollArea mt={8} h={200}>
        <Flex direction="column" gap={16}>
          {menuItem.options.map(option => (
            <Flex key={option.id} direction="column">
              <OptionsGroup
                optionsChangedHandler={optionsChangedHandler}
                key={option.id}
                option={option}
                optionErrors={optionErrors}
                defaultValue={foodOrderItem && find(get(foodOrderItem, 'options'), {
                  category: option.category,
                })}
              />
            </Flex>
          ))}
        </Flex>
      </ScrollArea>
    )
  }
}

export function validateOptions(mandatoryOptions: string[]) {
  return (value) => {
    if (isEmpty(mandatoryOptions))
      return null
    const errors: string[] = []
    value.forEach((option) => {
      if (mandatoryOptions.includes(option.category) && isEmpty(option.detail))
        errors.push(option.category)
    })
    if (isEmpty(errors))
      return null
    return errors
  }
}

export function updateOptions(options: SelectedOptions[], category: string, detail: OptionDetail[]) {
  const newOptions = [...options]
  const existingOption = newOptions.find(option => option.category === category)
  if (existingOption)
    existingOption.detail = detail
  else
    newOptions.push({ category, detail })
  return newOptions
}

function constructOrderItem(
  values: FoodOrderItemFormValues,
  sourceItem: { id: string; foodId: string; foodName: string; foodImage: string; originPrice: number },
): FoodOrderItem {
  const { note, quantity, options } = values
  return {
    id: sourceItem.id,
    foodId: sourceItem.foodId,
    foodName: sourceItem.foodName,
    foodImage: sourceItem.foodImage,
    originPrice: sourceItem.originPrice,
    note,
    quantity,
    options: isOptionsEmpty(options) ? [] : options,
  }
}

export function createNewOrderItem(values: FoodOrderItemFormValues, menuItem: MenuItem): FoodOrderItem {
  const sourceItem = {
    id: uuidv4(),
    foodId: menuItem.id,
    foodName: menuItem.foodName,
    foodImage: menuItem.photo,
    originPrice: menuItem.discountPrice > 0 ? menuItem.discountPrice : menuItem.price,
  }
  return constructOrderItem(values, sourceItem)
}

export function updateCurrentOrderItem(values: FoodOrderItemFormValues, currentFoodOrderItem: FoodOrderItem): FoodOrderItem {
  return constructOrderItem(values, currentFoodOrderItem)
}
