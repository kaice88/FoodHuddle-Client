import { useEffect, useState } from 'react'
import { Button, FileButton, Flex, Textarea, Title } from '@mantine/core'
import { IconUpload } from '@tabler/icons-react'
import { Controller, useForm } from 'react-hook-form'
import isEmpty from 'lodash/isEmpty'
import ax from 'axios'

import ImagesUploaded from '@/components/ImagesUploaded'
import usePaymentSession from '@/hooks/usePaymentSession'
import { notificationShow } from '@/components/Notification'

export default function PaymentModal({ id, closeModal, userPayment }) {
  const [isLoading, setIsLoading] = useState(false)

  const [lengthNote, handlerLengthNote] = useState(userPayment?.note ? userPayment.note.length : 0)

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
    setValue('evidence', userPayment.evidence)
    setValue('note', userPayment.note)
  }, [])

  const handleDeleteImage = (index) => {
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    setFiles(updatedFiles)
    setValue('evidence', updatedFiles)
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    const formData = new FormData()
    const evidence = data.evidence
    await Promise.all (evidence?.map(async (item) => {
      if (typeof item === 'object') {
        formData.append('evidence', item)
      }
      else {
        const res = await ax.get(item, { responseType: 'blob' })
        const blob = res.data
        const fileName = item.split('/').pop()
        const fileTransform = new File([blob], fileName, { type: blob.type })
        formData.append('evidence', fileTransform)
      }
    }))
    formData.append('note', data.note)

    requestPayment(formData, (res) => {
      setIsLoading(false)
      notificationShow('success', 'SUCCESS', res.data.message)
      closeModal()
    },
    (error) => {
      setIsLoading(false)
      if (error.code === 'ERR_NETWORK')
        notificationShow('error', 'ERROR', error.message)
      else
        notificationShow('error', 'ERROR', error.response?.data?.message || 'Something went wrong.')
    },
    )
  }
  const handleNoteChange = (e) => {
    e.preventDefault()
    const value = e.target.value
    if (value.length <= 300) {
      setValue('note', value)
      handlerLengthNote(value.length)
    }
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
              onChange={e => handleNoteChange(e)}
            />}
        />
        <Flex justify={'flex-end'} style={{ marginTop: '10px' }}>{lengthNote}/300</Flex>
        <Flex justify="flex-end">
          <Button mt="md" type="submit" loading={isLoading}>Save</Button>
        </Flex>
      </form>
    </>)
}
