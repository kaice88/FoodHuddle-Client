import { Avatar, Menu } from "@mantine/core"
import {IconLogout} from '@tabler/icons-react'
import UserAvatar  from "@/assets/images/Avatar.jpg"

export default function UserInfo({className}) {  
    return (
     <div className={className}>
        <div className={`${className}__name`}>
            <span className="full-name">Hi, Kim Chi Nguyen</span>
            <span className="email">kimchi.nguyen@gmail.com</span>
        </div>
        <Menu>
            <Menu.Target>
                <Avatar src={UserAvatar} radius="xl" alt="avatar" ></Avatar>
            </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<IconLogout size='1rem' />}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
      </Menu>
     </div>
    )
  }