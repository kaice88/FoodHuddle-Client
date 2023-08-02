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
            brand: ['#FFF4EB', '#FFDDC4', '#FFC69D', '#FFAF76', '#FF994E', '#FF8227', '#FF6B00', '#D85B00', '#B14A00'],
            watermelon: ['#F6415E'],
            bashfulPink: ['#C5458C'],
            darkLavender: ['#F5F1F7', '#E1D6E8', '#CDBBD9', '#BA9FCA', '#A684BB', '#9268AC', '#7D5397', '#66447B', '#4F3560'],
            duck: ['#415481'],
            pickerBluewood: ['#2F4858'],
          },
          primaryColor: 'brand',
          primaryShade: 6,
        }}
      >
        <ModalsProvider >
          <Notifications position="top-right" zIndex={2077} />
          <RouterProvider router={router} />
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}
