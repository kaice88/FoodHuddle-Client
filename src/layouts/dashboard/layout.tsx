import { AppShell } from '@mantine/core'
import { Outlet } from 'react-router-dom'

import DashboardNavbar from './navbar'
import DashboardHeader from './header'
import DashboardFooter from './footer'

export default function DashboardLayout() {
  return (
    <AppShell
      padding="md"
      navbar={<DashboardNavbar />}
      header={<DashboardHeader />}
      footer={<DashboardFooter />}
      styles={theme => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <Outlet />
    </AppShell>
  )
}
