import { notifications } from '@mantine/notifications'
import { Button } from '@mantine/core'
import axios from '@/settings/axios'
import { useRequestProcessor } from '@/settings/react-query'

export default function ActionButton({ colorName, value }) {
  //   const [status, setStatus] = useState({});

  const { mutation } = useRequestProcessor()

  const statusMutation = mutation(
    'userProfile',
    () => {
      return axios.post('/v1/auth')
    },
    {
      onError: (error) => {
        showNoti(error.message)
      },
      onSuccess: (data) => {
        showNoti('Success')
      },
    },
  )

  const showNoti = (message) => {
    notifications.show({
      title: 'Default notification',
      message,
    })
  }

  const handleLockOrder = (status) => {
    statusMutation.mutate({ status })
  }

  return (
    <Button
      styles={(theme: any) => ({
        root: {
          backgroundColor: theme.fn.lighten(theme.colors[colorName][0], 0.9),
          color: theme.colors[colorName][0],
          ...theme.fn.hover({
            backgroundColor: theme.fn.lighten(theme.colors[colorName][0], 0.8),
          }),
        },
      })}
      onClick={handleLockOrder}
    >
      {value.toUpperCase()}
    </Button>
  )
}
