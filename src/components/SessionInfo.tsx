import { Box, Flex, Group, List, Loader, Modal, Text, Title, useMantineTheme } from '@mantine/core'
import { isEmpty } from 'lodash'
import { IconDice1Filled, IconEdit, IconFileDots } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import SessionInfoModal from './ModalCreateSession'
import StatusBadge from './StatusBadge'
import ImagesUploaded from './ImagesUploaded'
import CopyClipBoard from './CopyClipboard'
import { SessionStatuseColors, SessionStatuses } from '@/enums'

function SessionInfo({ sessionData, sessionId, isHosted }) {
  const globalTheme = useMantineTheme()

  const [opened, { open, close }] = useDisclosure(false)
  const titleModal = (
    <Flex justify="center" align="flex-start" direction="column">
      <Text fw={700} fz="lg">
        Edit Session Info
      </Text>
      <div
        style={{ backgroundColor: 'orange', padding: '2px', width: '55px' }}
      ></div>
    </Flex>
  )
  const getStatusClassName = (status: SessionStatuses): string => {
    if (status === SessionStatuses.OPEN)
      return 'open'

    if (status === SessionStatuses.LOCKED)
      return 'locked'

    if (status === SessionStatuses.FINISHED)
      return 'finished'

    if (status === SessionStatuses.PENDING_PAYMENTS)
      return 'pending'
  }
  const nhap = [
    'https://images.foody.vn/res/g106/1056463/s120x120/486929a0-6fca-437f-b538-7843567b-c7219896-230510105432.jpeg',
    'https://images.foody.vn/res/g106/1056463/s120x120/486929a0-6fca-437f-b538-7843567b-c7219896-230510105432.jpeg',
    'https://images.foody.vn/res/g106/1056463/s120x120/486929a0-6fca-437f-b538-7843567b-c7219896-230510105432.jpeg',
  ]
  const getKeyByValue = (enumObj, enumValue) => Object.entries(enumObj).find(([, value]) => value === enumValue)?.[0]

  return (
    <div className="sessionInfo" >
      <Flex gap="lg" justify="flex-start" align="center" direction="row" style={{ margin: '0px 0px 20px 0px' }}>
        <Flex justify="center" align="flex-start" direction="column">
          <Title order={2}>
            {sessionData.title}
          </Title>
          <div
            style={{ backgroundColor: 'orange', padding: '2px', width: '55px' }}
          ></div>
        </Flex>
        <StatusBadge status={sessionData.status} colorName={SessionStatuseColors[getKeyByValue(SessionStatuses, sessionData.status)]} />
      </Flex>
      <Flex style={{ margin: '0px 0px 20px 0px' }} >
        <Title order={3}>
          <IconFileDots /> Session Information
        </Title>
        {isHosted && <div>
          <Modal opened={opened} onClose={close} title={titleModal} centered size={700}>
            <Box maw={600} mx="auto">
              <SessionInfoModal isCreateFirst={false} sessionData={sessionData} isEdit={true} sessionId={sessionId}/>
            </Box>
          </Modal>
          <Group position="center">
            <IconEdit onClick={open}/>
          </Group>
        </div>}
      </Flex>
      <Flex className="sessionInfo__content" style={{ margin: '0px 0px 20px 0px' }} >
        {isEmpty(sessionData) ? <Loader/> : <>
          <List icon={<IconDice1Filled size={10} style={{ color: `${globalTheme.colors.darkLavender[0]}` }} />}>
            <List.Item>
              <Text><span style={{ fontWeight: 'bold' }}>Host :</span>{' '}{sessionData?.host.name}</Text>
            </List.Item>
            <List.Item>
              <Flex gap={'sm'} direction={'row'}><span style={{ fontWeight: 'bold' }}>Link shop :</span><a href={sessionData.shopLink} target="_blank" style={{ textDecoration: 'none' }} rel="noreferrer"> Shop
              </a><CopyClipBoard text={sessionData.shopLink} /></Flex>

            </List.Item>
            <List.Item>
              <Text><span style={{ fontWeight: 'bold' }}>Date :</span>{' '}{sessionData?.date}</Text>
            </List.Item>
            <List.Item>
              <Text><span style={{ fontWeight: 'bold' }}>Description :</span>{' '}{sessionData?.description}</Text>
            </List.Item>
          </List>
          <List icon={<IconDice1Filled size={10} style={{ color: `${globalTheme.colors.darkLavender[0]}` }}/>} >
            <List.Item>
              <Text><span style={{ fontWeight: 'bold' }}>Host payment info :</span>{' '}{sessionData?.hostPaymentInfo}</Text>
            </List.Item>
          </List>
          <List icon={<IconDice1Filled size={10} style={{ color: `${globalTheme.colors.darkLavender[0]}` }}/>} >
            <List.Item>
              <Text fw={'bold'}>QR Code: </Text>
            </List.Item>
            <Flex gap="md" justify="center" align="center" direction="row" wrap="wrap">
              {/* <ImagesUploaded files={sessionData.qrImages} isHosted={isHosted}/> */}
              <ImagesUploaded files={nhap} isView={true}/>
            </Flex>
          </List>
        </>
        }
      </Flex>
    </div>
  )
}

export default SessionInfo
