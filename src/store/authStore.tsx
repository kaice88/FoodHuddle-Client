import { create } from 'zustand';

interface AuthStoreState {
  userProfile: object | null;
  accessToken: string | null;
  setLocalStorage: (accessToken: string, userProfile: object, expiresIn: number) => void;
  login: (accessToken: string, userProfile: object, expiresIn: number) => void;
}

const useAuthStore = create<AuthStoreState>((set) => ({
  userProfile: localStorage.getItem('userProfile')
    ? JSON.parse(localStorage.getItem('userProfile')!)
    : {},
  accessToken: localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : '',
  setLocalStorage: (accessToken, userProfile, expiresIn) => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    localStorage.setItem('accessToken', accessToken);
    const expiration = new Date();
    expiration.setMilliseconds(expiration.getMilliseconds() + expiresIn);
    localStorage.setItem('expiration', expiration.toISOString());
  },
  login: (accessToken, userProfile, expiresIn) => {
    set((state) => {
      state.setLocalStorage(accessToken, userProfile, expiresIn);
      return {
        accessToken,
        userProfile,
      };
    });
  },
}));

export default useAuthStore;
