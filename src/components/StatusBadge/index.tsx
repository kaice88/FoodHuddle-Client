import { Badge } from '@mantine/core'

import type { StatusBadgeProps } from './types'

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge size="xl" variant="light">
      {status}
    </Badge>
  )
}

export default StatusBadge
