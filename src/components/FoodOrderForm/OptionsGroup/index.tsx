import React, { useEffect, useState } from 'react'

import { Box, Checkbox, Highlight, Title } from '@mantine/core'

import { v4 as uuidv4 } from 'uuid'
import isEmpty from 'lodash/isEmpty'
import type { Option, OptionDetail, SelectedOptions } from '@/types/food'
import { moneyFormat } from '@/utils'

interface OptionsGroupProps {
  option: Option
  optionsChangedHandler: (category: string, detail: OptionDetail[]) => void
  defaultValue?: SelectedOptions
  optionErrors: string[]
}

function OptionsGroup({
  option,
  optionsChangedHandler,
  defaultValue,
  optionErrors,
}: OptionsGroupProps) {
  const [selectedOptionItems, setSelectedOptionItems] = useState<
    OptionDetail[]
  >(() => {
    return !isEmpty(defaultValue) ? defaultValue.detail : []
  })

  useEffect(() => {
    optionsChangedHandler(option.category, selectedOptionItems)
  }, [selectedOptionItems])

  const handleCheckboxChange = (optionItem: OptionDetail, checked: boolean) => {
    if (option.mandatory) {
      setSelectedOptionItems(checked ? [optionItem] : [])
    }
    else {
      setSelectedOptionItems(prevSelectedOptionItems =>
        checked
          ? [...(prevSelectedOptionItems || []), optionItem]
          : (prevSelectedOptionItems || []).filter(
            option => option.name !== optionItem.name,
          ),
      )
    }
  }

  const formattedCategory = option.category.toLocaleUpperCase('vi-VN')

  return (
    <Box mt={8}>
      <Title order={6}>
        {!optionErrors
          ? (
            formattedCategory
          )
          : (
            optionErrors.includes(option.category)
              ? (
                <Highlight highlightColor="red" highlight={formattedCategory}>
                  {formattedCategory}
                </Highlight>
              )
              : (
                formattedCategory
              )
          )}
      </Title>
      {option.detail.map(optionItem => (
        <Checkbox
          key={uuidv4()}
          labelPosition="left"
          description={moneyFormat(optionItem.price, 'VND', 'vi-VN')}
          label={optionItem.name.toLowerCase('vi-VN')}
          checked={
            !isEmpty(selectedOptionItems)
            && selectedOptionItems.some(
              option => option.name === optionItem.name,
            )
          }
          onChange={(event) => {
            const checked = event.currentTarget.checked
            handleCheckboxChange(optionItem, checked)
          }}
        />
      ))}
    </Box>
  )
}

export default OptionsGroup
