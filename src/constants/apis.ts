export const REQUEST_AUTH_GOOGLE = '/v1/auth/google/callback'

export const REQUEST_POST_SESSION_INFO = 'v1/session/create-new-session'
export const REQUEST_GET_HOST_PAYMENT_INFO = '/v1/session/host-payment-infor'

export const FOOD_ORDER = '/v1/food-order'

export const REQUEST_GET_ALL_SESSIONS_TODAY = '/v1/session/today'
export const REQUEST_GET_HOSTED_SESSIONS_TODAY = '/v1/session/today/hosted'
export const REQUEST_GET_JOINED_SESSIONS_TODAY = '/v1/session/today/joined'

export const REQUEST_GET_SESSION_INFO = (sessionId: string) =>
  `/v1/session/${sessionId}`

export const REQUEST_GET_FOOD_MENU = 'v1/food-order/menu'

export const REQUEST_EDIT_FOOD_ORDER_LIST = '/v1/food-order'
export const REQUEST_GET_FOOD_ORDER_LIST = (sessionId: number) =>
  `/v1/food-order?sessionId=${sessionId}`
