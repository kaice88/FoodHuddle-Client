import type { SessionStatuses } from '@/enums'

export interface SessionToday {
  id: number
  title: string
  host: string
  status: SessionStatuses
  number_of_joiners: number
  created_at?: string
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
