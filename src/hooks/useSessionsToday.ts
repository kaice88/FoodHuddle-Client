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

const fetchSessionsToday = async (tab: SessionsTodayPageTabs, page, status) => {
  const params = status ? `?${status}` : ''
  try {
    const { data, status } = await axiosInstance.get<SessionsTodayResponse>(getTodaySessionsApiEndpoint(tab, page, params))
    if (status === 200)
      return data.data
  }
  catch (error) {
    return []
  }
}

const useSessionTodayData = (tab: SessionsTodayPageTabs, page, status) => {
  const { query } = useRequestProcessor()
  return query<SessionToday[], Error>(
    ['sessionsToday', tab, status],
    () => fetchSessionsToday(tab, page, status),
  )
}

const useSessionsToday = (tab: SessionsTodayPageTabs, page) => {
  const [activeTab, setActiveTab] = useState(tab)
  const [status, setStatus] = useState('')
  const { data, isLoading, error } = useSessionTodayData(activeTab, page, status)

  return { activeTab, setActiveTab, data, isLoading, error, setStatus }
}

export default useSessionsToday
