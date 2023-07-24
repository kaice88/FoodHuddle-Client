import { Navigate, createBrowserRouter } from 'react-router-dom';

import LoginPage from './pages/login';
import SessionTodayPage from './pages/session-today';
import Layout from './layouts/layout';
import ErrorPage from './pages/error';
import { checkAuthLoader, getToken } from './utils/auth';

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
        path: 'sessions-history',
        element: <SessionTodayPage></SessionTodayPage>,
      },
    ],
  },
]);
