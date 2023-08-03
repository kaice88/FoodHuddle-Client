import { SessionStatuses, SessionsTodayPageTabs } from '@/enums'
import * as APIS from '@/constants/apis'

export function getSessionStatus(status: SessionStatuses): string {
  switch (status) {
  case SessionStatuses.OPEN:
    return 'open'
  case SessionStatuses.LOCKED:
    return 'locked'
  case SessionStatuses.FINISHED:
    return 'finished'
  case SessionStatuses.PENDING_PAYMENTS:
    return 'pending'
  default:
    return 'open'
  }
}

export function getTodaySessionsApiEndpoint(tab: SessionsTodayPageTabs): string {
  switch (tab) {
  case SessionsTodayPageTabs.ALL:
    return APIS.REQUEST_GET_ALL_SESSIONS_TODAY
  case SessionsTodayPageTabs.HOSTED :
    return APIS.REQUEST_GET_HOSTED_SESSIONS_TODAY
  case SessionsTodayPageTabs.JOINED:
    return APIS.REQUEST_GET_JOINED_SESSIONS_TODAY
  default:
    return APIS.REQUEST_GET_ALL_SESSIONS_TODAY
  }
}
export const checkIfUserIsHost = (host, user) => {
  return host.googleId === user.googleId
}
