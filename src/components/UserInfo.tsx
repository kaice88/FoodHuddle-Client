import { Avatar, Menu } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'

import useAuth from '@/hooks/useAuth'

export default function UserInfo({ className }) {
  const { logout, userProfile } = useAuth()

  const handleLogout = () => {
    logout()
  }
  return (
    <div className={className}>
      <div className={`${className}__name`}>
        <span className="full-name">{userProfile.name}</span>
        <span className="email">{userProfile.email}</span>
      </div>
      <Menu>
        <Menu.Target>
          <Avatar src={userProfile.photo} radius="xl" alt="avatar" style={{ cursor: 'pointer' }}></Avatar>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<IconLogout size="1rem" />} onClick={handleLogout}>
              Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  )
}
