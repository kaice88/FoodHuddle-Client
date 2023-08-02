import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Flex, rem } from '@mantine/core'
import SessionCard from './SessionCard'
import type { SessionData } from '@/types/sessions'

interface SessionTodayListProps {
  sessionsList: SessionData[]
}

function SessionList({ sessionsList }: SessionTodayListProps) {
  return (
    <Flex align="center" justify="center" direction="column" gap={rem('16px')}>
      {sessionsList.map(session => (
        <SessionCard key={uuidv4()} session={session} />
      ))}
    </Flex>
  )
}

export default SessionList
