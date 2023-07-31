import { Button, FileButton, Flex, Textarea, Title } from '@mantine/core'
import { IconUpload } from '@tabler/icons-react'
import { Controller, useForm } from 'react-hook-form'
import isEmpty from 'lodash/isEmpty'

import { useEffect, useState } from 'react'
import ImagesUploaded from '@/components/ImagesUploaded'
import usePaymentSession from '@/hooks/usePaymentSession'
import { notificationShow } from '@/components/Notification'

export default function PaymentModal({ id, closeModal, userPayment }) {
  const [files, setFiles] = useState([])
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      note: '',
      evidence: [],
    },
  })
  const { requestPayment } = usePaymentSession(id)
  useEffect(() => {
    if (isEmpty(userPayment))
      return
    setFiles(userPayment.evidence)
    setValue('evidence', files)
    setValue('note', userPayment.note)
  }, [])
  const handleDeleteImage = (index) => {
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    setFiles(updatedFiles)
  }

  const onSubmit = (data) => {
    requestPayment(data, (res) => {
      notificationShow('success', 'SUCCESS', res.data.message)
      closeModal()
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex align="center" >
          <Title sx={() => ({ fontWeight: 500, fontSize: '14px' })} color="#212529" pr={10}>Evidence</Title>
          <Controller
            name="evidence"
            control={control}
            render={({ field }) =>
              <FileButton onChange={(value) => {
                setFiles(value)
                field.onChange(value)
              }} accept="image/png,image/jpeg" multiple >
                {props => <Button {...props} size="xs" variant="outline" leftIcon={<IconUpload size="1rem"></IconUpload>}>Upload</Button>}
              </FileButton>}
          />
        </Flex>
        {files.length > 0 && <Flex gap="md" justify="flex-start" align="center" direction="row" wrap="wrap" p={10} >
          <ImagesUploaded handleDeleteImage={handleDeleteImage} files={files} />
        </Flex> }
        <Controller
          name="note"
          control={control}
          render={({ field }) =>
            <Textarea {...field}
              placeholder="Your note"
              label="Note"
            />}
        />
        <Flex justify="flex-end">
          <Button mt="md" type="submit">OK</Button>
        </Flex>
      </form>
    </>)
}
