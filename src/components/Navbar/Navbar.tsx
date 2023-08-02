import { Navbar } from '@mantine/core'

import MainLink from '../NavigationLink'
import { options } from './Options'

export default function DashboardNavbar({ opened }) {
  const links = options.map(link => <MainLink {...link} key={link.label} />)

  return (
    <Navbar
      hidden={!opened}
      p="sm"
      hiddenBreakpoint="sm"
      width={{ sm: 200 }}
      className="navbar"
    >
      <Navbar.Section grow mt="md">
        {links}
      </Navbar.Section>
    </Navbar>
  )
}
