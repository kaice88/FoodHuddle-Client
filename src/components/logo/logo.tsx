import FoodHuddleLogo from '@/assets/images/FoodHuddleLogo.png';
import { LogoProps } from './types';

export default function Logo({ className }: LogoProps) {
  return (
    <div className={className}>
      <img src={FoodHuddleLogo} alt="Food Huddle logo" width="100%"></img>
    </div>
  );
}
