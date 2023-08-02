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

async function fetchSessionsToday(tab: SessionsTodayPageTabs) {
  try {
    const { data, status } = await axiosInstance.get<SessionsTodayResponse>(getTodaySessionsApiEndpoint(tab))
    if (status === 200)
      return data.data
  }
  catch (error) {
    return []
  }
}

function useSessionTodayData(tab: SessionsTodayPageTabs) {
  const { query } = useRequestProcessor()
  return query<SessionToday[], Error>(
    ['sessionsToday', tab],
    () => fetchSessionsToday(tab),
  )
}

function useSessionsToday(tab: SessionsTodayPageTabs) {
  const [activeTab, setActiveTab] = useState(tab)

  const { data, isLoading, error } = useSessionTodayData(activeTab)

  return { activeTab, setActiveTab, data, isLoading, error }
}

export default useSessionsToday
