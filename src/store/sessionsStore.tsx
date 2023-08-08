import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { SessionsTodayPageTabs } from '@/enums'
import type { SessionInfo, SessionsListResponse } from '@/types/sessions'
import axiosInstance from '@/settings/axios'

interface State {
  activeTab: SessionsTodayPageTabs
  sessions: SessionInfo[]
  isLoading: boolean
  error?
}

interface Actions {
  setActiveTab: (tab: SessionsTodayPageTabs) => void
  setSessions: (tab: SessionsTodayPageTabs) => void
}

const fetchSessions = async (url: string) => {
  try {
    const { data, status } = await axiosInstance.get<SessionsListResponse>(url)
    if (status == 200)
      return data.data
  }
  catch (error) {
    return []
  }
}

const getUrl = (tab: SessionsTodayPageTabs): string => {
  switch (tab) {
  case SessionsTodayPageTabs.ALL:
    return '/v1/session/get-all-sessions-today'
  default:
    return '/v1/session/get-all-sessions-today'
  }
}

export const useSessionStore = create(
  immer<State & Actions>(set => ({
    activeTab: SessionsTodayPageTabs.ALL,
    setActiveTab: (tab: SessionsTodayPageTabs) =>
      set((state) => {
        state.activeTab = tab
      }),
    setSessions: async (tab: SessionsTodayPageTabs) => {
      set((state) => {
        state.isLoading = true
      })
      console.log(tab)
      const sessions = await fetchSessions(getUrl(tab))
      set((state) => {
        state.sessions = sessions
        state.isLoading = false
      })
    },
  })),
)
