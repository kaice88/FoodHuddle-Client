import { useState } from 'react'

import { SessionsTodayPageTabs } from '@/enums'
import axiosInstance from '@/settings/axios'
import { useRequestProcessor } from '@/settings/react-query'
import type { SessionToday } from '@/types/sessions'
import { REQUEST_GET_ALL_SESSIONS_TODAY } from '@/constants/apis'

const { query } = useRequestProcessor()

interface ApiResponse {
  statusCode: number
  data: SessionToday[]
}

const fetchSessionsToday = async (tab: SessionsTodayPageTabs) => {
  const { data, status } = await axiosInstance.get<ApiResponse>(getUrl(tab))
  if (status === 200)
    return data.data
}

const getUrl = (tab: SessionsTodayPageTabs): string => {
  switch (tab) {
  case SessionsTodayPageTabs.ALL:
    return REQUEST_GET_ALL_SESSIONS_TODAY
  default:
    return REQUEST_GET_ALL_SESSIONS_TODAY
  }
}

const useSessionTodayData = (tab: SessionsTodayPageTabs) => {
  return query<SessionToday[], Error>(
    ['sessionsToday', tab],
    () => fetchSessionsToday(tab),
    {
      onSuccess: () => {
        console.log('success')
      },
    },
  )
}

const useSessionsToday = (tab: SessionsTodayPageTabs) => {
  const [activeTab, setActiveTab] = useState(tab)

  const { data, isLoading, error } = useSessionTodayData(activeTab)

  return { activeTab, setActiveTab, data, isLoading, error }
}

export default useSessionsToday
