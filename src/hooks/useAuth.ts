import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'

import * as ROUTES from '@/constants/routes'
import { useRequestProcessor } from '@/settings/react-query'
import axios from '@/settings/axios'
import useAuthStore from '@/store/authStore'
import { REQUEST_AUTH_GOOGLE } from '@/constants/apis'

function useAuth() {
  const { mutation } = useRequestProcessor()
  const { login, logout } = useAuthStore()

  const navigate = useNavigate()
  const authMutation = mutation(
    'userProfile',
    (token) => {
      return axios.post(REQUEST_AUTH_GOOGLE, {
        accessToken: token,
      })
    },
    {
      onSuccess: (data) => {
        login(data.data.accessToken, data.data.profile, data.data.expiresIn)
        navigate(ROUTES.SESSIONS_TODAY)
      },
    },
  )
  const getUserProfile = async (token: string) => {
    authMutation.mutate(token)
  }

  const handleLogin = useGoogleLogin({
    onSuccess: (response) => {
      getUserProfile(response.access_token)
    },
  })

  const handleLogout = () => {
    logout()
    navigate(ROUTES.LOGIN)
  }

  return { login: handleLogin, logout: handleLogout }
}

export default useAuth
