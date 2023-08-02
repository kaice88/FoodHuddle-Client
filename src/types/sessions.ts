import type { SessionStatuses } from '@/enums'

export interface SessionData {
  id: number
  title: string
  host: string
  status: SessionStatuses
  numberOfJoiners: number
  createdAt?: string
  shopImage: string
}
