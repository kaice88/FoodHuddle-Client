import { Link } from 'react-router-dom'
import FoodHuddleLogo from '@/assets/images/FoodHuddleLogo.png'

interface LogoProps {
  className: string
  isButton?: boolean
}

export default function Logo({ className, isButton = true }: LogoProps) {
  const logo = <img src={FoodHuddleLogo} alt="Food Huddle logo" width="100%"/>
  if (isButton)
    return <Link className={className} to="/">{logo}</Link>

  return (
    <div className={className}>
      {logo}
    </div>
  )
}
