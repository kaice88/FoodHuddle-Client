import Button from '@/components/button/button';
import FeeInfo from '@/components/fee-info/fee-info';

export default function SessionTodayPage() {
  const status = 'OPEN';
  return (
    <div>
      {status === 'OPEN' ? (
        <Button value="lock order" colorName="orange"></Button>
      ) : (
        <Button value="split payment" colorName="watermelon"></Button>
      )}
      <Button value="finish" colorName="bashfulPink"></Button>
      Sessions Today
      <FeeInfo></FeeInfo>
    </div>
  );
}
