import type { LogoProps } from './logo/types'
import FoodHuddleLogo from '@/assets/images/FoodHuddleLogo.png'

export default function Logo({ className }: LogoProps) {
  return (
    <div className={className}>
      <img src={FoodHuddleLogo} alt="Food Huddle logo" width="100%"></img>
    </div>
  )
}
