import { Box, Button, Flex, Group, NumberInput, Spoiler, Text, Textarea, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import isEmpty from 'lodash/isEmpty'
import { get } from 'lodash'

import { PriceDisplay } from '../../FoodMenu/FoodMenuItem'
import useModal from '@/hooks/useModal'
import type { FoodOrderItem, FoodOrderItemFormValues, MenuItem, OptionDetail } from '@/types/food'
import useFoodStore from '@/store/foodStore'
import { createNewOrderItem, renderErrors, renderOptions, updateOptions, validateOptions } from '@/utils/foodOrderForm'

interface AddOrderFormProps {
  menuItem: MenuItem
}

function AddOrderForm({ menuItem }: AddOrderFormProps) {
  const { closeModal } = useModal()
  const addFoodOrderItem = useFoodStore(state => state.addFoodOrderItem)

  const mandatoryOptions = menuItem.options?.filter(option => option.mandatory).map(option => option.category)

  const form = useForm<FoodOrderItemFormValues>({
    initialValues: {
      quantity: 1,
      note: '',
      options: [],
    },
    validate: {
      options: validateOptions(mandatoryOptions),
    },
  })

  const submitHandler = form.onSubmit((values) => {
    const newOrderItem: FoodOrderItem = createNewOrderItem(values, menuItem)

    addFoodOrderItem(newOrderItem)
    closeModal()
  })

  const optionsChangedHandler = (category: string, detail: OptionDetail[]) => {
    const { options } = form.values

    const newOptions = updateOptions(options, category, detail)

    form.setFieldValue('options', [...newOptions])
    form.validate()
  }

  const optionErrors: string[] = get(form.errors, 'options')

  return (
    <Box maw={300} mx="auto">
      <form className="orderCustomization-form" onSubmit={submitHandler}>
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
                <>
                  <Spoiler maxHeight={20} showLabel="Show more" hideLabel="Hide">
                    {' '}
                    <Title lineClamp={2} order={6} fw={500}>
                      {menuItem.foodName}
                    </Title>
                    <Text size="xs">{menuItem.description}</Text>
                  </Spoiler>
                </>
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
          mt={16}
          autosize
          label={<Title transform="uppercase" order={6}>Note</Title>}
          placeholder="No ice please!!!"
          {...form.getInputProps('note')}
        />

        {renderOptions(menuItem, optionsChangedHandler, optionErrors)}

        <Group position="right" mt="md">
          <Button
            sx={{}}
            type="submit"
          >
            Add
          </Button>
        </Group>
      </form>
    </Box>
  )
}

export default AddOrderForm
