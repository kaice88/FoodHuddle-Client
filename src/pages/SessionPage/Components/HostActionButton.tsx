import { Button, Text } from '@mantine/core'
import { modals } from '@mantine/modals'

export default function HostActionButton({ value, handleOnClick, variant = 'filled' }) {
  const openModal = () => modals.openConfirmModal({
    title: 'CONFIRM',
    children: (
      <Text size="sm" color="gray">
        <span>{`If you ${value} this session, you can't undo this.`}</span>
        <br></br>
        <span>{`Are you sure ${value} this session?`}</span>
      </Text>
    ),
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    confirmProps: { color: 'red' },
    onConfirm: handleOnClick,
  })
  return (
    <Button onClick={openModal} variant={variant}>{value}</Button>
  )
}
