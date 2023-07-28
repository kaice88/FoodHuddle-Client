import { Flex } from '@mantine/core'

import ActionButton from '@/components/ActionButton'
import { SessionActions, SessionStatuses } from '@/enums'

const HostActions = ({ status, handleDeleteSession, handlechangeStatus }) => {
  return (
    <Flex
      gap="xs"
      justify="flex-end"
      wrap="wrap">
      <ActionButton value={SessionActions.DELETE} colorName="orange" handleOnClick={handleDeleteSession} ></ActionButton>
      {
        status === SessionStatuses.OPEN
          ? (<ActionButton
            value={SessionActions.LOCK_ORDER}
            colorName="bashfulPink"
            handleOnClick={() => handlechangeStatus(SessionStatuses.LOCKED)}
          />)
          : (<ActionButton
            value={SessionActions.SPLIT_PAYMENT}
            colorName="watermelon"
            handleOnClick={() => handlechangeStatus(SessionStatuses.PENDING_PAYMENTS)}
          />)
      }
    </Flex>)
}

export default HostActions
