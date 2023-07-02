import { MantineProvider, Text } from '@mantine/core'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes'

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <RouterProvider router={router} />
      <Text>Welcome to Mantine!</Text>
    </MantineProvider>
  )
}
