import { Navbar } from '@mantine/core';

import MainLink from '../navigation/NavigationLink';
import { options } from './options';

export default function DashboardNavbar() {
  const links = options.map((link) => <MainLink {...link} key={link.label} />);

  return (
    <Navbar p="xs" width={{ base: 250 }} className="navbar">
      <Navbar.Section grow mt="md">
        {links}
      </Navbar.Section>
    </Navbar>
  );
}
