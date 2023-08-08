import { useMemo } from 'react'
import { useForm } from '@mantine/form'
import { Box, Button, Flex, Group, NumberInput, Textarea, Title } from '@mantine/core'
import { find, get, isEmpty } from 'lodash'

import { PriceDisplay } from '../../FoodMenu/FoodMenuItem'
import useFoodStore from '@/store/foodStore'
import useModal from '@/hooks/useModal'

import type { FoodOrderItem, FoodOrderItemFormValues, OptionDetail } from '@/types/food'
import { renderErrors, renderOptions, updateCurrentOrderItem, updateOptions, validateOptions } from '@/utils/foodOrderForm'

interface EditOrderFormProps {
  foodOrderItem: FoodOrderItem
  sessionId: string
}

function EditOrderForm({ foodOrderItem, sessionId }: EditOrderFormProps) {
  const { closeModal } = useModal()
  const currentMenu = useFoodStore(state => state.currentMenu)
  const menuItem = useMemo(() => {
    const menuItem = find(currentMenu, { foodName: foodOrderItem.foodName })
    return menuItem
  }, [foodOrderItem, currentMenu])

  const updateFoodOrderItem = useFoodStore(
    state => state.updateFoodOrderItem,
  )

  const mandatoryOptions = menuItem.options?.filter(option => option.mandatory).map(option => option.category)

  const form = useForm<FoodOrderItemFormValues>({
    initialValues: {
      quantity: foodOrderItem.quantity,
      note: foodOrderItem.note,
      options: [],
    },
    validate: {
      options: validateOptions(mandatoryOptions),
    },
  })

  const optionsChangedHandler = (category: string, detail: OptionDetail[]) => {
    const { options } = form.values

    const newOptions = updateOptions(options, category, detail)

    form.setFieldValue('options', [...newOptions])
    form.validate()
  }

  const submitHandler = form.onSubmit((values) => {
    const updatedFoodOrderItem = updateCurrentOrderItem(values, foodOrderItem)

    updateFoodOrderItem(updatedFoodOrderItem, Number.parseInt(sessionId!))
    closeModal()
  })

  const optionErrors = get(form.errors, 'options')
  return (
    <Box maw={300} mx="auto">
      <form onSubmit={submitHandler}>
        <div className="foodMenuItem menuItemForm">
          <div className="foodMenuItem__imageWrapper">
            {' '}
            <img src={menuItem.photo} />
          </div>
          <div className="foodMenuItem__info">
            {isEmpty(menuItem.description)
              ? (
                <Title lineClamp={2} order={6} fw={500}>
                  {menuItem.foodName}
                </Title>
              )
              : (
                <Title lineClamp={2} order={6} fw={500}>
                  {menuItem.foodName}
                </Title>
              )}

            <Flex justify={'space-between'} align="flex-end">
              <PriceDisplay
                discountPrice={menuItem.discountPrice}
                price={menuItem.price}
              />
              <NumberInput
                maw={60}
                min={1}
                size="xs"
                {...form.getInputProps('quantity')}
              />
            </Flex>
          </div>
        </div>
        {renderErrors(optionErrors)}
        <Textarea
          autosize
          label={<Title transform="uppercase" order={6}>Note</Title>}
          placeholder="No ice please!!!"
          {...form.getInputProps('note')}
          mt={16}
        />

        {renderOptions(menuItem, optionsChangedHandler, optionErrors, foodOrderItem)}

        <Group position="right" mt="md">
          <Button type="submit">
            Edit
          </Button>s
        </Group>
      </form>
    </Box>
  )
}

export default EditOrderForm
