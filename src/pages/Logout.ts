import { redirect } from 'react-router-dom'
import * as ROUTES from '@/constants/routes'

export function LogoutAction() {
  localStorage.clear()
  return redirect(ROUTES.LOGIN)
}
