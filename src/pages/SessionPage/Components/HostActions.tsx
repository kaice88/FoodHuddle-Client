import { Flex } from '@mantine/core'

import HostActionButton from '../../../components/HostActionButton'
import { SessionActions, SessionStatuses } from '@/enums'

const HostActions = ({ status, handleDeleteSession, handlechangeStatus }) => {
  return (
    <Flex
      gap="xs"
      justify="flex-end"
      wrap="wrap">
      <HostActionButton variant="outline" handleOnClick={handleDeleteSession} value={SessionActions.DELETE}/>
      {
        status === SessionStatuses.OPEN
          ? (<HostActionButton handleOnClick={() => handlechangeStatus(SessionStatuses.LOCKED)} value={SessionActions.LOCK_ORDER} />)
          : (<HostActionButton handleOnClick={() => handlechangeStatus(SessionStatuses.PENDING_PAYMENTS)} value={SessionActions.SPLIT_PAYMENT}/>)
      }
    </Flex>)
}

export default HostActions
