import { redirect } from "react-router-dom"

export const getToken = () =>  {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) return null
    return accessToken
}

export const checkAuthLoader = () =>  {
    const accessToken = getToken()
    if (!accessToken) return redirect('/login')
    return null
}