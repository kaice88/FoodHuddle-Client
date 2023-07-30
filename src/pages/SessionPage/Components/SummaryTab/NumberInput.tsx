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
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      min={0}
    />
  )
}

export default NumberInputCustom
