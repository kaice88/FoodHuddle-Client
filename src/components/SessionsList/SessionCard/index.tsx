import { Box, Card, Center, Flex, Group, Image, Text, ThemeIcon, rem } from '@mantine/core'
import { IconUsers } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import StatusBadge from '../../StatusBadge'
import type { SessionData } from '@/types/sessions'
import { getSessionStatusColor } from '@/utils/sessions'

interface SessionCardProps {
  session: SessionData
}

function SessionCard({ session }: SessionCardProps) {
  const navigate = useNavigate()
  const mockShopImage = 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  const { id, title, host, status, shopImage, numberOfJoiners } = session

  return (
    <Card className="sessionCard" onClick={() => { navigate(`/sessions/${id}`) }} shadow="sm" padding="lg" radius="md" withBorder mih={200}>
      <Card.Section >
        <Image
          fit="cover"
          src={shopImage || mockShopImage}
          height={160}
          alt={title}
        />
      </Card.Section>
      <Flex mt={16} align="center" justify="space-between">
        <Box miw={rem('40%')}>
          <Text color="brand" size="lg" truncate weight={500}>{title}</Text>
        </Box>
        <StatusBadge sx={{ flexShrink: 0 }} size="md" status={status} colorName={getSessionStatusColor(status)}/>
      </Flex>

      <Group position="apart" mt="md" mb="xs">
        <Text size="xs" color="dimmed">
          {host}
        </Text>
        <Flex align="center" justify="center" gap={4}>
          <Center>
            <ThemeIcon variant="outlined" color="dark" size={'xs'}>
              <IconUsers/>
            </ThemeIcon>
          </Center>
          <Text color="brand" size="md" fw={600}>
            {numberOfJoiners}
          </Text>
        </Flex>
      </Group>
    </Card>
  )
}

export default SessionCard
