/* eslint-disable */

import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'
export const notificationShow = (type: string, title: string, message: string) => {
  const icon = type === 'error' ? <IconX size="1.1rem" /> : <IconCheck size="1.1rem" />
  const color = type === 'error' ? 'red' : 'teal'
  notifications.show({
    id: '1',
    withCloseButton: true,
    autoClose: 5000,
    title: `${title}`,
    message: `${message}`,
    color: color,
    icon: icon,
    loading: false,
  })
}
