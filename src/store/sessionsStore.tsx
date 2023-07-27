import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { SessionsTodayPageTabs } from "@/enums";
import { SessionInfo, SessionsListResponse } from "@/types/Sessions";
import axiosInstance from "@/settings/axios";
import { useRequestProcessor } from "@/settings/react-query";

const { query } = useRequestProcessor();

import * as API_ENDPOINTS from "@/constants/apis";

type State = {
  activeTab: SessionsTodayPageTabs;
};

type Actions = {
  setActiveTab: (tab: SessionsTodayPageTabs) => void;
};

const fetchSessions = async (url: string) => {
  const { data, status } = await axiosInstance.get<SessionsListResponse>(url);
  if (status == 200) {
    return data.data;
  }
  return [];
};

const getUrl = (tab: SessionsTodayPageTabs): string => {
  switch (tab) {
    case SessionsTodayPageTabs.ALL:
      return API_ENDPOINTS.REQUEST_GET_ALL_SESSIONS_TODAY;
    default:
      return API_ENDPOINTS.REQUEST_GET_ALL_SESSIONS_TODAY;
  }
};

export const useSessionData = (tab: SessionsTodayPageTabs) => {
  return query<SessionsListResponse, Error>(
    ["sessions", tab],
    () => fetchSessions(getUrl(tab)),
    {
      onSuccess: () => {
        console.log("SUCCESS FETCHING DATA WITH REACT QUERY");
      },
    }
  );
};

export const useSessionStore = create(
  immer<State & Actions>((set) => ({
    activeTab: SessionsTodayPageTabs.ALL,
    setActiveTab: (tab: SessionsTodayPageTabs) =>
      set((state) => {
        state.activeTab = tab;
      }),
  }))
);
