import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, FileButton, Flex, Group, Image, Text, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import isEmpty from 'lodash/isEmpty'
import { notificationShow } from './Notification'
import { REQUEST_GET_HOST_PAYMENT_INFO, REQUEST_POST_SESSION_INFO } from '@/constants/apis'
import axiosInstance from '@/settings/axios'
import { useRequestProcessor } from '@/settings/react-query'

interface FormValue {
  title: string
  shopLink: string
  description: string
  hostPaymentInfo: string
  qrImages: Array<File>
}

interface FormatDataSessionInfo {
  title: string
  shop_link: string
  description: string
  host_payment_info: string
  qr_images: Array<File>
}

const SessionInfo: React.FC = () => {
  const navigate = useNavigate()
  const { query, mutation } = useRequestProcessor()
  const fetchQuerySessionInfo = query(
    ['paymentInfo'],
    () => axiosInstance.get(REQUEST_GET_HOST_PAYMENT_INFO),
    {
      enabled: false,
      onSuccess: (data) => {
        form.setFieldValue('hostPaymentInfo', data.data.hostPaymentInfor)
      },
      onError: (error) => {
        notificationShow('error', 'Error: ', error.response.data.message)
      },
    },
  )
  useEffect(() => {
    const handlefetchSessionInfo = async () => {
      await fetchQuerySessionInfo.refetch()
    }
    handlefetchSessionInfo()
  }, [])

  const fetchMutationSessionInfo = mutation(
    ['sessionInfo'],
    async (data: FormatDataSessionInfo) =>
      await axiosInstance.post(REQUEST_POST_SESSION_INFO, data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      ),
    {
      onError: (error) => {
        notificationShow('error', 'Error: ', error.response.data.message)
      },
      onSuccess: (data) => {
        const { id, message } = data.data
        notificationShow('success', 'Success: ', message)
        navigate(`/sessions-today/${id}`)
      },
    },
  )
  // ......Config form.................................................
  const form = useForm<FormValue>({
    initialValues: {
      title: '',
      shopLink: '',
      description: '',
      hostPaymentInfo: '',
      qrImages: [],
    },

    validate: {
      title: value => (value ? null : 'Title is required'),
      shopLink: value => (value ? null : 'Link Shop is required'),
      hostPaymentInfo: value => (value ? null : 'Payment Infomation is required'),
    },
  })
  // .....Handle submit.............................................
  const handleSubmitNewSession = async (values: FormValue) => {
    const dataForm = {
      title: values.title,
      shop_link: values.shopLink,
      description: values.description,
      host_payment_info: values.hostPaymentInfo,
      qr_images: values.qrImages,
    }
    fetchMutationSessionInfo.mutate(dataForm)
  }

  const files: File[] = form.getInputProps('qrImages').value
  const previews
    = !isEmpty(files)
    && files.map((file, index) => {
      const imageUrl = URL.createObjectURL(file)
      return (
        <Image
          key={index}
          src={imageUrl}
          width={80}
          height={80}
          style={{ objectFit: 'contain', borderRadius: '5px', boxShadow: '1px 1px 5px 1px grey' }}
        />
      )
    })
  const clearFile = () => {
    form.setFieldValue('qrImages', [])
  }

  return (
    <form onSubmit={form.onSubmit(values => handleSubmitNewSession(values))}>
      <Flex gap="md" justify="center" align="flex-start" direction="row" style={{ width: '100%' }}>
        <Flex gap="md" justify="center" align="center" direction="column" style={{ width: '50%' }}>
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
        <Flex gap="md" justify="center" align="center" direction="column" style={{ width: '50%' }}>
          <Textarea
            withAsterisk
            placeholder="Payment method: TP Bank/Momo ...; Card name: 'A'; ..."
            label="Payment info"
            autosize
            maxRows={4}
            {...form.getInputProps('hostPaymentInfo')}
            style={{ width: '100%' }}
          />
          <Flex
            style={{ width: '100%' }}
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
                  <Button variant="light" size="xs" color="indigo" {...props}>
        Upload image
                  </Button>
                )}
              </FileButton>
              <Button
                disabled={!previews}
                variant="light"
                color="orange"
                size="xs"
                onClick={clearFile}
              >
    Reset Image
              </Button>
            </Group>
          </Flex>
          <Flex gap="md" justify="center" align="center" direction="row" wrap="wrap">
            {previews}
          </Flex>
        </Flex>
      </Flex>
      <Group position="right" mt="md">
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
          Submit
        </Button>
      </Group>
    </form>
  )
}

export default SessionInfo
