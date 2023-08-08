import { Badge } from '@mantine/core'

import type { StatusBadgeProps } from './types'

function StatusBadge({ status, colorName, ...restProps }: StatusBadgeProps) {
  return (
    <Badge {...restProps }variant="light" styles={theme => ({
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
