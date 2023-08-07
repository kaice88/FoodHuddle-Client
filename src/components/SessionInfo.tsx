import { ActionIcon, Box, Button, Flex, Group, Image, List, Loader, Modal, Text, Title, useMantineTheme } from '@mantine/core'
import isEmpty from 'lodash/isEmpty'
import { IconDice1Filled, IconEdit, IconFileDots } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel'
import SessionInfoModal from './ModalCreateSession'
import StatusBadge from './StatusBadge'
import CopyClipBoard from './CopyClipboard'
import { SessionStatuseColors, SessionStatuses } from '@/enums'

function SessionInfo({ sessionData, sessionId, isHosted }) {
  const globalTheme = useMantineTheme()
  const sessionURL = `${window.location.origin}/sessions/${sessionId}`

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

  const getKeyByValue = (enumObj, enumValue) => Object.entries(enumObj).find(([, value]) => value === enumValue)?.[0]
  return (
    <div className="sessionInfo" >
      <Flex gap="lg" justify="flex-start" align="baseline" direction="row" style={{ margin: '0px 0px 20px 0px' }} wrap={'wrap'}>
        <Flex justify="center" align="flex-start" direction="column" >
          <Title order={2}>
            {sessionData.title}
          </Title>
          <div
            style={{ backgroundColor: globalTheme.colors.brand[9], padding: '2px', width: '55px' }}
          ></div>
        </Flex>
        <StatusBadge status={sessionData.status} colorName={SessionStatuseColors[getKeyByValue(SessionStatuses, sessionData.status)]} />
        <CopyClipBoard text={sessionURL} />
      </Flex>
      <Flex style={{ margin: '0px 0px 20px 0px' }} >
        <Title order={3}>
          <IconFileDots /> Session Information
        </Title>
        {isHosted && <div>
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
            <List icon={<IconDice1Filled size={10} style={{ color: `${globalTheme.colors.darkLavender[0]}` }} />}>
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
                  <Text fw={'bold'}>QR Code: </Text>
                  <Group position="center">
                    { !isEmpty(sessionData.qrImages) ? <Button onClick={() => setOpenedModalImage(true)}>Show</Button> : 'No' }
                  </Group>
                  <Modal
                    opened={openedModalImage}
                    padding={0}
                    transitionProps={{ duration: TRANSITION_DURATION }}
                    withCloseButton={false}
                    onClose={() => setOpenedModalImage(false)}
                    centered
                  >
                    <Carousel loop getEmblaApi={setEmbla} slideGap="150px" slideSize="70%" >
                      {
                        sessionData.qrImages.map((image, index) => {
                          return (
                            <Carousel.Slide key={index}>
                              <img
                                src={image}
                                alt="Cat"
                                style={{ width: '100%', height: '100%', objectFit: 'contain', scale: '1.3' }}
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
