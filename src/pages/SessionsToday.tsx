import { useEffect } from "react";
import { Loader, Tabs } from "@mantine/core";

import { TABS_CONFIG } from "@/constants/sessions";

import { useDisclosure } from "@mantine/hooks";
import { Box, Button, Flex, Group, Modal, Text } from "@mantine/core";
import { IconSquarePlus } from "@tabler/icons-react";
import SessionInfo from "../components/Modal";
import SessionList from "@/components/SessionsList";
import { useSessionStore } from "@/store/sessionsStore";
const fakeSessionInfoArray = [
  {
    id: 1,
    title: "Yoga Class",
    host: "John Doe",
    status: "OPEN",
    number_of_joiners: 10,
    created_at: "2023-07-25T12:00:00Z",
  },
  {
    id: 2,
    title: "Cooking Workshop",
    host: "Jane Smith",
    status: "LOCKED",
    number_of_joiners: 5,
    created_at: "2023-07-24T18:30:00Z",
  },
  {
    id: 3,
    title: "Painting Session",
    host: "Alice Johnson",
    status: "PENDING PAYMENTS",
    number_of_joiners: 3,
    created_at: "2023-07-23T14:15:00Z",
  },
  {
    id: 4,
    title: "Guitar Jam",
    host: "Bob Williams",
    status: "FINISHED",
    number_of_joiners: 15,
    created_at: "2023-07-22T09:00:00Z",
  },
  {
    id: 5,
    title: "Dance Party",
    host: "Emily Brown",
    status: "OPEN",
    number_of_joiners: 20,
    created_at: "2023-07-21T20:45:00Z",
  },
];

export default function SessionTodayPage() {
  const [activeTab, setActiveTab] = useSessionStore((state) => [
    state.activeTab,
    state.setActiveTab,
  ]);

  const [sessions, setSessions, isLoading] = useSessionStore((state) => [
    state.sessions,
    state.setSessions,
    state.isLoading,
  ]);

  const [opened, { open, close }] = useDisclosure(false);
  const titleModal = (
    <Flex justify="center" align="flex-start" direction="column">
      <Text fw={700} fz="lg">
        Create new session
      </Text>
      <div
        style={{ backgroundColor: "orange", padding: "2px", width: "55px" }}
      ></div>
    </Flex>
  );

  useEffect(() => {
    setSessions(activeTab);
  }, [activeTab]);

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
            styles={(theme) => ({
              root: {
                backgroundColor: theme.fn.lighten(
                  theme.colors.darkLavender[0],
                  0.4
                ),
                color: theme.colors.red[0],
                ...theme.fn.hover({
                  backgroundColor: theme.colors.darkLavender[0],
                }),
                padding: "10px",
              },
            })}
          >
            Open centered Modal
          </Button>
        </Group>
      </div>
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List position="center">
          {TABS_CONFIG.map((tab) => (
            <Tabs.Tab key={tab.value} value={tab.value}>
              {tab.title}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        <Tabs.Panel value={activeTab} pt="xl">
          {isLoading ? (
            <Loader className="loader" />
          ) : (
            <SessionList sessionsList={fakeSessionInfoArray} />
          )}
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
