import { Button, Text } from '@mantine/core'
import { modals } from '@mantine/modals'

export default function ActionButton({ colorName, value, handleOnClick, size, disabled }) {
  const openModal = () => modals.openConfirmModal({
    title: 'CONFIRM',
    children: (
      <Text size="sm" color="gray">
        <span>{`If you ${value} this payment request, you can't undo this.`}</span>
        <br></br>
        <span>{`Are you sure ${value} this payment request?`}</span>
      </Text>
    ),
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    confirmProps: { color: 'red' },
    onConfirm: handleOnClick,
  })
  return (
    <Button
      styles={(theme: any) => ({
        root: {
          backgroundColor: theme.fn.lighten(theme.colors[colorName][0], 0.9),
          color: theme.colors[colorName][0],
          ...theme.fn.hover({
            backgroundColor: theme.fn.lighten(theme.colors[colorName][0], 0.8),
          }),
        },
      })}
      onClick={openModal}
      size={size}
      disabled={disabled}
    >
      {value}
    </Button>
  )
}
