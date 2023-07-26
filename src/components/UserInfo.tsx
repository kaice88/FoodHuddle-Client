import { useNavigate } from 'react-router-dom'
import { Avatar, Menu } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import useAuthStore from '@/store/authStore'

export default function UserInfo({ className }) {
  const { logout, userProfile } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }
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
          <Menu.Item icon={<IconLogout size="1rem" />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  )
}
