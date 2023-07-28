import { Navigate, createBrowserRouter } from 'react-router-dom'

import LoginPage from './pages/Login'
import SessionTodayPage from './pages/SessionsToday'
import Layout from './layouts/Layout'
import ErrorPage from './pages/Error'
import Index from './pages/SessionPage/Index'
import * as ROUTES from '@/constants/routes'

export const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <LoginPage></LoginPage>,
  },
  {
    path: ROUTES.HOME,
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.SESSIONS_TODAY}></Navigate>,
      },
      {
        path: ROUTES.SESSIONS_TODAY,
        element: <SessionTodayPage></SessionTodayPage>,
      },
      {
        path: '/sessions-today/:id',
        element: <Index></Index>,
        errorElement: <ErrorPage />,
      },
      {
        path: ROUTES.SESSIONS_HISTORY,
        element: <SessionTodayPage></SessionTodayPage>,
      },
    ],
  },
])
