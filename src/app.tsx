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
            brand: ['#FFF0E6', '#FFE1CC', '#FFD3B3', '#FFC499', '#FFB580', '#FFA666', '#FF974D', '#FF8933', '#FF7A1A', '#FF6B00'],
            watermelon: ['#F6415E'],
            orange: ['#FF6B00'],
            bashfulPink: ['#C5458C'],
            darkLavender: ['#7E5498'],
            duck: ['#415481'],
            pickerBluewood: ['#2F4858'],
            green: ['#23A218'],
          },
          primaryColor: 'brand',
          primaryShade: 9,
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
