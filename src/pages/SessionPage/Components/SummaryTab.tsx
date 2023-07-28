import React, { useState } from 'react'
import { Button, Flex, Group, NumberInput, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import ViewTable from '@/components/Tables/TableExpandable/TableSummaryView'
import EditTableWithProviders from '@/components/Tables/TableSummaryEdit'
import UploadImages from '@/components/UploadFile'
import { useRequestProcessor } from '@/settings/react-query'
import { REQUEST_POST_ORDER_BILL } from '@/constants/apis'
import { notificationShow } from '@/components/Notification'
import axiosInstance from '@/settings/axios'

const SummaryTab = ({ sessionId }) => {
  const { mutation } = useRequestProcessor()

  const [isOpenEditableTable, setIsOpenEditableTable] = useState(false)

  const handleTranformToEditTable = () => {
    setIsOpenEditableTable(true)
  }
  const handleBackToViewTable = () => {
    setIsOpenEditableTable(false)
  }

  const form = useForm({
    initialValues: {
      sessionId: Number(sessionId),
      discount: '',
      shipFee: '',
      others: '',
      bill: [],
    },
  })
  const handleOnChangeUploadFile = (value: File[]) => {
    form.setFieldValue('bill', value)
  }

  const fetchMutateBill = mutation(
    ['orderbill'],
    async data => await axiosInstance.post(REQUEST_POST_ORDER_BILL, data),
    {
      onSuccess: (data) => {
        if (data.data.statusCode === 200)
          notificationShow('success', 'Success: ', data.data.message)

        else
          notificationShow('error', 'Error: ', data.data.message)
      },
      onError: (error) => {
        notificationShow('error', 'Error: ', error.response.data.message)
      },
    },
  )
  const handleSubmitNewSession = async (values) => {
    fetchMutateBill.mutate(values)
  }

  const isHostRole = true

  return (
    <>{
      isHostRole
        ? (<>
          <Flex
            gap="md"
            justify="flex-start"
            align="center"
            direction="row"
            style={{ width: '100%', margin: '20px' }}
          >
            <Button
              onClick={() => handleBackToViewTable()}
              disabled={!isOpenEditableTable}
              styles={theme => ({
                root: {
                  backgroundColor: theme.fn.lighten(theme.colors.darkLavender[0], 0.6),
                  color: theme.colors.darkLavender[0],
                  ...theme.fn.hover({
                    backgroundColor: theme.fn.lighten(theme.colors.darkLavender[0], 0.7),
                  }),
                  padding: '10px',
                },
              })}
            >
          View
            </Button>
            <Button
              onClick={() => handleTranformToEditTable()}
              disabled={isOpenEditableTable}
              styles={theme => ({
                root: {
                  backgroundColor: theme.fn.lighten(theme.colors.darkLavender[0], 0.6),
                  color: theme.colors.darkLavender[0],
                  ...theme.fn.hover({
                    backgroundColor: theme.fn.lighten(theme.colors.darkLavender[0], 0.7),
                  }),
                  padding: '10px',
                },
              })}
            >
          Edit
            </Button>
          </Flex>
          {!isOpenEditableTable
            ? (
              <ViewTable sessionId={sessionId}/>
              )
            : (
              <EditTableWithProviders sessionId={sessionId}/>
              )}
          <form
            onSubmit={form.onSubmit(values => handleSubmitNewSession(values))}

            className="form-fees"
          >
            <Flex
              gap="md"
              justify="space-between"
              align="flex-start"
              direction="row"
              className="form-fees__fill">

              <Flex
                gap="md"
                direction="column"
                className="form-fees__fill__cost"
              >
                <NumberInput
                  label="Discount:"
                  placeholder=""
                  {...form.getInputProps('discount')}
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  min={0}
                />
                <NumberInput
                  label="Delivery cost:"
                  placeholder=""
                  formatter ={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser ={value => value.replace(/[^\d.]/g, '')}
                  {...form.getInputProps('shipFee')}
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  min={0}
                />
                <NumberInput
                  placeholder=""
                  label="Others:"
                  {...form.getInputProps('others')}
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                />

              </Flex>
              <Flex
                gap="md"
                justify="flex-start"
                align="flex-start"
                className="form-fees__fill__bill"
                direction="column"
              >
                <Flex
                  w={'100%'}
                  gap="md"
                  justify="flex-start"
                  align="flex-start"
                  direction="row"
                >
                  <Text size="sm" fw={600}>
              Bill
                  </Text>
                  <Group position="center">
                    <UploadImages handleOnChange={handleOnChangeUploadFile} type="picture" />
                  </Group>
                </Flex>
              </Flex>
            </Flex>
            <Group position="right" mt="md" style={{ margin: '10px' }}>
              <Button
                type="submit"
                size="15px"
                styles={theme => ({
                  root: {
                    backgroundColor: theme.fn.lighten(theme.colors.orange[0], 0.9),
                    color: theme.colors.orange[0],
                    ...theme.fn.hover({
                      backgroundColor: theme.fn.lighten(theme.colors.orange[0], 0.8),
                    }),
                    padding: '10px',
                  },
                })}
              >
            Save
              </Button>
            </Group>
          </form>
        </>)
        : <div style={{ margin: '30px 0px' }}><ViewTable /> </div>}</>
  )
}

export default SummaryTab
