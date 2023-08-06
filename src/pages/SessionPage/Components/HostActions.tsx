import { Flex } from '@mantine/core'

import HostActionButton from './HostActionButton'
import { SessionActions, SessionStatuses } from '@/enums'

function HostActions({ status, handleDeleteSession, handlechangeStatus }) {
  return (
    <Flex
      gap="xs"
      justify="flex-end"
      wrap="wrap">
      {(status === SessionStatuses.OPEN || status === SessionStatuses.LOCKED) && <HostActionButton variant="outline" handleOnClick={handleDeleteSession} value={SessionActions.DELETE}/>}
      {(status === SessionStatuses.LOCKED) && <HostActionButton handleOnClick={() => handlechangeStatus(SessionStatuses.PENDING_PAYMENTS)} value={SessionActions.SPLIT_PAYMENT}/> }
      {(status === SessionStatuses.OPEN) && <HostActionButton handleOnClick={() => handlechangeStatus(SessionStatuses.LOCKED)} value={SessionActions.LOCK_ORDER}/>}
      {(status === SessionStatuses.PENDING_PAYMENTS) && <HostActionButton value={SessionActions.FINISH} handleOnClick={() => handlechangeStatus(SessionStatuses.FINISHED)}/> }
    </Flex>)
}

export default HostActions
