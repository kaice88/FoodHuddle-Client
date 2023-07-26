import { AppShell } from '@mantine/core'
import { Outlet } from 'react-router-dom'

import Navbar from '../components/Navbar/Navbar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Bread from '../components/Bread'

export default function Layout() {
  return (
    <AppShell
      padding="md"
      navbar={<Navbar />}
      header={<Header />}
      footer={<Footer />}
      styles={theme => ({
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
  )
}
