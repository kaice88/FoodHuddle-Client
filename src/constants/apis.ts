export const FOOD_ORDER = '/v1/food-order'

// AUTH
export const REQUEST_AUTH_GOOGLE = '/v1/auth/google/callback'

// SESSION
export const SESSION_BASE_URL = '/v1/session'
export const REQUEST_POST_SESSION_INFO = `${SESSION_BASE_URL}/create-new-session`
export const REQUEST_GET_HOST_PAYMENT_INFO = `${SESSION_BASE_URL}/host-payment-infor`
export const REQUEST_GET_ALL_SESSIONS_TODAY = `${SESSION_BASE_URL}/get-all-sessions-today`
export const REQUEST_SESSION = id => `${SESSION_BASE_URL}/${id}`