import { useEffect } from 'react'
import { isEmpty } from 'lodash'
import type { SessionInfoData } from '@/types/sessions'
import { REQUEST_GET_SESSION_INFO } from '@/constants/apis'
import axiosInstance from '@/settings/axios'
import { useRequestProcessor } from '@/settings/react-query'
import useFoodStore from '@/store/foodStore'

const fetchSessionById = async (sessionId: string) => {
  const response = await axiosInstance.get<SessionInfoData>(REQUEST_GET_SESSION_INFO(sessionId!))
  if (response.status === 200)
    return response.data
}

const sessionByIdQuery = (sessionId: string) => {
  const { query } = useRequestProcessor()

  return query<SessionInfoData, Error>(['fetchSessionById', sessionId], () => fetchSessionById(sessionId), { retry: false },

  )
}
function useSessionData(sessionId: string) {
  const setCurrentShop = useFoodStore(state => state.setCurrentShop)

  const { data: sessionData, isLoading, error } = sessionByIdQuery(sessionId)

  useEffect(() => {
    if (!isEmpty(sessionData))
      setCurrentShop(sessionData.shopLink)
  }, [sessionData])

  return { sessionData, isLoading, error }
}

export default useSessionData