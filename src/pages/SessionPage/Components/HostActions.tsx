import { Flex } from '@mantine/core'

import ActionButton from '@/components/ActionButton'
import { SessionStatuses } from '@/enums'

const HostActions = ({ status, handleDeleteSession, handlechangeStatus }) => {
  return (
    <Flex
      gap="xs"
      justify="flex-end"
      wrap="wrap">
      <ActionButton value="delete" colorName="orange" onClick={handleDeleteSession} disabled={false}></ActionButton>
      {
        status === 'OPEN'
          ? (<ActionButton
            value="lock order"
            colorName="bashfulPink"
            onClick={() => handlechangeStatus(SessionStatuses.LOCKED)}
          />)
          : (<ActionButton
            value="split payment"
            colorName="watermelon"
            onClick={() => handlechangeStatus(SessionStatuses.PENDING_PAYMENTS)}
            disabled={false}
          />)
      }
    </Flex>)
}

export default HostActions
