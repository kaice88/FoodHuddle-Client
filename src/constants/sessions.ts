import { SessionsTodayPageTabs } from "@/enums";

interface Tab {
  value: SessionsTodayPageTabs;
  title: SessionsTodayPageTabs;
}

export const TABS_CONFIG: Tab[] = Object.values(SessionsTodayPageTabs).map(
  (tab) => ({
    value: tab,
    title: tab,
  })
);
