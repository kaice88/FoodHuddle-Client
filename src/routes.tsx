import { Navigate, createBrowserRouter } from 'react-router-dom';

import LoginPage from './pages/login';
import SessionTodayPage from './pages/sessions-today';
import Layout from './layouts/layout';
import ErrorPage from './pages/error';
import { checkAuthLoader, getToken } from './utils/auth';
import Index from './pages/sessionPage';

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
]);
