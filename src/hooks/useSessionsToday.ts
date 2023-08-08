import { useState } from 'react'
import { SessionStatuses } from './../enums/session'

import { SessionsTodayPageTabs } from '@/enums'
import axiosInstance from '@/settings/axios'
import { useRequestProcessor } from '@/settings/react-query'
import type { SessionData } from '@/types/sessions'
import { getTodaySessionsApiEndpoint } from '@/utils/sessions'

interface SessionsTodayResponse {
  statusCode: number
  data: SessionData[]
}

async function fetchSessionsToday(tab: SessionsTodayPageTabs) {
  try {
    const { data, status } = await axiosInstance.get<SessionsTodayResponse>(getTodaySessionsApiEndpoint(tab))
    if (status === 200) {
      if (tab === SessionsTodayPageTabs.ALL)
        return data.data.filter(session => session.status === SessionStatuses.OPEN)
      else return data.data
    }
  }
  catch (error) {
    return []
  }
}

function useSessionTodayData(tab: SessionsTodayPageTabs) {
  const { query } = useRequestProcessor()
  return query<SessionData[], Error>(
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
