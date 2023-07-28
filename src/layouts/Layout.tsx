import { useEffect, useState } from 'react'
import { AppShell } from '@mantine/core'
import { Outlet, useNavigate } from 'react-router-dom'

import Navbar from '../components/Navbar/Navbar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Bread from '../components/Bread'
import useAuth from '@/hooks/useAuth'
import { LOGIN } from '@/constants/routes'

export default function Layout() {
  const [opened, setOpened] = useState(false)
  const { logout, isAuthenticated, getTokenDuration } = useAuth()
  const navigate = useNavigate()

  const handleOpen = (): void => {
    setOpened(o => !o)
  }

  useEffect(() => {
    if (!isAuthenticated) { navigate(LOGIN) }
    else {
      const tokenDuration = getTokenDuration()

      const logoutTimeout = setTimeout(() => {
        logout()
      }, tokenDuration)
      return () => {
        clearTimeout(logoutTimeout)
      }
    }
  }, [isAuthenticated])

  return (
    <>{isAuthenticated && <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      navbar={<Navbar opened={opened} />}
      header={<Header opened={opened} handleOpen={handleOpen} />}
      footer={<Footer />}
      styles={theme => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Bread></Bread>
      <div className="content">
        <Outlet></Outlet>
      </div>
    </AppShell>}
    </>

  )
}
