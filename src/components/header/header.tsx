import { Header } from '@mantine/core';

import Logo from '../logo/logo';
import UserInfo from '../user-info/user-info';

export default function DashboardHeader() {
  return (
    <Header height={60} className="header">
      <Logo className="header__logo"></Logo>
      <UserInfo className="header__user-info"></UserInfo>
    </Header>
  );
}
