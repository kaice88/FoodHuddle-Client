import type { SessionStatuses } from "@/enums";

export interface SessionToday {
  id: number;
  title: string;
  host: string;
  status: SessionStatuses;
  number_of_joiners: number;
  created_at?: string;
}
