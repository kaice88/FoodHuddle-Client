export const FOOD_ORDER = '/v1/food-order'

// AUTH
export const REQUEST_AUTH_GOOGLE = '/v1/auth/google/callback'

export const REQUEST_GET_FOOD_MENU = 'v1/food-order/menu'

export const REQUEST_EDIT_FOOD_ORDER_LIST = '/v1/food-order'
export const REQUEST_GET_SESSION_INFO = (sessionId: string) =>
  `/v1/session/${sessionId}`

export const REQUEST_GET_FOOD_ORDER_LIST = (sessionId: number) =>
  `/v1/food-order?sessionId=${sessionId}`

// SESSION
export const SESSION_BASE_URL = '/v1/session'
export const REQUEST_POST_SESSION_INFO = `${SESSION_BASE_URL}/create-new-session`
export const REQUEST_GET_HOST_PAYMENT_INFO = `${SESSION_BASE_URL}/host-payment-infor`
export const REQUEST_GET_ALL_SESSIONS_TODAY = `${SESSION_BASE_URL}/get-all-sessions-today`
export const REQUEST_SESSION = sessionId => `${SESSION_BASE_URL}/${sessionId}`
