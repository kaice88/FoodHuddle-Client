export const FOOD_ORDER = '/v1/food-order'

// AUTH
export const REQUEST_AUTH_GOOGLE = '/v1/auth/google/callback'

export const REQUEST_GET_FOOD_MENU = 'v1/food-order/menu'

export const REQUEST_EDIT_FOOD_ORDER_LIST = '/v1/food-order'
export function REQUEST_GET_SESSION_INFO(sessionId: string) {
  return `/v1/session/${sessionId}`
}

export function REQUEST_GET_FOOD_ORDER_LIST(sessionId: number) {
  return `/v1/food-order?sessionId=${sessionId}`
}

// SESSION
export const SESSION_BASE_URL = '/v1/session'
export const REQUEST_UPDATE_SESSION_STATUS = sessionId => `/v1/session/${sessionId}/update-status`
export const REQUEST_POST_SESSION_INFO = `${SESSION_BASE_URL}`
export const REQUEST_GET_HOST_PAYMENT_INFO = `${SESSION_BASE_URL}/host-payment-infor`
export const REQUEST_GET_ALL_SESSIONS_TODAY = `${SESSION_BASE_URL}/today`
export const REQUEST_GET_HOSTED_SESSIONS_TODAY = `${SESSION_BASE_URL}/today/hosted`
export const REQUEST_GET_JOINED_SESSIONS_TODAY = `${SESSION_BASE_URL}/today/joined`

export const REQUEST_SESSION = sessionId => `${SESSION_BASE_URL}/${sessionId}`
export const REQUEST_GET_FOOD_ORDER_IN_SUMMARY_TAB = '/v1/food-order/summary'
export function REQUEST_ORDER_BILL(sessionId: string) {
  return `/v1/session/${sessionId}/payment`
}
export function REQUEST_FOOD_ORDER_ROW(rowId) {
  return `/v1/food-order/${rowId}`
}
export const REQUEST_GET_FOOD_ORDER_MENU = '/v1/food-order/menu'
export const REQUEST_USER_PAYMENT = sessionId => `${SESSION_BASE_URL}/${sessionId}/user-payment`
export const REQUEST_PAYMENT_CHECKLIST = sessionId => `${SESSION_BASE_URL}/${sessionId}/payment-checklist`
