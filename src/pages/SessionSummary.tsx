import { Flex } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import ActionButton from '@/components/ActionButton'
import useSession from '@/hooks/useSession'
import { SessionStatuses } from '@/enums'
import { notificationShow } from '@/components/Notification'

export default function SessionSummary() {
  const [disabled, setDisable] = useState(false)
  const { sessionId } = useParams()
  const { changeStatus } = useSession(sessionId)
  const handleChangeStatus = () => {
    changeStatus(SessionStatuses.FINISHED, (data) => {
      notificationShow('success', 'SUCCESS', data.data.message)
    },
    )
  }
  return (
    <Flex><ActionButton value="finish" colorName="orange" onClick={handleChangeStatus} disabled={false}></ActionButton></Flex>
  )
}
