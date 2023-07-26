import { Header } from '@mantine/core'

import Logo from './Logo'
import UserInfo from './UserInfo'

export default function DashboardHeader() {
  return (
    <Header height={60} className="header">
      <Logo className="header__logo"></Logo>
      <UserInfo className="header__user-info"></UserInfo>
    </Header>
  )
}
