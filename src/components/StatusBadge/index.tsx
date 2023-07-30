import React from 'react'
import { Badge } from '@mantine/core'

import type { StatusBadgeProps } from './types'

function StatusBadge({ status, colorName }: StatusBadgeProps) {
  return (
    <Badge size="lg" variant="light" styles={theme => ({
      root: {
        backgroundColor: theme.fn.lighten(theme.colors[colorName][0], 0.9),
        color: theme.colors[colorName][0],
      },
    })}>
      {status}
    </Badge>
  )
}

export default StatusBadge
