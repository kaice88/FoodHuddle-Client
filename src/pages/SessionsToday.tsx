import { Box, Button, Flex, Group, Modal, Tabs, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { IconSquarePlus } from '@tabler/icons-react'

import SessionInfo from '@/components/SessionInfo'
import SessionList from '@/components/SessionsList'
import useSessionsToday from '@/hooks/useSessionsToday'
import { SessionsTodayPageTabs } from '@/enums'
import { TABS_CONFIG } from '@/constants/sessions'

export default function SessionTodayPage() {
  const {
    isLoading,
    data: sessions,
    error,
    activeTab,
    setActiveTab,
  } = useSessionsToday(SessionsTodayPageTabs.ALL)

  const [opened, { open, close }] = useDisclosure(false)
  const titleModal = (
    <Flex justify="center" align="flex-start" direction="column">
      <Text fw={700} fz="lg">
        Create new session
      </Text>
      <div
        style={{ backgroundColor: 'orange', padding: '2px', width: '55px' }}
      ></div>
    </Flex>
  )

  return (
    <>
      <div>
        <Modal
          opened={opened}
          onClose={close}
          title={titleModal}
          centered
          size={700}
        >
          <Box maw={600} mx="auto">
            <SessionInfo />
          </Box>
        </Modal>
        <Group position="center">
          <Button
            onClick={open}
            color="orange"
            size="20px"
            leftIcon={<IconSquarePlus size="0.9rem" />}
            styles={theme => ({
              root: {
                backgroundColor: theme.fn.lighten(
                  theme.colors.darkLavender[0],
                  0.4,
                ),
                color: theme.colors.red[0],
                ...theme.fn.hover({
                  backgroundColor: theme.colors.darkLavender[0],
                }),
                padding: '10px',
              },
            })}
          >
            Open centered Modal
          </Button>
        </Group>
      </div>
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List position="center">
          {TABS_CONFIG.map(tab => (
            <Tabs.Tab key={tab.value} value={tab.value}>
              {tab.title}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        <Tabs.Panel value={activeTab} pt="xl">
          <SessionList sessionsList={sessions} />
        </Tabs.Panel>
      </Tabs>
    </>
  )
}
