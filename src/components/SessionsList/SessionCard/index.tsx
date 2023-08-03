import { IconUsers } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

import StatusBadge from '../../StatusBadge'
import { getSessionStatus } from '@/utils/sessions'
import CopyClipBoard from '@/components/CopyClipboard'
import type { SessionToday } from '@/types/sessions'
import { SessionStatuseColors, SessionStatuses } from '@/enums'

interface SessionCardProps {
  session: SessionToday
}

function SessionCard({ session }: SessionCardProps) {
  const getKeyByValue = (enumObj, enumValue) => Object.entries(enumObj).find(([, value]) => value === enumValue)?.[0]

  return (
    <div className="sessionWrapper">
      <div className="session">
        <div className="session__info">
          <Link className="session__title" to={`/sessions/${session.id}`}>
            {session.title}
          </Link>
          <div className="session__host">{session.host}</div>
        </div>
        <div
          className={`session__status session__status-${getSessionStatus(
            session.status,
          )}`}
        >
          <StatusBadge status={session.status} colorName={SessionStatuseColors[getKeyByValue(SessionStatuses, session.status)]} />
        </div>
        <div className="session__link">
          <div className="session__joiners">
            <IconUsers color="orange" size="1rem" />
            {session.number_of_joiners}
          </div>
          <CopyClipBoard
            text={`${window.location.origin.toString()}/sessions/${
              session.id
            }`}
          />
        </div>
      </div>
    </div>
  )
}

export default SessionCard
