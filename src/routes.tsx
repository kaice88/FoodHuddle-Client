import {Navigate, createBrowserRouter } from 'react-router-dom'

import LoginPage from './pages/login'
import SessionTodayPage from './pages/session-today'
import Layout from './layouts/layout'
import ErrorPage from './pages/error'

const isAuthenticated = false
export const router = createBrowserRouter([
  {
    path: '/login',
    element: isAuthenticated ? <Navigate to="/"></Navigate> : <LoginPage></LoginPage>,
  },
  {
    path: '/',
    element: isAuthenticated ? <Layout /> : <Navigate to="/login"></Navigate>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/sessions-today"></Navigate>,
      },
      {
        path: 'sessions-today',
        element: <SessionTodayPage></SessionTodayPage> ,
        children: [{
          path: ':id',
          element: <SessionTodayPage></SessionTodayPage> ,
        }]
      },
      {
        path: 'sessions-history',
        element: <SessionTodayPage></SessionTodayPage> ,
      }
    ],
  },
])
