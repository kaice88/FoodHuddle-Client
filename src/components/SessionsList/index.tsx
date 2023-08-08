import React from 'react'
import isUndefined from 'lodash/isUndefined'
import { v4 as uuidv4 } from 'uuid'
import { Center, Loader, SimpleGrid } from '@mantine/core'

import SessionCard from './SessionCard'
import type { SessionData } from '@/types/sessions'

interface SessionTodayListProps {
  sessionsList: SessionData[]
}

function SessionList({ sessionsList }: SessionTodayListProps) {
  if (isUndefined(sessionsList))
    return <Center mih={300}> <Loader/> </Center>

  return (
    <SimpleGrid cols={1} spacing="xs" verticalSpacing="xs" breakpoints={[{ minWidth: 'xs', cols: 2, spacing: 'md', verticalSpacing: 'md' }, { minWidth: 'md', cols: 3, spacing: 'lg', verticalSpacing: 'lg' }, { minWidth: 'xl', cols: 4, spacing: 'xl', verticalSpacing: 'xl' }]}>
      {sessionsList.map(session => (
        <SessionCard key={uuidv4()} session={session} />
      ))}
    </SimpleGrid>
  )
}

export default SessionList
