import { Navigate, createBrowserRouter } from 'react-router-dom'

import LoginPage from './pages/Login'
import SessionTodayPage from './pages/SessionsToday'
import Layout from './layouts/Layout'
import ErrorPage from './pages/Error'
import SessionPage from './pages/SessionPage'
import SessionsHistory from './pages/SessionsHistory'
import * as ROUTES from './constants/routes'

export const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.HOME,
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.SESSIONS_TODAY}/>,
      },
      {
        path: ROUTES.SESSIONS_TODAY,
        element: <SessionTodayPage />,
      },
      {
        path: ROUTES.SESSION_DETAIL,
        element: <SessionPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: ROUTES.SESSIONS_HISTORY,
        element: <SessionsHistory />,
      },
    ],
  },
])
