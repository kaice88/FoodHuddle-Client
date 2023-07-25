import { useDisclosure } from '@mantine/hooks';
import SessionInfo from '../components/sessionInfo/modal';
import { Modal, Button, Group, Box, Text, Flex } from '@mantine/core';
import { IconCheck, IconX, IconSquarePlus } from '@tabler/icons-react';

export default function SessionTodayPage() {
  //......Modal......................................
  const [opened, { open, close }] = useDisclosure(false);
  const titleModal = (
    <Flex justify="center" align="flex-start" direction="column">
      <Text fw={700} fz="lg">
        Create new session
      </Text>
      <div style={{ backgroundColor: 'orange', padding: '2px', width: '55px' }}></div>
    </Flex>
  );
  return (
    <div>
      <Modal opened={opened} onClose={close} title={titleModal} centered size={700}>
        <Box maw={600} mx="auto">
          <SessionInfo />
        </Box>
      </Modal>
      <Group position="center">
        <Button onClick={open} color="orange" leftIcon={<IconSquarePlus size="0.9rem" />}>
          Open centered Modal
        </Button>
      </Group>
    </div>
  );
}
