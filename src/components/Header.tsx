import { Header, MediaQuery, Burger } from "@mantine/core"

import Logo from "./Logo"
import UserInfo from "./UserInfo"

export default function HomeHeader({ opened, handleOpen }) {
  return (
    <Header height={{ base: 50, md: 70 }} p="xs" className="header">
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Burger opened={opened} onClick={handleOpen} size="sm" mr="xl" />
      </MediaQuery>
      <Logo className="header__logo"></Logo>
      <UserInfo className="header__user-info"></UserInfo>
    </Header>
  )
}
