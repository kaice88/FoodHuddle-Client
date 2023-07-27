import { useEffect, useState } from 'react'
import { AppShell } from '@mantine/core'
import { Outlet, useSubmit } from 'react-router-dom'

import Navbar from '../components/Navbar/Navbar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Bread from '../components/Bread'
import { getAuthToken, getTokenDuration } from '@/utils/auth'
import * as ROUTES from '@/constants/routes'

export default function Layout() {
  const [opened, setOpened] = useState(false)
  const submit = useSubmit()
  const token = getAuthToken()

  const handleOpen = (): void => {
    setOpened(o => !o)
  }

  useEffect(() => {
    if (!token)
      return

    if (token === 'EXPIRED') {
      submit(null, { action: ROUTES.LOGOUT, method: 'post' })
      return
    }
    const tokenDuration = getTokenDuration()

    const logoutTimeout = setTimeout(() => {
      submit(null, { action: ROUTES.LOGOUT, method: 'post' })
    }, tokenDuration)
    return () => {
      clearTimeout(logoutTimeout)
    }
  }, [token, submit])

  return (
    <AppShell
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
    </AppShell>
  )
}
