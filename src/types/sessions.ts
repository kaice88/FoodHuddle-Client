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

interface QRImages {
  [key: string]: string
}

export interface SessionInfoData {
  host: string
  title: string
  date: string
  description: string | null
  status: string
  shopLink: string
  hostPaymentInfo: string
  qrImages?: QRImages
}
