import React, { useEffect } from 'react'
import { Button, FileButton, Flex, Group, Text, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import isEmpty from 'lodash/isEmpty'
import useSessionInfo from '../hooks/useSessionInfo'
import ImagesUploaded from './ImagesUploaded'
import { handleFormData } from '@/utils/utility'

interface FormValue {
  title: string
  shopLink: string
  description: string
  hostPaymentInfo: string
  qrImages: Array<File>
}

const SessionInfoModal: React.FC = ({ isCreateFirst, sessionData, isEdit, sessionId, close }) => {
  const { mutateEditSessionInfo, mutateSessionInfo, fetchQueryHostPaymentInfo } = useSessionInfo(sessionId)

  // ......Config form.................................................
  const form = useForm<FormValue>({
    initialValues: isCreateFirst
      ? {
        title: '',
        shopLink: '',
        description: '',
        hostPaymentInfo: '',
        qrImages: [],
      }
      : sessionData,

    validate: {
      title: value => (value ? null : 'Title is required'),
      shopLink: value => (value ? null : 'Link Shop is required'),
      hostPaymentInfo: value => (value ? null : 'Payment Infomation is required'),
    },
  })
  const queryHostPaymentInfo = fetchQueryHostPaymentInfo(form)
  const fetchEditSessionInfo = mutateEditSessionInfo(close)

  useEffect(() => {
    const handlefetchSessionInfo = async () => {
      await queryHostPaymentInfo.refetch()
    }
    if (isCreateFirst)
      handlefetchSessionInfo()
  }, [])

  // .....Handle submit................................
  const handleSubmitNewSession = async (values) => {
    const dataForm = new FormData()
    dataForm.append('title', values.title)
    dataForm.append('shop_link', values.shopLink)
    dataForm.append('description', values.description)
    dataForm.append('host_payment_info', values.hostPaymentInfo)
    if (isCreateFirst) {
      await handleFormData(dataForm, values.qrImages, 'qr_images')
      mutateSessionInfo.mutate(dataForm)
    }
    else {
      !isEmpty(values.qrImages) ? await handleFormData(dataForm, values.qrImages, 'qr_images') : dataForm.append('qr_images', [])
      fetchEditSessionInfo.mutate(dataForm)
    }
  }

  const files = form.getInputProps('qrImages').value
  const handleDeleteImage = (index) => {
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    form.setFieldValue('qrImages', updatedFiles)
  }

  return (
    <form onSubmit={form.onSubmit(values => handleSubmitNewSession(values))} className="modal-session-info">
      <Flex style={{ width: '100%' }} className="modal-session-info__content">
        <Flex className="modal-session-info__content__left">
          <TextInput
            withAsterisk
            label="Title"
            placeholder='Drink "Tra Sua"'
            {...form.getInputProps('title')}
            style={{ width: '100%' }}
          />
          <TextInput
            withAsterisk
            label="Link shop"
            placeholder="https://shopeefood.vn/da-nang/tra-sua"
            {...form.getInputProps('shopLink')}
            style={{ width: '100%' }}
            disabled={isEdit}
          />
          <Textarea
            placeholder="Add more detailed descriptions about your session"
            label="Description"
            autosize
            maxRows={4}
            {...form.getInputProps('description')}
            style={{ width: '100%' }}
          />
        </Flex>
        <Flex className="modal-session-info__content__right">
          <Textarea
            withAsterisk
            placeholder="Payment method: TP Bank/Momo ...; Card name: 'A'; ..."
            label="Payment info"
            autosize
            maxRows={5}
            {...form.getInputProps('hostPaymentInfo')}
            style={{ width: '100%' }}
          />
          <Flex
            style={{ width: '100%', margin: '10px 0px' }}
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
          >
            <Text size="sm" fw={600}>
              QR code
            </Text>
            <Group position="center">
              <FileButton
                accept="image/png,image/jpeg"
                multiple
                {...form.getInputProps('qrImages')}
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
            <ImagesUploaded handleDeleteImage={handleDeleteImage} files={files} isView={false} />
          </Flex>
        </Flex>
      </Flex>
      <Group position="right" mt="md">
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
          Submit
        </Button>
      </Group>
    </form>
  )
}

export default SessionInfoModal
