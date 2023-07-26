import { Navigate, createBrowserRouter } from 'react-router-dom'

import LoginPage from './pages/Login'
import SessionTodayPage from './pages/SessionsToday'
import Layout from './layouts/Layout'
import ErrorPage from './pages/Error'
import { checkAuthLoader, getAuthToken } from './utils/auth'

import SessionPage from './pages/SessionPage'
import * as ROUTES from '@/constants/routes'

export const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: getAuthToken()
      ? (
        <Navigate to={ROUTES.SESSIONS_TODAY}></Navigate>
        )
      : (
        <LoginPage></LoginPage>
        ),
  },
  {
    path: ROUTES.HOME,
    element: <Layout />,
    loader: checkAuthLoader,
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
        path: ROUTES.SESSION_DETAIL,
        element: <SessionPage></SessionPage>,
        errorElement: <ErrorPage />,
      },
      {
        path: ROUTES.SESSIONS_HISTORY,
        element: <SessionTodayPage></SessionTodayPage>,
      },
    ],
  },
])
