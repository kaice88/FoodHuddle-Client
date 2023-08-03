import { ActionIcon, Box, Flex, List, Loader, Modal, Text, Title, useMantineTheme } from '@mantine/core'
import { isEmpty } from 'lodash'
import { IconDice1Filled, IconEdit, IconFileDots } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import { useNavigate } from 'react-router-dom'
import SessionInfoModal from './ModalCreateSession'
import StatusBadge from './StatusBadge'
import ImagesUploaded from './ImagesUploaded'
import CopyClipBoard from './CopyClipboard'
import { notificationShow } from './Notification'
import { SessionStatusColors, SessionStatuses } from '@/enums'
import HostActions from '@/pages/SessionPage/Components/HostActions'
import useSession from '@/hooks/useSession'
import useSessionInfo from '@/hooks/useSessionInfo'

function SessionInfo({ sessionData, sessionId, isHosted }) {
  const globalTheme = useMantineTheme()
  const navigate = useNavigate()
  const { deleteSession, changeStatus } = useSession(sessionId)
  const { fetchSessionInfo } = useSessionInfo(sessionId)

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
  const handleDeleteSession = () => {
    deleteSession((data) => {
      notificationShow('success', 'SUCCESS', data.data.message)
      navigate('/sessions-today')
    })
  }

  const handlechangeStatus = (status) => {
    changeStatus(status, (data) => {
      notificationShow('success', 'SUCCESS', data.data.message)
      fetchSessionInfo.refetch()
    })
  }
  const getKeyByValue = (enumObj, enumValue) => Object.entries(enumObj).find(([, value]) => value === enumValue)?.[0]

  return (
    <div className="sessionInfo" >

      <Flex gap="lg" justify="flex-start" align="center" direction="row" style={{ margin: '0px 0px 20px 0px' }} wrap={'wrap'}>
        <Flex justify="center" align="flex-start" direction="column" >
          <Title order={2}>
            {sessionData.title}
          </Title>
          <div
            style={{ backgroundColor: 'orange', padding: '2px', width: '55px' }}
          ></div>
        </Flex>
        <StatusBadge status={sessionData.status} colorName={SessionStatusColors[getKeyByValue(SessionStatuses, sessionData.status)]} />
      </Flex>
      {isHosted && <HostActions status={sessionData.status} handleDeleteSession={handleDeleteSession} handlechangeStatus={handlechangeStatus} ></HostActions>}
      <Flex style={{ margin: '0px 0px 20px 0px' }} >
        <Title order={3}>
          <IconFileDots /> Session Information
        </Title>
        {(isHosted && sessionData.status !== SessionStatuses.PENDING_PAYMENTS && sessionData.status !== SessionStatuses.FINISHED) && <div>
          <Modal opened={opened} onClose={close} title={titleModal} centered size={700}>
            <Box maw={600} mx="auto">
              <SessionInfoModal isCreateFirst={false} sessionData={sessionData} isEdit={true} sessionId={sessionId} close={close} />
            </Box>
          </Modal>
          <ActionIcon>
            <IconEdit onClick={open}/>
          </ActionIcon>
        </div>}
      </Flex>
      <Flex className="sessionInfo__content" style={{ margin: '0px 0px 20px 0px' }} >
        {isEmpty(sessionData)
          ? <Loader/>
          : <>
            <List icon={<IconDice1Filled size={10} style={{ color: `${globalTheme.colors.darkLavender[6]}` }} />}>
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
            <List icon={<IconDice1Filled size={10} style={{ color: `${globalTheme.colors.darkLavender[6]}` }}/>} >
              <List.Item>
                <Text><span style={{ fontWeight: 'bold' }}>Host payment info :</span>{' '}{sessionData?.hostPaymentInfo}</Text>
              </List.Item>
            </List>
            <List icon={<IconDice1Filled size={10} style={{ color: `${globalTheme.colors.darkLavender[6]}` }}/>} >
              <List.Item>
                <Text fw={'bold'}>QR Code: </Text>
              </List.Item>
              <Flex gap="md" justify="center" align="center" direction="row" wrap="wrap">
                <ImagesUploaded files={sessionData.qrImages} isView={true}/>
              </Flex>
            </List>
          </>
        }
      </Flex>
    </div>
  )
}

export default SessionInfo
