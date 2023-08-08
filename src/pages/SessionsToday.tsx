import { Box, Button, Flex, Group, Modal, Tabs, Text, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconSquarePlus } from '@tabler/icons-react'
import { useEffect } from 'react'

import useSessionsToday from '../hooks/useSessionsToday'
import { SessionsTodayPageTabs } from '../enums'
import SessionInfoModal from '../components/ModalCreateSession'
import SessionList from '../components/SessionsList'
import { TABS_CONFIG } from '../constants/sessions'
import useSessionInfoStore from '@/store/sessionInfoStore'

export default function SessionTodayPage() {
  const globalTheme = useMantineTheme()

  const {
    data: sessions,
    activeTab,
    setActiveTab,
  } = useSessionsToday(SessionsTodayPageTabs.ALL)

  const { setSessionInfoData } = useSessionInfoStore()
  useEffect(() => {
    setSessionInfoData({})
  }, [])

  const [opened, { open, close }] = useDisclosure(false)
  const titleModal = (
    <Flex justify="center" align="flex-start" direction="column">
      <Text fw={700} fz="lg">
        Create new session
      </Text>
      <div
        style={{ backgroundColor: globalTheme.colors.brand[9], padding: '2px', width: '55px' }}
      ></div>
    </Flex>
  )

  return (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Modal
          opened={opened}
          onClose={close}
          title={titleModal}
          centered
          size={700}
        >
          <Box maw={600} mx="auto">
            <SessionInfoModal isCreateFirst={true}/>
          </Box>
        </Modal>
        <Group position="center">
          <Button
            onClick={open}
            size="16px"
            leftIcon={<IconSquarePlus size="16px" />}
            styles={theme => ({
              root: {
                backgroundColor: theme.fn.lighten(
                  theme.colors.darkLavender[0],
                  0.4,
                ),
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
          <SessionList sessionsList={sessions} />
        </Tabs.Panel>
      </Tabs>
    </>
  )
}
