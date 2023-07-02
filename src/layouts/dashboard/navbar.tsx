import { Navbar } from '@mantine/core'
import { IconSettings } from '@tabler/icons-react'

import MainLink from './navbar/NavigationLink'

const data = [
  { icon: <IconSettings size="1rem" />, url: '/settings', label: 'Settings' },
]

export default function DashboardNavbar() {
  const links = data.map(link => <MainLink {...link} key={link.label} />)

  return (
    <Navbar p="xs" width={{ base: 300 }}>
      <Navbar.Section>{/* Header with logo */}</Navbar.Section>
      <Navbar.Section grow mt="md">
        {links}
      </Navbar.Section>
      <Navbar.Section>{/* Footer with user */}</Navbar.Section>
    </Navbar>
  )
}
