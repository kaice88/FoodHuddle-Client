export const REQUEST_AUTH_GOOGLE = '/v1/auth/google/callback'
export const REQUEST_SESSION_INFO = 'v1/session'
export const REQUEST_GET_HOST_PAYMENT_INFO = '/v1/session/host-payment-infor'
export const REQUEST_GET_ALL_SESSIONS_TODAY = '/v1/session/today'
export const REQUEST_GET_FOOD_ORDER_IN_SUMMARY_TAB = '/v1/food-order/summary'

export function REQUEST_ORDER_BILL(sessionId: string) {
  return `/v1/session/${sessionId}/payment`
}

export function REQUEST_EDIT_SESSION_INFO(sessionId: string) {
  return `/v1/session/${sessionId}`
}

export function REQUEST_FOOD_ORDER_ROW(rowId) {
  return `/v1/food-order/${rowId}`
}

export const REQUEST_GET_FOOD_ORDER_MENU = '/v1/food-order/menu'

export function REQUEST_GET_SESSION_INFO(sessionId: string) {
  return `/v1/session/${sessionId}`
}
