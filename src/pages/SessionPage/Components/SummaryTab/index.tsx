import { useEffect, useState } from 'react'
import { Button, FileButton, Flex, Group, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import NumberInputCustom from './NumberInput'
import EditTable from './TableSummaryEdit'
import ViewTable from '@/pages/SessionPage/Components/SummaryTab/TableSummaryView'
import ImagesUploaded from '@/components/ImagesUploaded'
import useSummaryTab from '@/hooks/useSummaryTab'
import { handleFormData } from '@/utils/utility'

function SummaryTab({ sessionId, isHosted }) {
  const { mutateBill, fetchQueryFormFees } = useSummaryTab()
  const fetchMutateBill = mutateBill(sessionId)
  const [isOpenEditableTable, setIsOpenEditableTable] = useState(false)
  const [formFees, setFormFees] = useState({})
  const fetchFormFees = fetchQueryFormFees(sessionId, setFormFees)
  const handleTranformToEditTable = () => {
    setIsOpenEditableTable(true)
  }
  const handleBackToViewTable = () => {
    setIsOpenEditableTable(false)
  }

  const form = useForm({
    initialValues: {
      discountAmount: '',
      shippingFee: '',
      otherFee: '',
      receiptScreenshot: [],
    },
  })
  useEffect(() => {
    const handlefetchFetchFormFees = async () => {
      await fetchFormFees.refetch()
    }
    handlefetchFetchFormFees()
  }, [])

  useEffect(() => {
    formFees !== null && form.setValues(formFees)
  }, [formFees])

  const handleSubmitBill = async (values) => {
    const formData = new FormData()
    await handleFormData(formData, values.receiptScreenshot, 'receiptScreenshot')
    formData.append('discountAmount', values.discountAmount ? Number(values.discountAmount) : 0)
    formData.append('shippingFee', values.shippingFee ? Number(values.shippingFee) : 0)
    formData.append('otherFee', values.otherFee ? Number(values.otherFee) : 0)

    fetchMutateBill.mutate(formData)
  }

  const files = form.getInputProps('receiptScreenshot').value
  const handleDeleteImage = (index) => {
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    form.setFieldValue('receiptScreenshot', updatedFiles)
  }

  return (
    <>{
      isHosted
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
                  backgroundColor: theme.colors.orange[0],
                  ...theme.fn.hover({
                    backgroundColor: theme.fn.lighten(theme.colors.orange[0], 0.5),
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
                  backgroundColor: theme.colors.orange[0],
                  ...theme.fn.hover({
                    backgroundColor: theme.fn.lighten(theme.colors.orange[0], 0.5),
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
              <EditTable sessionId={sessionId}/>
            )}
          <form
            onSubmit={form.onSubmit(values => handleSubmitBill(values))}

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
                <NumberInputCustom field="shippingFee" form={form} label="Shipping fee: "/>
                <NumberInputCustom field="discountAmount" form={form} label="Discount: "/>
                <NumberInputCustom field="otherFee" form={form} label="Other fees: "/>
              </Flex>
              <Flex
                gap="md"
                justify="flex-start"
                align="flex-start"
                direction="column"
                className="form-fees__fill__bill"
              >
                <Flex
                  style={{ width: '100%' }}
                  gap="md"
                  justify="flex-start"
                  align="flex-start"
                  direction="row"
                >
                  <Text size="sm" fw={600}>
                    Bill
                  </Text>
                  <Group position="center">
                    <FileButton
                      accept="image/png,image/jpeg"
                      multiple
                      {...form.getInputProps('receiptScreenshot')}
                    >
                      {props => (
                        <Button
                          variant="outline"
                          styles={theme => ({
                            root: {
                              color: theme.colors.orange[0],
                              border: `1px solid ${theme.colors.orange[0]}`,
                              ...theme.fn.hover({
                                backgroundColor: theme.fn.lighten(theme.colors.orange[0], 0.95),
                              }),
                              padding: '10px',
                            },
                          })}
                          {...props}>
                        Upload image
                        </Button>
                      )}
                    </FileButton>
                  </Group>
                </Flex>
                <Flex gap="md" justify="center" align="center" direction="row" wrap="wrap">
                  <ImagesUploaded handleDeleteImage={handleDeleteImage} files={ files}/>
                </Flex>
              </Flex>
            </Flex>
            <Group position="right" mt="md" style={{ margin: '10px' }}>
              <Button
                type="submit"
                size="15px"
                styles={theme => ({
                  root: {
                    backgroundColor: theme.colors.orange[0],
                    ...theme.fn.hover({
                      backgroundColor: theme.fn.lighten(theme.colors.orange[0], 0.5),
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
        : <div style={{ margin: '30px 0px' }}><ViewTable sessionId={sessionId}/> </div>}</>
  )
}

export default SummaryTab
