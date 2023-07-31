import { useState } from 'react'

import type { SessionsTodayPageTabs } from '@/enums'
import axiosInstance from '@/settings/axios'
import { useRequestProcessor } from '@/settings/react-query'
import type { SessionToday } from '@/types/sessions'
import { getTodaySessionsApiEndpoint } from '@/utils/sessions'

interface SessionsTodayResponse {
  statusCode: number
  data: SessionToday[]
}

const fetchSessionsToday = async (tab: SessionsTodayPageTabs, page) => {
  try {
    const { data, status } = await axiosInstance.get<SessionsTodayResponse>(getTodaySessionsApiEndpoint(tab, page))
    if (status === 200)
      return data.data
  }
  catch (error) {
    return []
  }
}

const useSessionTodayData = (tab: SessionsTodayPageTabs, page) => {
  const { query } = useRequestProcessor()
  return query<SessionToday[], Error>(
    ['sessionsToday', tab],
    () => fetchSessionsToday(tab, page),
  )
}

const useSessionsToday = (tab: SessionsTodayPageTabs, page) => {
  const [activeTab, setActiveTab] = useState(tab)

  const { data, isLoading, error } = useSessionTodayData(activeTab, page)

  return { activeTab, setActiveTab, data, isLoading, error }
}

export default useSessionsToday
