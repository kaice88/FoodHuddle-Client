import { useEffect, useState } from 'react'
import { Button, FileButton, Flex, Group, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import NumberInputCustom from './NumberInput'
import EditTable from './TableSummaryEdit'
import ViewTable from '@/pages/SessionPage/Components/SummaryTab/TableSummaryView'
import ImagesUploaded from '@/components/ImagesUploaded'
import useSummaryTab from '@/hooks/useSummaryTab'

const SummaryTab = ({ sessionId }) => {
  const { mutateBill } = useSummaryTab()
  const fetchMutateBill = mutateBill(sessionId)
  const [isOpenEditableTable, setIsOpenEditableTable] = useState(false)
  const [formFees, setFormFees] = useState({})

  const { fetchQueryFormFees } = useSummaryTab()
  const fetchFormFees = fetchQueryFormFees(sessionId, setFormFees)

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

  useEffect(() => {
    const handlefetchFetchFormFees = async () => {
      await fetchFormFees.refetch()
    }
    handlefetchFetchFormFees()
  }, [])

  const handleSubmitBill = async (values) => {
    const formData = new FormData()
    values.bill.forEach((file) => {
      formData.append('bill', file)
    })
    formData.append('sessionId', Number(sessionId))
    formData.append('discount', values.discount ? Number(values.discount) : 0)
    formData.append('shipFee', values.shipFee ? Number(values.shipFee) : 0)
    formData.append('others', values.others ? Number(values.others) : 0)

    fetchMutateBill.mutate(formData)
  }

  const files = form.getInputProps('bill').value
  const handleDeleteImage = (index) => {
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    form.setFieldValue('bill', updatedFiles)
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
                <NumberInputCustom field="discount" form={form} label="Discount: "/>
                <NumberInputCustom field="shipFee" form={form} label="Delivery cost: "/>
                <NumberInputCustom field="others" form={form} label="Others: "/>
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
                      {...form.getInputProps('bill')}
                    >
                      {props => (
                        <Button variant="light" size="xs" color="indigo" {...props}>
                          Upload image
                        </Button>
                      )}
                    </FileButton>
                  </Group>
                </Flex>
                <Flex gap="md" justify="center" align="center" direction="row" wrap="wrap">
                  <ImagesUploaded handleDeleteImage={handleDeleteImage} files={files} />
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
