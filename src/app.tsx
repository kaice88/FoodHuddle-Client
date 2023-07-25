import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App() {
  // Create a client
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colors: {
            orange: ['#FF6B00'],
            watermelon: ['#F6415E'],
            bashfulPink: ['#C5458C'],
            darkLavender: ['#7E5498'],
            duck: ['#415481'],
            pickerBluewood: ['#2F4858'],
          },
        }}
      >
        <Notifications></Notifications>
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  );
}
