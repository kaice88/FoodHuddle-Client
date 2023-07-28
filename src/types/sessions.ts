import type { SessionStatuses } from "@/enums";

export interface SessionInfo {
  id: number;
  title: string;
  host: string;
  status: SessionStatuses;
  number_of_joiners: number;
  created_at?: string;
}

export interface SessionsListResponse {
  data: SessionInfo[];
  status: string;
}
interface QRImages {
  [key: string]: string;
}

export interface SessionInfoData {
  host: string;
  title: string;
  date: string;
  description: string | null;
  status: string;
  shopLink: string;
  hostPaymentInfo: string;
  qrImages?: QRImages;
}
