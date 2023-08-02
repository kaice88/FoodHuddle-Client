import { Flex } from '@mantine/core'

import ActionButton from '@/components/ActionButton'
import { SessionActionColor, SessionActions, SessionStatuses } from '@/enums'

function HostActions({ status, handleDeleteSession, handlechangeStatus }) {
  return (
    <Flex
      gap="xs"
      justify="flex-end"
      wrap="wrap">
      <ActionButton value={SessionActions.DELETE} colorName={SessionActionColor.DELETE} handleOnClick={handleDeleteSession}/>
      {
        status === SessionStatuses.OPEN
          ? (<ActionButton
            value={SessionActions.LOCK_ORDER}
            colorName={SessionActionColor.LOCK_ORDER}
            handleOnClick={() => handlechangeStatus(SessionStatuses.LOCKED)}
          />)
          : (<ActionButton
            value={SessionActions.SPLIT_PAYMENT}
            colorName={SessionActionColor.SPLIT_PAYMENT}
            handleOnClick={() => handlechangeStatus(SessionStatuses.PENDING_PAYMENTS)}
          />)
      }
    </Flex>)
}

export default HostActions
