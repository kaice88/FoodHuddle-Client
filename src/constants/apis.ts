export const REQUEST_AUTH_GOOGLE = '/v1/auth/google/callback'

// SESSION
export const SESSION_BASE_URL = '/v1/session'
export const REQUEST_POST_SESSION_INFO = `${SESSION_BASE_URL}`
export const REQUEST_GET_HOST_PAYMENT_INFO = `${SESSION_BASE_URL}/host-payment-infor`
export const REQUEST_GET_ALL_SESSIONS_TODAY = `${SESSION_BASE_URL}/today`
export const REQUEST_GET_FOOD_ORDER_IN_SUMMARY_TAB = '/v1/food-order/summary'
export function REQUEST_ORDER_BILL(sessionId) {
  return `/v1/session/${sessionId}/payment`
}
export function REQUEST_EDIT_SESSION_INFO(sessionId) {
  return `${SESSION_BASE_URL}/${sessionId}`
}
export function REQUEST_GET_SESSION_INFO(sessionId) {
  return `${SESSION_BASE_URL}/${sessionId}`
}
export function REQUEST_FOOD_ORDER_ROW(rowId) {
  return `/v1/food-order/${rowId}`
}
export const REQUEST_GET_FOOD_ORDER_MENU = '/v1/food-order/menu'
