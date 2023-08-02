import { Box, Button, Card, Center, Flex, Group, Image, Text, ThemeIcon, rem } from '@mantine/core'
import { IconUsers } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import type { SessionData } from '@/types/sessions'
import CopyClipBoard from '@/components/CopyClipboard'

interface SessionCardProps {
  session: SessionData
}

function SessionCard({ session }: SessionCardProps) {
  const navigate = useNavigate()
  const mockShopImage = 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  const { id, title, host, status, shopImage, numberOfJoiners } = session

  const sessionURL = `${window.location.origin}/sessions/${id}`
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section component="a" href={sessionURL}>
        <Image
          fit="cover"
          src={shopImage || mockShopImage}
          height={160}
          alt={title}
        />
      </Card.Section>
      <Flex direction="column" justify="space-between">
        <Group position="apart" mt="md" mb="xs">
          <Box maw={rem('60%')}>  <Text truncate weight={500}>{title}</Text></Box>
          {/* {<StatusBadge status={status}/>} */}
        </Group>

        <Group position="apart" mt="md" mb="xs">
          <Text size="sm" color="dimmed">
            {host}
          </Text>
          <Flex align="center" justify="center" gap={4}>
            <CopyClipBoard text={sessionURL}/>
            <Center>
              <ThemeIcon color="brand" size={'xs'}>
                <IconUsers/>
              </ThemeIcon>
            </Center>
            {numberOfJoiners}
          </Flex>
        </Group>

        <Button variant="light" fullWidth mt="md" radius="md" onClick={() => {
          navigate(`/sessions/${id}`)
        }}>
       JOIN NOW!
        </Button>
      </Flex>
    </Card>
  )
}

export default SessionCard
