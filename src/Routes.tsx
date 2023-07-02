import { createBrowserRouter } from 'react-router-dom'

import LoginPage from './pages/login'
import HomePage from './pages/home'
import SettingsPage from './pages/settings'
import DashboardLayout from './layouts/dashboard/layout'
import DashboardErrorPage from './layouts/dashboard/error-page'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <DashboardLayout />,
    errorElement: <DashboardErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
])
