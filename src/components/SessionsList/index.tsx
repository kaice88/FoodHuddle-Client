import type { SessionsListProps } from './types'
import Session from './SessionCard'

function SessionList({ sessionsList }: SessionsListProps) {
  return (
    <div className="sessionList">
      {sessionsList.map(session => (
        <Session key={session.id} session={session} />
      ))}
    </div>
  )
}

export default SessionList
