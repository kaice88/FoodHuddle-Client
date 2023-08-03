import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { SessionsTodayPageTabs } from '@/enums'
import type { SessionsListResponse } from '@/types/sessions'
import axiosInstance from '@/settings/axios'
import { useRequestProcessor } from '@/settings/react-query'

import * as API_ENDPOINTS from '@/constants/apis'

const { query } = useRequestProcessor()

interface State {
  activeTab: SessionsTodayPageTabs
}

interface Actions {
  setActiveTab: (tab: SessionsTodayPageTabs) => void
}

const fetchSessions = async (url: string) => {
  const { data, status } = await axiosInstance.get<SessionsListResponse>(url)
  if (status == 200)
    return data.data

  return []
}

const getUrl = (tab: SessionsTodayPageTabs): string => {
  switch (tab) {
  case SessionsTodayPageTabs.ALL:
    return API_ENDPOINTS.REQUEST_GET_ALL_SESSIONS_TODAY
  default:
    return API_ENDPOINTS.REQUEST_GET_ALL_SESSIONS_TODAY
  }
}

export const useSessionData = (tab: SessionsTodayPageTabs) => {
  return query<SessionsListResponse, Error>(
    ['sessions', tab],
    () => fetchSessions(getUrl(tab)),
    {
      onSuccess: () => {
        console.log('SUCCESS FETCHING DATA WITH REACT QUERY')
      },
    },
  )
}

export const useSessionStore = create(
  immer<State & Actions>(set => ({
    activeTab: SessionsTodayPageTabs.ALL,
    setActiveTab: (tab: SessionsTodayPageTabs) =>
      set((state) => {
        state.activeTab = tab
      }),
  })),
)
