import { Group, List, Loader, Text } from '@mantine/core'
import { isEmpty } from 'lodash'
import { SessionInfoData } from '@/types/sessions'

interface SessionInfoProps {
  sessionData: SessionInfoData
}

function SessionInfo({ sessionData }: SessionInfoProps) {
  return (
    <div className="sessionInfo">
      <Group position="center">
        {isEmpty(sessionData) ? <Loader/> : <><List>
          <List.Item>
            <Text>{`Host : ${sessionData?.host}`}</Text>
          </List.Item>
          <List.Item>
            <Text>
              Link shop :{' '}
              <a href={sessionData.shopLink} target="_blank" rel="noreferrer">
                Shop
              </a>{' '}
            </Text>
          </List.Item>
          <List.Item>
            <Text>{`Date : ${sessionData?.date}`}</Text>
          </List.Item>
          <List.Item>
            {' '}
            <Text>{`Notes: ${sessionData?.description}`}</Text>
          </List.Item>
        </List>
        <List>
          <List.Item>
            <Text>{sessionData?.hostPaymentInfo}</Text>
          </List.Item>
        </List>
        <div>
          QR CODE
          {/* {Object.values(sessionData?.qrImages).map((img) => (
            <Image src={img} width={100} height={100} />
          ))} */}
        </div></>}
      </Group>
    </div>
  )
}

export default SessionInfo
