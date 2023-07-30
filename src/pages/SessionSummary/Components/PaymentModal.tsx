import { Button, FileButton, Flex, Textarea, Title } from '@mantine/core'
import { IconUpload } from '@tabler/icons-react'
import { Controller, useForm } from 'react-hook-form'

import ImagesUploaded from '@/components/ImagesUploaded'
import usePaymentSession from '@/hooks/usePaymentSession'

export default function PaymentModal({ id, files, setFiles }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      note: '',
      evidence: [],
    },
  })
  const { requestPayment } = usePaymentSession(id)

  const handleDeleteImage = (index) => {
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    setFiles(updatedFiles)
  }

  const onSubmit = (data) => {
    requestPayment(data)
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
