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
