import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ModalsProvider } from '@mantine/modals'
import { router } from './routes'

export default function App() {
  // Create a client
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colors: {
            brand: ['#fff4eb', '#ffddc4', '#ffc69d', '#ffaf76', '#ff994e', '#ff8227', '#ff6b00', '#d85b00', '#b14a00'],
            watermelon: ['#F6415E'],
            bashfulPink: ['#C5458C'],
            darkLavender: ['#f5f1f7', '#e1d6e8', '#cdbbd9', '#ba9fca', '#a684bb', '#9268ac', '#7d5397', '#66447b', '#4f3560'],
            duck: ['#415481'],
            pickerBluewood: ['#2F4858'],
          },
          primaryColor: 'brand',
          primaryShade: 6,
        }}
      >
        {' '}
        <ModalsProvider>
          <Notifications position="top-right" zIndex={2077} />
          <RouterProvider router={router} />
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}
