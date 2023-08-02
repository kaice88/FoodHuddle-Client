export const REQUEST_AUTH_GOOGLE = '/v1/auth/google/callback'

export const REQUEST_POST_SESSION_INFO = 'v1/session'
export const REQUEST_GET_HOST_PAYMENT_INFO = '/v1/session/host-payment-infor'

export const FOOD_ORDER = '/v1/food-order'

export const REQUEST_GET_ALL_SESSIONS_TODAY = '/v1/session/today'
export const REQUEST_GET_HOSTED_SESSIONS_TODAY = '/v1/session/today/hosted'
export const REQUEST_GET_JOINED_SESSIONS_TODAY = '/v1/session/today/joined'

export function REQUEST_GET_SESSION_INFO(sessionId: string) {
  return `/v1/session/${sessionId}`
}

export const REQUEST_GET_FOOD_MENU = 'v1/food-order/menu'

export const REQUEST_EDIT_FOOD_ORDER_LIST = '/v1/food-order'
export function REQUEST_GET_FOOD_ORDER_LIST(sessionId: number) {
  return `/v1/food-order?sessionId=${sessionId}`
}
export const REQUEST_GET_FOOD_ORDER_IN_SUMMARY_TAB = '/v1/food-order/summary'
export const REQUEST_POST_ORDER_BILL = '/v1/session'
export const REQUEST_PUT_FOOD_ORDER_ROW = '/v1/food-order'
export const REQUEST_GET_FOOD_ORDER_MENU = '/v1/food-order/menu'
export const REQUEST_GET_ALL_SESSIONS_HISTORY = '/v1/session/history'
export const REQUEST_GET_HOSTED_SESSIONS_HISTORY = '/v1/session/history/hosted'
export const REQUEST_GET_JOINED_SESSIONS_HISTORY = '/v1/session/history/joined'
