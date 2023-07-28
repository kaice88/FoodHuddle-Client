import type { ReactElement } from 'react'
import { IconHistory, IconList } from '@tabler/icons-react'
import { ThemeIcon } from '@mantine/core'

interface Option {
  icon: ReactElement
  url: string
  label: string
}

export const options: Option[] = [
  {
    icon: (
      <ThemeIcon variant="light" radius="xs" color="pink">
        <IconList size="1rem" />
      </ThemeIcon>
    ),
    url: 'sessions-today',
    label: 'Sessions Today',
  },

  {
    icon: (
      <ThemeIcon variant="light" radius="xs" color="indigo">
        <IconHistory size="1rem" />
      </ThemeIcon>
    ),
    url: 'sessions-history',
    label: 'Sessions History',
  },
]
