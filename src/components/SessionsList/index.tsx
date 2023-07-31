import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import SessionCard from './SessionCard'
import type { SessionToday } from '@/types/sessions'

interface SessionTodayListProps {
  sessionsList: SessionToday[]
}

function SessionList({ sessionsList }: SessionTodayListProps) {
  return (
    <div className="sessionList">
      {sessionsList.map(session => (
        <SessionCard key={uuidv4()} session={session} />
      ))}
    </div>
  )
}

export default SessionList
