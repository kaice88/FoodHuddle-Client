import { Flex } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import HostActionButton from '@/components/HostActionButton'
import useSession from '@/hooks/useSession'
import { SessionActions, SessionStatuses } from '@/enums'
import { notificationShow } from '@/components/Notification'

export default function SessionSummary() {
  const [hidden, setHidden] = useState(false)
  const { sessionId } = useParams()
  const { changeStatus } = useSession(sessionId)
  const handleChangeStatus = () => {
    changeStatus(SessionStatuses.FINISHED, (data) => {
      notificationShow('success', 'SUCCESS', data.data.message)
      setHidden(true)
    },
    )
  }
  return (
    <Flex justify="flex-end">
      {!hidden && <HostActionButton value={SessionActions.FINISH} handleOnClick={handleChangeStatus}/>}
    </Flex>
  )
}
