import { Navigate, createBrowserRouter } from 'react-router-dom';

import LoginPage from './pages/login';
import SessionTodayPage from './pages/session-today';
import Layout from './layouts/layout';
import { LogoutAction } from './pages/logout';
import ErrorPage from './pages/error';
import { checkAuthLoader, getAuthToken } from './utils/auth';
import * as ROUTES from '@/constants/routes';

export const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: getAuthToken() ? (
      <Navigate to={ROUTES.SESSIONS_TODAY}></Navigate>
    ) : (
      <LoginPage></LoginPage>
    ),
  },
  {
    path: ROUTES.LOGOUT,
    element: <Navigate to={ROUTES.LOGIN}></Navigate>,
    action: LogoutAction,
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
        path: ROUTES.SESSIONS_HISTORY,
        element: <SessionTodayPage></SessionTodayPage>,
      },
    ],
  },
]);
