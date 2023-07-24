import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/navbar/navbar';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Bread from '../components/bread/bread';

export default function Layout() {
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
