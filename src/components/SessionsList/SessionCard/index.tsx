import { IconUsers } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

import { SessionStatuses } from "@/enums";
import { ActionIcon } from "@mantine/core";
import { IconLink } from "@tabler/icons-react";

import { getSessionStatus } from '@/utils/sessions'
import StatusBadge from '../../StatusBadge'
import type { SessionProps } from './types'

import CopyClipBoard from '@/components/CopyClipboard'

const getStatusClassName = (status: SessionStatuses): string => {
  if (status === SessionStatuses.OPEN)
    return 'open'

  if (status === SessionStatuses.LOCKED)
    return 'locked'

function SessionCard({ session }: SessionCardProps) {
  return (
    <div className="sessionWrapper">
      <div className="session">
        <div className="session__info">
          <Link className="session__title" to={`/sessions-today/${session.id}`}>
            {session.title}
          </Link>
          <div className="session__host">{session.host}</div>
        </div>
        <div
          className={`session__status session__status-${getStatusClassName(
            session.status,
          )}`}
        >
          <StatusBadge status={session.status} />
        </div>
        <div className="session__link">
          <div className="session__joiners">
            <IconUsers color="orange" size="1rem" />
            {session.number_of_joiners}
          </div>
          <CopyClipBoard
            text={`${window.location.origin.toString()}/sessions-today/${
              session.id
            }`}
          />
        </div>
      </div>
    </div>
  )
}

export default SessionCard
