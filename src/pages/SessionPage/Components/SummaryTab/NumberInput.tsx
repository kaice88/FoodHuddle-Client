import React from 'react'
import { NumberInput } from '@mantine/core'

const NumberInputCustom = ({ field, form, label }) => {
  return (
    <NumberInput
      label={label}
      placeholder=""
      formatter ={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser ={value => value.replace(/[^\d.]/g, '')}
      {...form.getInputProps(field)}
      min={0}
      className="item-field"
    />
  )
}

export default NumberInputCustom
