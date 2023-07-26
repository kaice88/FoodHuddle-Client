import { Navigate, createBrowserRouter } from 'react-router-dom'

import LoginPage from './pages/Login'
import SessionTodayPage from './pages/SessionsToday'
import Layout from './layouts/Layout'
import ErrorPage from './pages/Error'
import { checkAuthLoader, getToken } from './utils/auth'
import Index from './pages/SessionPage/Index'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: getToken() ? <Navigate to="/sessions-today"></Navigate> : <LoginPage></LoginPage>,
  },
  {
    path: '/',
    element: <Layout />,
    loader: checkAuthLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/sessions-today"></Navigate>,
      },
      {
        path: 'sessions-today',
        element: <SessionTodayPage></SessionTodayPage>,
      },
      {
        path: '/sessions-today/:id',
        element: <Index></Index>,
        errorElement: <ErrorPage />,
      },
      {
        path: 'sessions-history',
        element: <SessionTodayPage></SessionTodayPage>,
      },
    ],
  },
])
