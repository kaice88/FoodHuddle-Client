import FoodHuddleLogo from '@/assets/images/FoodHuddleLogo.png'

export default function Logo({ className }) {
  return (
    <div className={className}>
      <img src={FoodHuddleLogo} alt="Food Huddle logo" width="100%"></img>
    </div>
  )
}
