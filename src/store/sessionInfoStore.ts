import { create } from 'zustand'
import type { SessionInfoData } from '@/types/sessions'

const useSessionInfoStore = create(set => ({
  sessionInfoData: {},

  setSessionInfoData: (data: SessionInfoData) => {
    set((state) => {
      return { ...state, sessionInfoData: data }
    })
  },
}))

export default useSessionInfoStore
