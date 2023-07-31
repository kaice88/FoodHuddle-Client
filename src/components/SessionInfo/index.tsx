import React from 'react'

import { Group, List, Text } from '@mantine/core'
import Link from 'antd/es/typography/Link'

interface SessionInfoProps {
  sessionData: SessionInfo
}

function SessionInfo({ sessionData }: SessionInfoProps) {
  return (
    <div className="sessionInfo">
      <Group position="center">
        <List>
          <List.Item>
            <Text>{`Host : ${sessionData?.host}`}</Text>
          </List.Item>
          <List.Item>
            <Text>
              Link shop :
              <Link href={sessionData?.shopLink} target="_blank">
                Shop
              </Link>
            </Text>
          </List.Item>
          <List.Item>
            <Text>{`Date : ${sessionData?.date}`}</Text>
          </List.Item>
          <List.Item>
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
        </div>
      </Group>
    </div>
  )
}

export default SessionInfo
