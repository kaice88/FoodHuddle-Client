import { useClipboard } from '@mantine/hooks'
import { IconCheck, IconLink } from '@tabler/icons-react'
import { ActionIcon } from '@mantine/core'

function CopyClipBoard({ text }: { text: string }) {
  const clipboard = useClipboard({ timeout: 500 })

  return (
    <ActionIcon
      size="xs"
      onClick={() => clipboard.copy(text)}
    >
      {clipboard.copied
        ? (
          <IconCheck size="1.5rem" />
        )
        : (
          <IconLink size="1.2rem" />
        )}
    </ActionIcon>
  )
}

export default CopyClipBoard
