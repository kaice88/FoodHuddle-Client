import { Form } from 'react-router-dom';
import { Avatar, Menu } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';

import { UserInfoProps } from './types';
import * as ROUTES from '@/constants/routes';
import useAuthStore from '@/store/authStore';

export default function UserInfo({ className }: UserInfoProps) {
  const { userProfile } = useAuthStore();
  return (
    <div className={className}>
      <div className={`${className}__name`}>
        <span className="full-name">{userProfile.name}</span>
        <span className="email">{userProfile.email}</span>
      </div>
      <Menu>
        <Menu.Target>
          <Avatar src={userProfile.photo} radius="xl" alt="avatar"></Avatar>
        </Menu.Target>
        <Menu.Dropdown>
          <Form action={ROUTES.LOGOUT} method="post">
            <Menu.Item icon={<IconLogout size="1rem" />} type="submit">
              Logout
            </Menu.Item>
          </Form>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
