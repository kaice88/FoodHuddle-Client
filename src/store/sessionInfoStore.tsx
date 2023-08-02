import { create } from 'zustand'

const useSessionInfoStore = create(set => ({
  sessionInfoData: {},

  setSessionInfoData: (data) => {
    set((state) => {
      return { ...state, sessionInfoData: data }
    })
  },
}))

export default useSessionInfoStore
