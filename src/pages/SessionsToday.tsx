import { Box, Button, Flex, Group, Loader, Modal, Tabs, Text } from '@mantine/core'

import { useDisclosure } from '@mantine/hooks'
import { IconSquarePlus } from '@tabler/icons-react'
import SessionInfo from '../components/Modal'
import { TABS_CONFIG } from '@/constants/sessions'
import SessionList from '@/components/SessionsList'
import { useSessionData, useSessionStore } from '@/store/sessionsStore'

export default function SessionTodayPage() {
  const [activeTab, setActiveTab] = useSessionStore(state => [
    state.activeTab,
    state.setActiveTab,
  ])

  const { data: sessions, isLoading } = useSessionData(activeTab)

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
            Create New Session
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
          {isLoading
            ? (
              <Loader className="loader" />
              )
            : (
              <SessionList sessionsList={sessions} />
              )}
        </Tabs.Panel>
      </Tabs>
    </>
  )
}