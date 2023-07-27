import { Button } from '@mantine/core'

export default function ActionButton({ colorName, value, onClick, disabled}) {
  //   const [status, setStatus] = useState({});

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
      onClick={onClick}
      disabled={disabled}
    >
      {value.toUpperCase()}
    </Button>
  )
}
