import { redirect } from 'react-router-dom'
import * as ROUTES from '@/constants/routes'

export const getTokenDuration = () => {
  const expirationDate = new Date(localStorage.getItem('expiration'))
  const now = new Date()
  const duration = expirationDate.getTime() - now.getTime()
  return duration
}

export const getAuthToken = () => {
  const token = localStorage.getItem('accessToken')
  if (!token)
    return null

  const tokenDuration = getTokenDuration()
  if (tokenDuration < 0)
    return 'EXPIRED'

  return token
}

export const checkAuthLoader = () => {
  const accessToken = getAuthToken()
  if (!accessToken)
    return redirect(ROUTES.LOGIN)
  return null
}
