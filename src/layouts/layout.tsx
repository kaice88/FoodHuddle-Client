import { useEffect } from 'react';
import { AppShell } from '@mantine/core';
import { Outlet, useSubmit } from 'react-router-dom';

import Navbar from '../components/navbar/navbar';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Bread from '../components/bread/bread';
import { getAuthToken, getTokenDuration } from '@/utils/auth';
import * as ROUTES from '@/constants/routes';

export default function Layout() {
  const submit = useSubmit();
  const token = getAuthToken();

  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === 'EXPIRED') {
      submit(null, { action: ROUTES.LOGOUT, method: 'post' });
      return;
    }
    const tokenDuration = getTokenDuration();

    const logoutTimeout = setTimeout(() => {
      submit(null, { action: ROUTES.LOGOUT, method: 'post' });
    }, tokenDuration);
    return () => {
      clearTimeout(logoutTimeout);
    };
  }, [token]);

  return (
    <AppShell
      padding="md"
      navbar={<Navbar />}
      header={<Header />}
      footer={<Footer />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <Bread></Bread>
      <div className="content">
        <Outlet></Outlet>
      </div>
    </AppShell>
  );
}
