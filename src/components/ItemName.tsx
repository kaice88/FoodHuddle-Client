import { Avatar, Flex, Text, useMantineTheme } from '@mantine/core'

const ItemName = ({ name, picture }) => {
  const globalTheme = useMantineTheme()

  return (
    <Flex gap="sm" justify="flex-start" align="center" direction="row" >
      <Avatar src={picture} alt={name} radius="xl" size={35}/>
      <Text color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.3)} style={{ width: 'fix-content' }} >
        {name}
      </Text>
    </Flex>)
}

export default ItemName
