import { useEffect, useState } from 'react'
import { Button, FileButton, Flex, Group, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import NumberInputCustom from './NumberInput'
import EditTable from './TableSummaryEdit'
import ViewTable from '@/pages/SessionPage/Components/SummaryTab/TableSummaryView'
import ImagesUploaded from '@/components/ImagesUploaded'
import useSummaryTab from '@/hooks/useSummaryTab'
import axios from 'axios'
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

  function getFileNameFromPath(path) {
    return path.split('/').pop();
  }
  
  const handleSubmitBill = async (values) => {
    const formData = new FormData();
    for (const file of values.receiptScreenshot) {
      if (typeof file === 'object') {
        formData.append('receiptScreenshot', file);
      } else {
        const res = await axios.get(file, { responseType: 'blob' });
        const blob = res.data;
        const fileName = getFileNameFromPath(file);
        const fileTransform = new File([blob], fileName, { type: blob.type });
        formData.append('receiptScreenshot', fileTransform);
      }
    }
    formData.append('discountAmount', values.discountAmount ? Number(values.discountAmount) : 0);
    formData.append('shippingFee', values.shippingFee ? Number(values.shippingFee) : 0);
    formData.append('otherFee', values.otherFee ? Number(values.otherFee) : 0);
  
    fetchMutateBill.mutate(formData);
  };

  const files = form.getInputProps('receiptScreenshot').value
  const handleDeleteImage = (index) => {
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    form.setFieldValue('receiptScreenshot', updatedFiles)
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
                <NumberInputCustom field="discountAmount" form={form} label="Discount: "/>
                <NumberInputCustom field="shippingFee" form={form} label="Delivery cost: "/>
                <NumberInputCustom field="otherFee" form={form} label="OtherFee: "/>
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
                        <Button variant="light" size="xs" color="indigo" {...props}>
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
