import { MantineProvider } from '@mantine/core'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { QueryClient, QueryClientProvider,} from 'react-query'

export default function App() {
  // Create a client
  // const queryClient = new QueryClient()
  return (
    // <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS  >
        <RouterProvider router={router} />
      </MantineProvider>
    // </QueryClientProvider>
  )
}
