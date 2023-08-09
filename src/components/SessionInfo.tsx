import { ActionIcon, Box, Flex, Group, Image, List, Loader, Modal, Text, Title, Tooltip, useMantineTheme } from '@mantine/core'
import isEmpty from 'lodash/isEmpty'
import { IconAlertCircle, IconArrowLeft, IconEdit, IconFileDots } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel'
import { useNavigate } from 'react-router-dom'

import SessionInfoModal from './ModalCreateSession'
import StatusBadge from './StatusBadge'
import { notificationShow } from './Notification'
import { SessionStatuses } from '@/enums'
import HostActions from '@/pages/SessionPage/Components/HostActions'
import useSession from '@/hooks/useSession'
import useSessionInfo from '@/hooks/useSessionInfo'
import { getSessionStatusColor } from '@/utils/sessions'

function SessionInfo({ sessionData, sessionId, isHosted, location = '/sessions-today' }) {
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
        style={{ backgroundColor: globalTheme.colors.brand[9], padding: '2px', width: '55px' }}
      ></div>
    </Flex>
  )

  const TRANSITION_DURATION = 200
  const [openedModalImage, setOpenedModalImage] = useState(false)
  const [embla, setEmbla] = useState<Embla | null>(null)
  useAnimationOffsetEffect(embla, TRANSITION_DURATION)
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

  return (
    <div className="sessionInfo" >

      <Flex gap="lg" justify="flex-start" align="center" direction="row" style={{ margin: '0px 0px 20px 0px' }} wrap={'wrap'}>
        <IconArrowLeft className="sessionInfo__back-icon" size="1.8rem" onClick={() => { navigate(location) }}></IconArrowLeft>
        <Flex justify="center" align="flex-start" direction="column" >
          <Title order={2}>
            {sessionData.title}
          </Title>
          <div
            style={{ backgroundColor: globalTheme.colors.brand[9], padding: '2px', width: '55px' }}
          ></div>
        </Flex>
        <StatusBadge status={sessionData.status} colorName={getSessionStatusColor(sessionData.status)} />
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
      <Flex className="sessionInfo__content" >
        {isEmpty(sessionData)
          ? <Loader/>
          : <>
            <Image
              className="sessionInfo__content__image"
              src={sessionData.shopImage}
              alt={sessionData.shopName}
            />
            <List>
              <List.Item>
                <Text><span style={{ fontWeight: 'bold' }}>Host :</span>{' '}{sessionData?.host.name}</Text>
              </List.Item>
              <List.Item>
                <Text><span style={{ fontWeight: 'bold' }}>Link shop :</span><a href={sessionData.shopLink} target="_blank" style={{ textDecoration: 'none' }} rel="noreferrer"> {sessionData.shopName}
                </a></Text>
              </List.Item>
              <List.Item>
                <Text><span style={{ fontWeight: 'bold' }}>Date :</span>{' '}{sessionData?.date}</Text>
              </List.Item>
              <List.Item>
                <Text><span style={{ fontWeight: 'bold' }}>Description :</span>{' '}{sessionData?.description}</Text>
              </List.Item>
              <List.Item>
                <Text><span style={{ fontWeight: 'bold' }}>Host payment info :</span>{' '}{sessionData?.hostPaymentInfo}</Text>
              </List.Item>
              <List.Item>
                <Flex gap={'sm'} direction={'row'} align={'center'}>
                  <Text fw={'bold'}>QR Code: {' '}<Tooltip
                    label="Joiners can make payments with the host's QR code"
                    styles={theme => ({
                      tooltip: {
                        color: 'white',
                        fontWeight: '300',
                        backgroundColor: theme.colors.orange[0],
                      },
                    })}
                    withArrow
                  >
                    <IconAlertCircle size={15} />
                  </Tooltip></Text>
                  <Group position="center">
                    { !isEmpty(sessionData.qrImages) ? <Text onClick={() => setOpenedModalImage(true)} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Show</Text> : 'No' }
                  </Group>
                  <Modal
                    opened={openedModalImage}
                    padding={0}
                    transitionProps={{ duration: TRANSITION_DURATION }}
                    withCloseButton={false}
                    onClose={() => setOpenedModalImage(false)}
                    centered
                  >
                    <Carousel getEmblaApi={setEmbla} slideGap="150px" slideSize="70%" >
                      {
                        sessionData.qrImages.map((image, index) => {
                          return (
                            <Carousel.Slide key={index}>
                              <img
                                src={image}
                                alt="Cat"
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                              />
                            </Carousel.Slide>
                          )
                        })
                      }
                    </Carousel>
                  </Modal>
                </Flex>

              </List.Item>

            </List>
          </>
        }
      </Flex>
    </div>
  )
}

export default SessionInfo
