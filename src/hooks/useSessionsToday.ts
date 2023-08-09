import { useState } from 'react'
import { SessionStatuses } from './../enums/session'

import { SessionsTodayPageTabs } from '@/enums'
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
    if (status === 200) {
      if (tab === SessionsTodayPageTabs.ALL && page !== 'HISTORY')
        return data.data.filter(session => session.status === SessionStatuses.OPEN)
      else return data.data
    }
  }
  catch (error) {
    return []
  }
}

const useSessionTodayData = (tab: SessionsTodayPageTabs, page = 'TODAY', status) => {
  const { query } = useRequestProcessor()
  return query<SessionToday[], Error>(
    ['sessionsToday', tab, status, page],
    () => fetchSessionsToday(tab, page, status),
    { refetchOnMount: 'always', cacheTime: 0 },
  )
}

const useSessionsToday = (tab: SessionsTodayPageTabs, page = 'TODAY') => {
  const [activeTab, setActiveTab] = useState(tab)
  const [status, setStatus] = useState('')

  const { data, isLoading, error } = useSessionTodayData(activeTab, page, status)

  return { activeTab, setActiveTab, data, isLoading, error, setStatus }
}

export default useSessionsToday
